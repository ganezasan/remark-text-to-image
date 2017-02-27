# remark-html-emoji-image [![Build Status][travis-badge]][travis]

[**remark**][remark] plug-in to transform emoji unicodes into html images

## Installation

[npm][npm-install]:

```bash
npm install remark-html-emoji-image
```

## Usage

```javascript
var remark = require('remark');
var htmlEmojiImage = require('remark-html-emoji-image');

var doc = remark()
  .use(htmlEmojiImage, {base: 'https://example.com/'})
  .processSync('😄 👍')
  .toString();

console.log(doc);
```

Yields:

```md
![](https://example.com/smile.png ":smile:") ![](https://example.com/+1.png ":+1:")
```

## API

### `remark().use(htmlEmojiImage[, options])`

Transform emoji unicodes into html images (like 😄 into
`![](http://example.com/smile.png ":smile:")`).

###### `options.base`

`string` — Required base URL to use for emoji images.

###### `options.extname`

`string`, default: `.png` — Optional extension (with dot) to use after
the emoji name.

## License

[MIT][license] © [Max Wu][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/jackycute/remark-html-emoji-image.svg

[travis]: https://travis-ci.org/jackycute/remark-html-emoji-image

[npm-install]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: https://github.com/jackycute

[remark]: https://github.com/wooorm/remark
