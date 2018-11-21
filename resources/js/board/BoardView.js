/* eslint-env browser */

// namespace object for this app
var NotePad = NotePad || {};

/**
 * NotePad.BoardView
 *
 * View module for the NotePad-App
 * 
 * This view is used to render multiple NoteViews. It provides public methods to add and update views. 
 * To Both methods Note objects are passed, representing the logical Notes which should be displayed. 
 * 
 * Events: 
 *   noteClicked: Fired when the user clicks on one of the displayed notes | Event contains the id of the clicked note
 */
NotePad.BoardView = function() {
  "use strict";

  var that = new EventTarget(),
    boardEl,
    noteViews = [];

  function init(el) {
    boardEl = el;
    return that;
  }

  function addNote(note) {
    let view = new NotePad.NoteView(note);
    view.setClickListener(onNoteClicked);
    noteViews.push(view);
    boardEl.appendChild(view.el);
  }

  function updateNote(note) {
    let view = findViewByID(note.id);
    view.update(note);
  }

  function findViewByID(id) {
    let foundView = noteViews.find(function(view) {
      return view.getID() === id;
    });
    if (foundView) {
      return foundView;
    }
    return undefined;
  }

  function onNoteClicked(data) {
    let event = new Event("noteClicked");
    event.noteID = data.noteID;
    that.dispatchEvent(event);
  }

  that.init = init;
  that.add = addNote;
  that.update = updateNote;
  return that;
};