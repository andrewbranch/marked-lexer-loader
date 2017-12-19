const fs = require('fs');
const path = require('path');
const marked = require('marked');
const compiler = require('./compiler');
const markdownSource = fs.readFileSync(path.resolve(__dirname, 'example.md'), 'utf8');

test('outputs lexer output', done => {
  compiler('example.md').then(stats => {
    const output = stats.toJson().modules[0].source;
    expect(output).toEqual(marked.lexer(markdownSource));
    done();
  })
});
