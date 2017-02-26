'use strict';

var test = require('tape');
var remark = require('remark');
var htmlEmojiImage = require('./index.js');

var processor = remark().use(htmlEmojiImage);

test('remark-html-emoji-image', function (t) {
  processor.process('😄', function (err, file) {
    t.ifErr(err);
    t.equal(String(file), '![](http://www.tortue.me/emoji/smile.png ":smile:")\n');
  });

  processor.process([
    'a😄 ',
    '👍 b',
    '😄a ',
    'b 👍',
    'a 👍 b',
    'a👍b',
    ''
  ].join('\n'), function (err, file) {
    t.ifErr(err);

    t.equal(String(file), [
      'a![](http://www.tortue.me/emoji/smile.png ":smile:") ',
      '![](http://www.tortue.me/emoji/+1.png ":+1:") b',
      '![](http://www.tortue.me/emoji/smile.png ":smile:")a ',
      'b ![](http://www.tortue.me/emoji/+1.png ":+1:")',
      'a ![](http://www.tortue.me/emoji/+1.png ":+1:") b',
      'a![](http://www.tortue.me/emoji/+1.png ":+1:")b',
      ''
    ].join('\n'));
  });

  t.end();
});
