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
  }

  function initNoteStorage() {
    notes = NotePad.NoteStorage();
    notes.addEventListener("noteCreated", onNoteCreated);
    notes.addEventListener("noteUpdated", onNoteUpdated);
  }

  function initBoard() {
    let boardEl = document.querySelector("#board");
    board = NotePad.BoardView(boardEl);
    board.addEventListener("noteClicked", onNoteClickedInBoard);
  }

  function initEditor() {
    let editorEl = document.querySelector("#editor");
    editor = NotePad.EditView(editorEl);
    editor.addEventListener("noteChanged", onNoteChanged);
  }

  function initAddButton() {
    let button = document.querySelector("#add-note-button");
    button.addEventListener("click", onAddNoteButtonClicked);
  }

  function onNoteCreated(event) {
    let note = event.note;
    board.add(note);
  }

  function onNoteUpdated(event) {
    let note = event.note;
    board.update(note);
    editor.hide();
  }

  function onAddNoteButtonClicked() {
    notes.create("Title", "Text");
  }

  function onNoteClickedInBoard(event) {
    let note = notes.get(event.noteID);
    editor.setNote(note);
    editor.show();
  }

  function onNoteChanged(event) {
    let note = event.note;
    notes.update(note);
  }

  that.init = init;
  return that;
}());

NotePad.App.init();