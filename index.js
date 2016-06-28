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
  const generator = (id) => {
    return {
      /**
      @param {function} [callback]
      @return {Promise} if uses without callback
      */
      next (callback) {
        return polygoat((done) => {
          id++
          AsyncStorage.setItem(`__${name}`, id.toString(), error => {
            if (error) return done(error)
            done(null, formatFunc ? formatFunc(id) : id)
          })
        }, callback)
      }
    }
  }

  return polygoat((done) => {
    AsyncStorage.getItem(`__${name}`, (error, data) => {
      const lastId = error ? 0 : parseInt(data) || 0
      done(null, generator(lastId))
    })
  }, callback)
}
