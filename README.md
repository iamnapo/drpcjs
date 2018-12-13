# drpcjs

> Apache storm DRPC client for Node.js

[![npm](https://flat.badgen.net/npm/v/drpcjs)](https://www.npmjs.com/package/drpcjs)
[![license](https://flat.badgen.net/github/license/iamnapo/drpcjs)](./LICENSE)

## Install

```bash
$ npm i drpcjs
```

### Usage

```javascript
const drpcjs = require('drpcjs');

const drpc = new DRPC(options);
```

#### **options**

- `host`: drpc cluster hostname
- `port`: drpc client port, default to 3772
- `timeout`: TCP connection timeout time, default to null
- `keepAlive`: keep connect alive, default to true
- `maxConnectCounts`: the maximum connect counts, if the param `keepAlive` is
  set true, client will reconnect to storm until the connect counts exceed the maxConnectCounts.

#### **Events**

- `error`
- `close`
- `connect`
- `timeout`

#### **Methods**

- execute(topologyName, JSON.stringify(args))

### Example

```javascript
const drpcjs = require('drpcjs');
const drpc = drpcjs({ host: '127.0.0.1' });

drpc.execute('reach', 'engineering.twitter.com/blog/5').then(res => console.log(res)).catch(console.error);
```

## License

MIT © [Napoleon-Christos Oikonomou](https://iamnapo.me)

---

## Acknowledgements

Based on [`node-drpc`](https://github.com/rkatti/node-drpc).
