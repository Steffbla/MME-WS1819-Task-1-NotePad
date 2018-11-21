/* eslint-env browser */

// namespace object for this app
var NotePad = NotePad || {};

/**
 * NotePad.EditView
 *
 * View module for the NotePad-App
 * 
 * This view is used to render and control the editor. It provides public methods to show and hide the editor and to display a note's title and text in the editor's input elments.
 *
 * Events: 
 *   noteChanged: Fired when the user clicks on the 'save'-Button while the editor is visible | Event contains the id of the currently displayed note and it's possibly modified title and text
 */
NotePad.EditView = function() {
  "use strict";

  var that = new EventTarget(),
    editorEl,
    titleEl,
    textEl,
    idEl;

  function init(el) {
    editorEl = el;
    titleEl = el.querySelector("[name='title']");
    textEl = el.querySelector("[name='text'");
    idEl = el.querySelector("[name='id'");
    el.querySelector("[name='save']").addEventListener("click",
      onSaveButtonClicked);
    el.querySelector("[name='cancel']").addEventListener("click",
      onCancelButtonClicked);
    return that;
  }

  function setVisibility(shouldBeVisible) {
    if (shouldBeVisible) {
      editorEl.classList.remove("hidden");
    } else {
      editorEl.classList.add("hidden");
    }
  }

  function setNote(note) {
    idEl.value = note.id;
    titleEl.value = note.title;
    textEl.value = note.text;
  }

  function onCancelButtonClicked() {
    that.hide();
  }

  function onSaveButtonClicked() {
    let event = new Event("noteChanged");
    event.note = {
      id: parseInt(idEl.value),
      title: titleEl.value,
      text: textEl.value,
    };
    that.dispatchEvent(event);
  }

  that.init = init;
  that.show = setVisibility.bind(this, true);
  that.hide = setVisibility.bind(this, false);
  that.setNote = setNote;
  return that;
};