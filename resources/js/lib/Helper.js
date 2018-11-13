/* eslint-env browser */

var NotePad = NotePad || {};

NotePad.Helper = (function() {
  "use strict";

  var that = {};

  function createElement(template, data) {
    let container = document.createElement("div"),
      // RegEx from: https://stackoverflow.com/questions/17056064/javascript-regex-match-all-and-replace
      elString = template.replace(/\{\{(.*?)\}\}/g, function(match, token) {
        return data[token];
      });
    container.innerHTML = elString;
    return container.firstChild;
  }

  that.createElement = createElement;
  return that;
}());