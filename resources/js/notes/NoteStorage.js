/* eslint-env browser */

// namespace object for this app
var NotePad = NotePad || {};

/**
 * NotePad.NoteStorage
 *
 * Model module for the NotePad-App
 * 
 * The note storage is used to create, save and modify all notes. For this purpose, the module provides a public interface to create new, update and retrieve existing notes.  
 * The storage is the app's only component able to modify an exsiting note. Through public events and methods only copies of the stored notes are send outwards. All notes are
 * stored in the local storage from wich they are restored at the start.
 *
 * Events:
 *   noteCreated: Fired when a new note was created | Event contains a copy of the newly created note
 *   noteUpdated: Fired when a existing note was updated | Event contains a copy of the updated note
 */
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
    // New notes are currently saved only after first update
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
    // a simple solution for providing a unique ID given that we won't delete any notes
    return notes.length + 1;
  }

  that.create = createNote;
  that.update = updateNote;
  that.restore = restoreNotesFromBrowser;
  that.get = getNote.bind(this, true);
  return that;
};