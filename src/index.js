const _ = require('lodash/core')
const MagicString = require('magic-string')

const REGEX = /(\$\w+)\W/g

const VARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const SIZE = VARS.length

function es6classMinify(options = {}) {
  const mapping = new Map()
  let nextVarID = 0

  const scanFile = (code) => {
    const toReplace = new Map()
    const matches1 = code.match(REGEX)
    if (matches1 != null) {
      for (const match of matches1) {
        REGEX.lastIndex = 0
        const name = REGEX.exec(match)[1]
        toReplace.set(name, (toReplace.get(name) || 0) + 1)
      }
    }
    const sorted = _.sortBy(Array.from(toReplace.entries()), [(a, b) => a[1] - b[1],])
    for (const [key] of sorted) {
      if (!mapping.has(key)) {
        mapping.set(key, getNextVar())
      }
    }
  }

  const getNextVar = () => {
    let v = ''
    let n = nextVarID++
    let done = false
    while (!done) {
      const r = n % SIZE
      if (r === n) {
        done = true
      }
      v = VARS[r] + v
      n = ((n / SIZE) >>> 0) - 1
    }
    return v
  }

  return {
    name: 'es6-class-minify',

    transform(code) {
      scanFile(code)

      const magicCode = new MagicString(code)

      for (const [name, newName] of mapping) {
        const regex = new RegExp(`${name.replace('$', '\\$')}\\W`, 'g')

        while (true) {
          const match = regex.exec(code)
          if (match == null) {
            break
          }
          magicCode.overwrite(match.index, match.index + name.length, newName)
        }
      }

      const result = { code: magicCode.toString() }
      if (options.sourceMap !== false && options.sourcemap !== false) {
        result.map = magicCode.generateMap({ hires: true })
      }

      return result
    },
  }
}

module.exports = es6classMinify
