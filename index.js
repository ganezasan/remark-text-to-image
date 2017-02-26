'use strict';

var visit = require('unist-util-visit');
var gemoji = require('gemoji');
var escape = require('escape-string-regexp');

module.exports = htmlEmojiImage;

var regex = create();

function htmlEmojiImage(options) {
  var settings = options || {};
  var base = settings.base;
  var extname = settings.extname || '.png';

  if (!base) {
    throw new Error('Missing `base` in options for `remark-html-emoji-image`');
  }

  return transformer;

  function transformer(tree) {
    visit(tree, 'text', visitor);
  }

  function visitor(node, position, parent) {
    var definition = [];
    var lastIndex = 0;
    var match;
    var unicode;
    var matchGemoji;
    var text;
    var last;

    while ((match = regex.exec(node.value)) !== null) {
      unicode = match[0];
      matchGemoji = gemoji.unicode[unicode];

      if (match.index !== lastIndex) {
        definition.push(extractText(node.value, lastIndex, match.index));
      }

      definition.push({
        type: 'image',
        url: base + matchGemoji.name + extname,
        title: ':' + matchGemoji.name + ':',
        data: {
          hName: 'img',
          hProperties: {
            align: 'absmiddle',
            alt: ':' + matchGemoji.name + ':',
            className: ['emoji']
          },
          hChildren: []
        }
      });

      lastIndex = match.index + unicode.length;
    }

    if (lastIndex !== node.value.length) {
      text = extractText(node.value, lastIndex, node.value.length);
      definition.push(text);
    }

    last = parent.children.slice(position + 1);
    parent.children = parent.children.slice(0, position);
    parent.children = parent.children.concat(definition);
    parent.children = parent.children.concat(last);
  }

  function extractText(string, start, end) {
    var startLine = string.slice(0, start).split('\n');
    var endLine = string.slice(0, end).split('\n');

    return {
      type: 'text',
      value: string.slice(start, end),
      position: {
        start: {
          line: startLine.length,
          column: startLine[startLine.length - 1].length + 1
        },
        end: {
          line: endLine.length,
          column: endLine[endLine.length - 1].length + 1
        }
      }
    };
  }
}

function create() {
  var unicode = gemoji.unicode;
  var sources = [];
  var key;

  for (key in unicode) {
    sources.push(escape(key));
  }

  sources.sort(sort);

  return new RegExp(sources.join('|'), 'g');

  function sort(a, b) {
    return b.length - a.length;
  }
}
