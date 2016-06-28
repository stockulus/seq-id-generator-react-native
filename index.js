'use strict'

import { AsyncStorage } from 'react-native'
import polygoat from 'polygoat'

/**
 * Factory function for the generator
 * @param {string} name
 * @param {function} [formatFunc] - optional id formating
 * @param {function} [callback]
 * @return {Promise} if uses without callback
 */
export default (name, formatFunc, callback) => {
  const generator = (id) => {
    return {
      /**
      @param {function} [callback]
      @return {Promise} if uses without callback
      */
      next (callback) {
        return polygoat((done) => {
          id++
          AsyncStorage.setItem(`__${name}`, id, error => {
            if (error) return done(error)
            done(null, formatFunc ? formatFunc(id) : id)
          })
        }, callback)
      }
    }
  }

  return polygoat((done) => {
    AsyncStorage.getItem(`__${name}`, (error, data) => {
      const lastId = error ? 0 : data || 0
      done(null, generator(lastId))
    })
  }, callback)
}
