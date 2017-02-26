'use strict';

var test = require('tape');
var remark = require('remark');
var html = require('remark-html');
var htmlEmojiImage = require('./');

test('remark-html-emoji-image', function (t) {
  t.throws(
    function () {
      remark().use(htmlEmojiImage).freeze();
    },
    /^Error: Missing `base` in options for `remark-html-emoji-image`$/,
    'should throw without `base` in options'
  );

  remark()
    .use(htmlEmojiImage, {base: 'https://example.com/'})
    .process('😄', function (err, file) {
      t.ifErr(err);
      t.equal(String(file), '![](https://example.com/smile.png ":smile:")\n', 'should accept `.base`');
    });

  remark()
    .use(htmlEmojiImage, {base: 'https://example.com/', extname: '.jpg'})
    .process('😄', function (err, file) {
      t.ifErr(err);
      t.equal(String(file), '![](https://example.com/smile.jpg ":smile:")\n', 'should accept `.extname`');
    });

  remark()
    .use(htmlEmojiImage, {base: 'https://example.com/'})
    .process([
      'a😄 ',
      '👍 b',
      '😄a ',
      'b 👍',
      'a 👍 b',
      'a👍b',
      ''
    ].join('\n'), function (err, file) {
      t.ifErr(err, 'should not fail');

      t.equal(String(file), [
        'a![](https://example.com/smile.png ":smile:") ',
        '![](https://example.com/+1.png ":+1:") b',
        '![](https://example.com/smile.png ":smile:")a ',
        'b ![](https://example.com/+1.png ":+1:")',
        'a ![](https://example.com/+1.png ":+1:") b',
        'a![](https://example.com/+1.png ":+1:")b',
        ''
      ].join('\n'), 'should work');
    });

  remark()
    .use(htmlEmojiImage, {base: 'https://example.com/'})
    .use(html)
    .process([
      'a😄 ',
      '👍 b',
      '😄a ',
      'b 👍',
      'a 👍 b',
      'a👍b',
      ''
    ].join('\n'), function (err, file) {
      t.ifErr(err, 'should not fail');

      t.equal(
        String(file),
        [
          '<p>a<img src="https://example.com/smile.png" alt=":smile:" title=":smile:" align="absmiddle" class="emoji">',
          '<img src="https://example.com/+1.png" alt=":+1:" title=":+1:" align="absmiddle" class="emoji"> b',
          '<img src="https://example.com/smile.png" alt=":smile:" title=":smile:" align="absmiddle" class="emoji">a',
          'b <img src="https://example.com/+1.png" alt=":+1:" title=":+1:" align="absmiddle" class="emoji">',
          'a <img src="https://example.com/+1.png" alt=":+1:" title=":+1:" align="absmiddle" class="emoji"> b',
          'a<img src="https://example.com/+1.png" alt=":+1:" title=":+1:" align="absmiddle" class="emoji">b</p>',
          ''
        ].join('\n'),
        'should transform to HTML'
      );
    });

  t.end();
});
