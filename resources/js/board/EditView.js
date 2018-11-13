/* eslint-env browser */

var NotePad = NotePad || {};

NotePad.EditView = function(el) {
  "use strict";
  var that = new EventTarget(),
    titleEl = el.querySelector("[name='title']"),
    textEl = el.querySelector("[name='text'"),
    idEl = el.querySelector("[name='id'");

  el.querySelector("[name='save']").addEventListener("click",
    onSaveButtonClicked);
  el.querySelector("[name='cancel']").addEventListener("click",
    onCancelButtonClicked);

  function setVisibility(shouldBeVisible) {
    if (shouldBeVisible) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
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

  that.show = setVisibility.bind(this, true);
  that.hide = setVisibility.bind(this, false);
  that.setNote = setNote;
  return that;
};