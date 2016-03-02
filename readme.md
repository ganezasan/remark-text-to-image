# remark-html-emoji-image [![Build Status][travis-badge]][travis]

[**remark**][remark] plug-in to transform emoji unicodes into html images

## Installation

[npm][npm-install]:

```bash
npm install remark-html-emoji-image
```

## Usage

Dependencies:

```javascript
var remark = require('remark');
var htmlEmojiImage = require('remark-html-emoji-image');
```

Process:

```javascript
var doc = remark().use(htmlEmojiImage).process([
    '😄 👍'
].join('\n'));
```

Yields:

```md
![](http://www.tortue.me/emoji/smile.png ":smile:") ![](http://www.tortue.me/emoji/+1.png ":+1:")
```

## API

### `remark().use(htmlEmojiImage)`

Transform emoji unicodes into html images
  (like 😄 into `![](http://www.tortue.me/emoji/smile.png ":smile:")`).

## License

[MIT][license] © [Max Wu][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/jackycute/remark-html-emoji-image.svg

[travis]: https://travis-ci.org/jackycute/remark-html-emoji-image

[npm-install]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: https://github.com/jackycute

[remark]: https://github.com/wooorm/remark
