/* eslint-env browser */

var NotePad = NotePad || {};

NotePad.App = (function() {
  "use strict";

  var that = {},
    notes,
    board,
    editor;

  function init() {
    initNoteStorage();
    initBoard();
    initEditor();
    initAddButton();
    notes.restore();
  }

  function initNoteStorage() {
    notes = NotePad.NoteStorage();
    notes.addEventListener("noteCreated", onNoteCreated);
    notes.addEventListener("noteUpdated", onNoteUpdated);
  }

  function initBoard() {
    let boardEl = document.querySelector("#board");
    board = NotePad.BoardView().init(boardEl);
    board.addEventListener("noteClicked", onNoteClickedInBoard);
  }

  function initEditor() {
    let editorEl = document.querySelector("#editor");
    editor = NotePad.EditView().init(editorEl);
    editor.addEventListener("noteChanged", onNoteChanged);
  }

  function initAddButton() {
    let button = document.querySelector("#add-note-button");
    button.addEventListener("click", onAddNoteButtonClicked);
  }

  function onAddNoteButtonClicked() {
    notes.create("Title", "Text");
  }

  function onNoteCreated(event) {
    let note = event.note;
    board.add(note);
  }

  function onNoteClickedInBoard(event) {
    let note = notes.get(event.noteID);
    if (!note) {
      return;
    }
    editor.setNote(note);
    editor.show();
  }

  function onNoteChanged(event) {
    let note = event.note;
    notes.update(note);
  }

  function onNoteUpdated(event) {
    let note = event.note;
    board.update(note);
    editor.hide();
  }

  that.init = init;
  return that;
}());

NotePad.App.init();