import ES6ClassMinify from "es6-class-minify";

export default function es6classMinify(exclude = []) {
  const es6ClassMinify = new ES6ClassMinify(exclude);

  return {
    name: "es6-class-minify",

    transform(code) {
      return es6ClassMinify.minify(code);
    },
  };
}
