/* eslint-env browser */

var NotePad = NotePad || {};

NotePad.NoteStorage = function() {
  "use strict";

  const LOCAL_STORAGE_KEY = "NotePad";

  var that = new EventTarget(),
    notes = [];

  function saveNotesToBrower() {
    let jsonNotes = JSON.stringify(notes);
    localStorage.setItem(LOCAL_STORAGE_KEY, jsonNotes);
  }

  function restoreNotesFromBrowser() {
    let jsonNotes = localStorage.getItem(LOCAL_STORAGE_KEY),
      restoredNotes = JSON.parse(jsonNotes);
    if (restoredNotes) {
      for (let i = 0; i < restoredNotes.length; i++) {
        let note = restoredNotes[i];
        addNote(note.id, note.title, note.text, note.update);
      }
    } else {
      notes = [];
    }
  }

  function createNote(title, text) {
    let id = getRandomID();
    addNote(id, title, text);
  }

  function addNote(id, title, text, update) {
    let note = new NotePad.Note(id, title, text, update),
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
    saveNotesToBrower();
  }

  function getNote(asCopy, id) {
    let foundNote = notes.find(function(note) {
      return note.id === id;
    });
    if (foundNote) {
      if (asCopy) {
        return foundNote.copy();
      }
      return foundNote;
    }
    return undefined;
  }

  function getRandomID() {
    return notes.length + 1;
  }

  that.create = createNote;
  that.update = updateNote;
  that.restore = restoreNotesFromBrowser;
  that.get = getNote.bind(this, true);
  return that;
};