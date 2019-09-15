# drpcjs

> Apache storm DRPC client for Node.js

[![npm](https://img.shields.io/npm/v/drpcjs.svg?style=for-the-badge&logo=npm&label=)](https://www.npmjs.com/package/drpcjs)
[![license](https://img.shields.io/github/license/iamnapo/drpcjs.svg?style=for-the-badge)](./LICENSE)

## Install

```console
$ npm i drpcjs
```

## Usage

```javascript
const Drpcjs = require('drpcjs');
const drpc = new Drpcjs(options);
```

### **options**

- `host`: drpc cluster hostname
- `port`: drpc client port, default to 3772
- `timeout`: TCP connection timeout time, default to null
- `keepAlive`: keep connect alive, default to true
- `maxConnectCounts`: the maximum connect counts, if the param `keepAlive` is
  set true, client will reconnect to storm until the connect counts exceed the maxConnectCounts.

### **events**

- `error`
- `close`
- `connect`
- `timeout`

### **methods**

```javascript
execute(topologyName, JSON.stringify(args))
```

## Example

```javascript
const drpcjs = require('drpcjs');
const drpc = new drpcjs({ host: '127.0.0.1' });

drpc.execute('reach', JSON.stringify({ a: 'a', b: 7, c: true }).then(console.log).catch(console.error);
```

## License

MIT © [Napoleon-Christos Oikonomou](https://iamnapo.me)

---

## Acknowledgements

Based on [`node-drpc`](https://github.com/rkatti/node-drpc).
