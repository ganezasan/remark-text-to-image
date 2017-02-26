'use strict';

var test = require('tape');
var remark = require('remark');
var html = require('remark-html');
var htmlEmojiImage = require('./');

test('remark-html-emoji-image', function (t) {
  remark().use(htmlEmojiImage).process('😄', function (err, file) {
    t.ifErr(err);
    t.equal(String(file), '![](http://www.tortue.me/emoji/smile.png ":smile:")\n');
  });

  remark().use(htmlEmojiImage).process([
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
      'a![](http://www.tortue.me/emoji/smile.png ":smile:") ',
      '![](http://www.tortue.me/emoji/+1.png ":+1:") b',
      '![](http://www.tortue.me/emoji/smile.png ":smile:")a ',
      'b ![](http://www.tortue.me/emoji/+1.png ":+1:")',
      'a ![](http://www.tortue.me/emoji/+1.png ":+1:") b',
      'a![](http://www.tortue.me/emoji/+1.png ":+1:")b',
      ''
    ].join('\n'), 'should work');
  });

  remark().use(htmlEmojiImage).use(html).process([
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
        '<p>a<img src="http://www.tortue.me/emoji/smile.png" alt=":smile:" title=":smile:" align="absmiddle" class="emoji">',
        '<img src="http://www.tortue.me/emoji/+1.png" alt=":+1:" title=":+1:" align="absmiddle" class="emoji"> b',
        '<img src="http://www.tortue.me/emoji/smile.png" alt=":smile:" title=":smile:" align="absmiddle" class="emoji">a',
        'b <img src="http://www.tortue.me/emoji/+1.png" alt=":+1:" title=":+1:" align="absmiddle" class="emoji">',
        'a <img src="http://www.tortue.me/emoji/+1.png" alt=":+1:" title=":+1:" align="absmiddle" class="emoji"> b',
        'a<img src="http://www.tortue.me/emoji/+1.png" alt=":+1:" title=":+1:" align="absmiddle" class="emoji">b</p>',
        ''
      ].join('\n'),
      'should transform to HTML'
    );
  });

  t.end();
});
