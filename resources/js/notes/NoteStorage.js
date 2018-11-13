/* eslint-env browser */

var NotePad = NotePad || {};

NotePad.NoteStorage = function() {
  "use strict";
  var that = new EventTarget(),
    notes = [];

  function createNote(title, text) {
    let id = getRandomID(),
      note = new NotePad.Note(id, title, text),
      event = new Event("noteCreated");
    notes.push(note);
    event.note = note.copy();
    that.dispatchEvent(event);
  }

  function updateNote(note) {
    let currentNote = getNote(false, note.id);
    if (currentNote) {
      currentNote.setTitle(note.title);
      currentNote.setText(note.text);
      let event = new Event("noteUpdated");
      event.note = currentNote.copy();
      that.dispatchEvent(event);
    }
  }

  function getNote(external, id) {
    let foundNote = notes.find(function(note) {
      return note.id === id;
    });
    if (foundNote) {
      if (external) {
        return foundNote.copy();
      } 
      return foundNote;
    }
    return undefined;
  }

  function getRandomID() {
    // Create a random (hex) ID by combining the current timestamp with a randomized suffix
    return notes.length + 1;
  }

  that.create = createNote;
  that.update = updateNote;
  that.get = getNote.bind(this, true);
  return that;
};