/* eslint-env browser */
/* global DOMHelper */

var NotePad = NotePad || {};

NotePad.NoteView = function(note) {
  "use strict";
  this.el = DOMHelper.createElement(this.template, note);
  this.idView = this.el.getAttribute("data-id");
  this.titleView = this.el.querySelector(".title");
  this.textView = this.el.querySelector(".text");
  this.updateView = this.el.querySelector(".update");
  this.update(note);
  this.el.addEventListener("click", function() {
    if (this.clickListener) {
      this.clickListener({
        noteID: this.getID(),
      });
    }
  }.bind(this));
};

NotePad.NoteView.prototype.template = document.querySelector(
  "#note-view-template").innerHTML.trim();

NotePad.NoteView.prototype.getDateString = function(timestamp) {
  "use strict";
  let date = new Date(timestamp),
    seperator = NotePad.Config.dateSeperator,
    dateString = date.getUTCDate() + seperator + (date.getUTCMonth() + 1) +
    seperator + date.getUTCFullYear();
  return dateString;
};

NotePad.NoteView.prototype.shortenText = function(text, length) {
  "use strict";
  let visibleText = text.substr(0, length),
    suffix = NotePad.Config.shortenedTextSuffix;
  if (text.length > length) {
    visibleText = visibleText.substr(0, visibleText.length - suffix.length) +
      suffix;
  }
  return visibleText;
};

NotePad.NoteView.prototype.update = function(note) {
  "use strict";
  this.setTitle(note.title);
  this.setText(note.text);
  this.setUpdateTime(note.update);
};

NotePad.NoteView.prototype.getID = function() {
  "use strict";
  return parseInt(this.el.getAttribute("data-id"));
};

NotePad.NoteView.prototype.setTitle = function(title) {
  "use strict";
  this.titleView.innerHTML = this.shortenText(title, NotePad.Config.titleLengthOnCard);
};

NotePad.NoteView.prototype.setText = function(text) {
  "use strict";
  this.textView.innerHTML = this.shortenText(text, NotePad.Config.textLengthOnCard);
};

NotePad.NoteView.prototype.setUpdateTime = function(timestamp) {
  "use strict";
  this.updateView.innerHTML = this.getDateString(timestamp);
};

NotePad.NoteView.prototype.setClickListener = function(callback) {
  "use strict";
  this.clickListener = callback;
};