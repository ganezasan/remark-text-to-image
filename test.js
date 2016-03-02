/**
 * @author jackycute
 * @copyright 2016 jackycute
 * @license MIT
 * @module remark:gemoji
 * @fileoverview
 *   Plug-in to transform emoji unicodes into html images
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var remark = require('remark');
var htmlEmojiImage = require('./index.js');

var processor = remark().use(htmlEmojiImage);

/*
 * Tests.
 */

test('remark-html-emoji-image', function (t) {

    processor.process([
        '😄',
        ''
    ].join('\n'), function (err, file, doc) {
        t.ifErr(err);

        t.equal(doc, [
            '![](http://www.tortue.me/emoji/smile.png ":smile:")',
            ''
        ].join('\n'));
    });

    processor.process([
        'a😄 ',
        '👍 b',
        '😄a ',
        'b 👍',
        'a 👍 b',
        'a👍b',
        ''
    ].join('\n'), function (err, file, doc) {
        t.ifErr(err);

        t.equal(doc, [
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
