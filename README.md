# rollup-plugin-es6-class-minify

[Rollup](https://github.com/rollup/rollup) plugin to minify ES6 classes and objects.

Current minifiers cannot minify ES6 class fields and member functions.
This is because they are not able to track the class when a method is called on an object.

This package provides a simple way to minify class fields and members by
manually prefixing the name with a `$`-sign.
This package will rename all fields and members in a class and all corresponding
accesses on an object.
This package does not need to track which object is an instance of which class,
because it can simply rename all usages of a `$`-field or method.
The standard JavaScript definitions do not include such names, so built-in 
names are never accidentally minified.

## Installation

```bash
npm install rollup-plugin-es6-class-minify
```

## Usage

Single file:
```javascript
import { rollup } from 'rollup';
import { rollupPluginES6ClassMinify } from 'rollup-plugin-es6-class-minify';

rollup({
  input: 'main.js',
  plugins: [
    rollupPluginES6ClassMinify(),
  ],
})
```

When you have several JavaScript files for which the minified versions should
use the same mappings.
Re-use the same instance like this:
```javascript
import { rollup } from 'rollup';
import { rollupPluginES6ClassMinify } from 'rollup-plugin-es6-class-minify';

const es6ClassMinify = rollupPluginES6ClassMinify()

rollup({
  input: 'bundle1.js',
  plugins: [
    es6ClassMinify,
  ],
})

rollup({
  input: 'bundle2.js',
  plugins: [
    es6ClassMinify,
  ],
})
```

## Example

Plain code:
```javascript
class Counter {
  $count = 0
  
  $plus() {
    this.$count++
  }
  
  $get() {
    return this.$count
  }
}

const counter = new Counter()
counter.$plus()
counter.$plus()
console.log(counter.$get())
```

Minified code:
```javascript
class Counter {
  a = 0
  
  b() {
    this.a++
  }
  
  c() {
    return this.a
  }
}

const counter = new Counter()
counter.b()
counter.b()
console.log(counter.c())
```

All class members and fields are minified.
Other variables are not minified, since there are already very good minifiers 
for those things.
You should use this package in addition to another classical minifier.

# License

MIT © Kristof Jannes
