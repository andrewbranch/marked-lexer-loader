const marked = require('marked');
const { getOptions } = require('loader-utils')

module.exports = function(source) {
  const options = getOptions(this);
  const defaultOptions = marked.options().defaults;
  return `export default ${JSON.stringify(marked.lexer(source, Object.assign({}, defaultOptions, options)))}`;
}
