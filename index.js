const { EventEmitter } = require('events');

const thrift = require('./src/thrift');
const DistributedRPC = require('./src/thrift-gen-nodejs/DistributedRPC');

class DRPC extends EventEmitter {
  constructor({ host, port = 3772, timeout = null, keepAlive = true, maxConnectCounts = 10 }) {
    super();
    if (!(this instanceof DRPC)) {
      return new DRPC({
        host, port, timeout, keepAlive, maxConnectCounts,
      });
    }
    if (!host) throw new Error('Param `options.host` required.');
    this.host = host;
    this.port = port;
    this.timeout = timeout;
    this.keepAlive = keepAlive;
    this.maxConnectCounts = maxConnectCounts;
    if (this.keepAlive) this.connect();
    this.connectCounts = 0;
    return this;
  }

  connect() {
    const self = this;
    let connection;
    const maxCounts = this.maxConnectCounts;
    if (!this.timeout) {
      connection = thrift.createConnection(this.host, this.port);
    } else {
      connection = thrift.createConnection(this.host, this.port, this.timeout);
    }
    if (maxCounts > 0) {
      this.connectCounts += 1;
      if (this.connectCounts > maxCounts) throw new Error('Maximum connect counts limit.');
    }

    connection.on('connect', () => self.emit('connect'));
    connection.on('timeout', () => self.emit('timeout'));
    connection.on('error', err => self.emit('error', err));

    if (self.keepAlive) {
      connection.on('close', () => {
        self.emit('close');
        self.connect();
      });
    }
    this.connection = connection;
    this.client = thrift.createClient(DistributedRPC, connection);
    return this;
  }

  execute(spoutName, emitValue) {
    if (typeof spoutName !== 'string' || typeof emitValue !== 'string') {
      throw new Error('Params `spoutName[String]` and `emitValue[String]` required.');
    }
    return new Promise((yes, no) => {
      const self = this;
      if (!this.keepAlive) this.connect();
      if (!this.client) throw new Error('DRPC client does not exist.');
      this.client.execute(spoutName, emitValue, (err, res) => {
        if (err) {
          no(err);
        } else {
          yes(res);
        }
        if (!self.keepAlive && self.connection) {
          self.connection.end();
          self.connection = null;
          self.client = null;
        }
      });
    });
  }
}

module.exports = DRPC;
