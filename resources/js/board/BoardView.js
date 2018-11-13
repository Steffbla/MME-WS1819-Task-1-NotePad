/* eslint-env browser */

var NotePad = NotePad || {};

NotePad.BoardView = function(el) {
  "use strict";
  var that = new EventTarget(),
    noteViews = [];

  function addNote(note) {
    let view = new NotePad.NoteView(note);
    view.setClickListener(onNoteClicked);
    noteViews.push(view);
    el.appendChild(view.el);
  }

  function updateNote(note) {
    let view = getView(note.id);
    view.update(note);
  }

  function getView(id) {
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

  that.add = addNote;
  that.update = updateNote;
  return that;
};