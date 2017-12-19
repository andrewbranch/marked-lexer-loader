# marked-lexer-loader

Accepts Markdown as input, and outputs a module exporting the lexed Markdown using [marked](https://github.com/chjj/marked).

This loader does _not_ render Markdown to HTML. There are already [several loaders](https://www.npmjs.com/search?q=webpack+markdown+loader) that do. This loader is intended to be used for processing Markdown as an AST.

## Usage

```js
module: {
  rules: [{
    test: /\.md$/,
    use: {
      loader: 'markdown-lexer-loader',
      options: {
        // All options are passed to marked, merging with marked’s defaults:
        // https://github.com/chjj/marked#options-1
      }
  }]
}
```

`options` are merged with marked’s default options and passed to `marked.lexer(source, options)`.

See additional documentation on [using loaders](https://webpack.js.org/concepts/loaders/#using-loaders).

## Example output

To give a better idea of what this loader does, the Markdown snippet

```
# Hello, world
This is some Markdown
```

turns into

```js
export default [{"type":"heading","depth":1,"text":"Hello, world"},{"type":"paragraph","text":"This is some Markdown"}]
```

## Testing & contributing

Tests are run with [Jest](https://facebook.github.io/jest):

```
npm install
npm test
```

Contributions are welcome! New features or bug fixes must include tests. Try to match existing code style, or better yet, add ESLint or Prettier to this project.
