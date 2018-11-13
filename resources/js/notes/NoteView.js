/* eslint-env browser */

var NotePad = NotePad || {};

NotePad.NoteView = function(note) {
  "use strict";
  this.el = NotePad.Helper.createElement(this.template, note);
  this.idView = this.el.getAttribute("data-id");
  this.titleView = this.el.querySelector(".title");
  this.textView = this.el.querySelector(".text");
  this.updateView = this.el.querySelector(".update");
  this.setTitle(note.title);
  this.setText(note.text);
  this.setUpdateTime(note.update);
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
	dateString = date.getUTCDate() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear();
	return dateString;
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
	this.titleView.innerHTML = title;
};

NotePad.NoteView.prototype.setText = function(text) {
	"use strict";
	let visibleText = text.substr(0, 61);
	if(text.length > 60) {
		visibleText += "...";
	}
	this.textView.innerHTML = visibleText;
};

NotePad.NoteView.prototype.setUpdateTime = function(timestamp) {
	"use strict";
	this.updateView.innerHTML = this.getDateString(timestamp);
};

NotePad.NoteView.prototype.setClickListener = function(callback) {
  "use strict";
  this.clickListener = callback;
};

