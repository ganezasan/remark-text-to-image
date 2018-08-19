'use strict';

var visit = require('unist-util-visit');
var escape = require('escape-string-regexp');

module.exports = textToImage;

function textToImage(options) {
  var settings = options || {};
  var base = settings.base;
  var extname = settings.extname || '.png';
  var list = settings.list;
  var regex = settings.regex || /:\w+:/gi;
  var classNames = settings.classNames || ['emoji'];

  if (!base) {
    throw new Error('Missing `base` in options for `remark-text-to-image`');
  }

  if (!list) {
    throw new Error('Missing `list` in options for `remark-text-to-image`');
  }

  return transformer;

  function transformer(tree) {
    visit(tree, 'text', visitor);
  }

  function visitor(node, position, parent) {
    var definition = [];
    var lastIndex = 0;
    var match;
    var code;
    var matchGemoji;
    var text;
    var last;

    while ((match = regex.exec(node.value)) !== null) {
      code = match[0];
      const key = match[0].replace(/:/g, '');

      if (match.index !== lastIndex) {
        definition.push(extractText(node.value, lastIndex, match.index));
        lastIndex = match.index;
      }

      if (list[key]) {
        matchGemoji = {
          name: key,
          url: list[key],
          alt: code
        };

        definition.push({
          type: 'image',
          url: matchGemoji.url,
          title: ':' + matchGemoji.name + ':',
          data: {
            hName: 'img',
            hProperties: {
              align: 'absmiddle',
              alt: ':' + matchGemoji.alt + ':',
              className: classNames
            },
            hChildren: []
          }
        });
        lastIndex = match.index + code.length;
      }
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
