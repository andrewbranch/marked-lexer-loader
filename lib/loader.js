const marked = require('marked');
const { getOptions } = require('loader-utils')

module.exports = function(source) {
  const options = getOptions(this);
  const defaultOptions = marked.options().defaults;
  const lexed = marked.lexer(source, Object.assign({}, defaultOptions, options));
  return JSON.stringify({
    nodes: lexed,
    links: lexed.links
  });
}
