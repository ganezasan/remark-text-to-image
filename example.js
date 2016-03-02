// Dependencies:
var remark = require('remark');
var htmlEmojiImage = require('./index.js');

// Process:
var doc = remark().use(htmlEmojiImage).process([
    '😄 👍'
].join('\n'));

// Yields:
console.log('md', doc);
