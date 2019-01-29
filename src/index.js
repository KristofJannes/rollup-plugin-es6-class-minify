const ES6ClassMinify = require('es6-class-minify').ES6ClassMinify

function es6classMinify(options = {}) {
  const es6ClassMinify = new ES6ClassMinify()

  return {
    name: 'es6-class-minify',

    transform(code) {
      return es6ClassMinify.minify(code)
    },
  }
}

module.exports = es6classMinify
