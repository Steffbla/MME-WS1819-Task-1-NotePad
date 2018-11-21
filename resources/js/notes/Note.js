/* eslint-env browser */

// namespace object for this app
var NotePad = NotePad || {};

/**
 * NotePad.Note
 *
 * Prototype for representing a single, logical note
 * 
 * Each note has an ID, a title, text and update timestamp. All values are passed to the constructor. 
 * The prototype provides setter methods (for title and text) and a clone/copy mechanism.
 */
NotePad.Note = (function() {
  "use strict";

  function Note(id, title, text, update) {
    this.id = id;
    this.title = title;
    this.text = text;
    if (update) {
      this.update = update;
    } else {
      this.update = Date.now();
    }
  }

  Note.prototype.setTitle = function(title) {
    this.title = title;
    this.update = Date.now();
  };

  Note.prototype.setText = function(text) {
    this.text = text;
    this.update = Date.now();
  };

  // we will use copies to pass notes through the app without risking external modifications
  Note.prototype.copy = function() {
    let copy = new NotePad.Note(this.id, this.title, this.text);
    copy.update = this.update;
    return copy;
  };

  return Note;
}());