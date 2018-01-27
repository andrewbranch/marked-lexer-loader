const fs = require('fs');
const path = require('path');
const marked = require('marked');
const compiler = require('./compiler');
const markdownSource = fs.readFileSync(path.resolve(__dirname, 'example.md'), 'utf8');

const modifyingOptions = { gfm: false };
const markedDefault = marked.lexer(markdownSource);
const defaultOutput = JSON.stringify({ nodes: markedDefault, links: markedDefault.links });
const markedModified = marked.lexer(markdownSource, Object.assign({}, marked.options().defaults, modifyingOptions));
const modifiedOutput = JSON.stringify({ nodes: markedModified, links: markedModified.links });

test('outputs lexer output', done => {
  compiler('example.md').then(stats => {
    const output = stats.toJson().modules[0].source;
    expect(output).toBe(`module.exports = ${defaultOutput}`);
    done();
  })
});

test('passes marked options to marked', done => {
  // Test isn’t really valid unless our options did something, so do a quick assertion
  // to guard against breaking changes in marked causing a false positive test run.
  expect(modifiedOutput).not.toBe(defaultOutput);
  compiler('example.md', modifyingOptions).then(stats => {
    const output = stats.toJson().modules[0].source;
    expect(output).toBe(`module.exports = ${modifiedOutput}`);
    done();
  })
});
