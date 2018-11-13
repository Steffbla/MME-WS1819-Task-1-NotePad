/* eslint-env browser */

var NotePad = NotePad || {};

NotePad.Note = function(id, title, text, update) {
  "use strict";

  this.id = id;
  this.title = title;
  this.text = text;
  if (update) {
    this.update = update;
  } else {
    this.update = Date.now();
  }
};

NotePad.Note.prototype.setTitle = function(title) {
  "use strict";
  this.title = title;
  this.update = Date.now();
};

NotePad.Note.prototype.setText = function(text) {
  "use strict";
  this.text = text;
  this.update = Date.now();
};

NotePad.Note.prototype.copy = function() {
  "use strict";
  let copy = new NotePad.Note(this.id, this.title, this.text);
  copy.update = this.update;
  return copy;
};