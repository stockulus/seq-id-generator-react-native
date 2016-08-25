seq-id-generator-react-native
====
generates an sequence id (1, 2, 3, 4...), based on asyncstorage

[![bitHound Overall Score](https://www.bithound.io/github/stockulus/seq-id-generator-react-native/badges/score.svg)](https://www.bithound.io/github/stockulus/seq-id-generator-react-native) [![npm Package](https://img.shields.io/npm/dm/seq-id-generator-react-native.svg)](https://www.npmjs.com/package/seq-id-generator-react-native) [![travis-ci.org](https://travis-ci.org/stockulus/seq-id-generator-react-native.svg)](https://travis-ci.org/stockulus/seq-id-generator-react-native) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![license](https://img.shields.io/npm/l/seq-id-generator-react-native.svg?maxAge=2592000)](https://opensource.org/licenses/MIT)
### Usage

```bash
npm i seq-id-generator-react-native
```

```js
const name = 'purchase'
const seqIdGenerator = require('seq-id-generator-react-native')

seqIdGenerator(name)
  .then((generator) => generator.next())
  .then((id) => console.log(id))
  .catch((error) => console.error(error))

// with formating Function
seqIdGenerator(name, id => `A-${id}`)
  .then((generator) => generator.next())
  .then((id) => console.log(id))
  .catch((error) => console.error(error))

// or callback style
seqIdGenerator(name, null, (error, generator) => {
  if (error) return console.error(error)
  generator.next((error, id) => {
    if (error) return console.error(error)
    console.log(id)
  })
})

```

---
[![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&maxAge=2592000)](https://twitter.com/stockulus)
