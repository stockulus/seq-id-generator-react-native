'use strict'

const AsyncStorage = require('react-native').AsyncStorage
const polygoat = require('polygoat')

/**
 * Factory function for the generator
 * @param {string} name
 * @param {function} [formatFunc] - optional id formating
 * @param {function} [callback]
 * @return {Promise} if uses without callback
 */
module.exports = function seqIdGenerator (name, formatFunc, callback) {
  const generator = id => {
    return {
      /**
      @param {function} [callback]
      @return {Promise} if uses without callback
      */
      next (callback) {
        return polygoat(done => {
          sequence(cb => {
            id++
            AsyncStorage.setItem(`__${name}`, id.toString(), error => {
              if (error) return cb(error)
              cb(null, formatFunc ? formatFunc(id) : id)
            })
          }, done)
        }, callback)
      }
    }
  }

  return polygoat(done => {
    AsyncStorage.getItem(`__${name}`, (error, data) => {
      const lastId = error ? 0 : parseInt(data, 10) || 0
      done(null, generator(lastId))
    })
  }, callback)
}

const queue = []
let isRunning = false
const sequence = (func, callback) => {
  const run = () => {
    if (isRunning || queue.length === 0) return

    isRunning = true
    const task = queue.shift()
    global.setImmediate(() => {
      task.func((error, result) => {
        task.callback(error, result)
        isRunning = false
        run()
      })
    })
  }

  queue.push({func, callback})
  run()
}
