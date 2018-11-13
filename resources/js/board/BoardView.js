/* eslint-env browser */

var NotePad = NotePad || {};

NotePad.BoardView = function() {
  "use strict";

  var that = new EventTarget(),
    boardEl,
    noteEls = [];

  function init(el) {
    boardEl = el;
    return that;
  }

  function addNote(note) {
    let view = new NotePad.NoteView(note);
    view.setClickListener(onNoteClicked);
    noteEls.push(view);
    boardEl.appendChild(view.el);
  }

  function updateNote(note) {
    let view = findViewByID(note.id);
    view.update(note);
  }

  function findViewByID(id) {
    let foundView = noteEls.find(function(view) {
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