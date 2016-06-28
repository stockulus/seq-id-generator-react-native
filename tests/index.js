require('react-native-mock/mock')

const name = 'test'
const test = require('tape')

const seqIdGenerator = require('../index')
const AsyncStorage = require('react-native').AsyncStorage

test('with no store', (assert) => {
  AsyncStorage.clear()
    .then(() => seqIdGenerator(name))
    .then((generator) => generator.next())
    .then((id) => {
      assert.equal(id, 1)
      assert.end()
    })
    .catch((error) => assert.error(error))
})

test('with store', (assert) => {
  seqIdGenerator(name)
    .then((generator) => generator.next())
    .then((id) => {
      assert.equal(id, 2)
      assert.end()
    })
    .catch((error) => assert.error(error))
})

test('with store and formating', (assert) => {
  seqIdGenerator(name, (id) => `A-${id}`)
    .then((generator) => generator.next())
    .then((id) => {
      assert.equal(id, 'A-3')
      assert.end()
    })
    .catch((error) => assert.error(error))
})

test('with store and formating callback style', (assert) => {
  seqIdGenerator(name, (id) => `A-${id}`, (error, generator) => {
    if (error) return assert.error(error)
    generator.next((error, id) => {
      if (error) return assert.error(error)
      assert.equal(id, 'A-4')
      assert.end()
    })
  })
})
