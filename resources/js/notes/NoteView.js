/* eslint-env browser */

// namespace object for this app
var NotePad = NotePad || {};

/**
 * NotePad.NoteView
 *
 * Prototype of a single view to render a note's content on screen
 * 
 * To show a logical note (NotePad.Note) to the user, we have to render it in the form of a DOM node. This prototype is provided with
 * an object (NotePad.Note) and creates a html representation of it (accessible by the property el). The prototype provides a method
 * to update the view's content based on a new note object. Each view allows a single observer to listen on click events.
 */ 
NotePad.NoteView = (function() {
  "use strict";

  // template string to build a new view
  const NOTE_VIEW_TEMPLAT = document.querySelector(
    "#note-view-template").innerHTML.trim();

  // shared (private) method to create a new element, binding the content of an object (data) to a template (template)
  function createElement(template, data) {
    let container = document.createElement("div"),
      // RegEx from: https://stackoverflow.com/questions/17056064/javascript-regex-match-all-and-replace
      elString = template.replace(/\{\{(.*?)\}\}/g, function(match, token) {
        return data[token];
      });
    container.innerHTML = elString;
    return container.firstChild;
  }

  // shared (private) method to get a formated version of a timestamp (DD/MM/YYYY)
  function getDateString(timestamp) {
    let date = new Date(timestamp),
      seperator = NotePad.Config.dateSeperator,
      dateString = date.getUTCDate() + seperator + (date.getUTCMonth() +
        1) +
      seperator + date.getUTCFullYear();
    return dateString;
  }

  // shared (private) method to shorten a given text to a certain length. A suffix is attatched to every shortened string 
  function shortenText(text, length) {
    let visibleText = text.substr(0, length),
      suffix = NotePad.Config.shortenedTextSuffix;
    if (text.length > length) {
      visibleText = visibleText.substr(0, visibleText.length - suffix.length) +
        suffix;
    }
    return visibleText;
  }

  // shared (private) callback for click events on the view
  function onNoteClicked() {
    if (this.clickListener) {
      // call the registered callback and pass the clicked note's ID 
      this.clickListener({
        noteID: this.getID(),
      });
    }
  }

  function NoteView(note) {
    this.el = createElement(NOTE_VIEW_TEMPLAT, note);
    this.el.addEventListener("click", onNoteClicked.bind(this));
    this.idView = this.el.getAttribute("data-id");
    this.titleView = this.el.querySelector(".title");
    this.textView = this.el.querySelector(".text");
    this.updateView = this.el.querySelector(".update");
    this.update(note);
  }

  NoteView.prototype.update = function(note) {
    // we will not update the view if the new note does not have the same ID as the original one
    if(this.getID() !== note.id) {
      return;
    }
    this.setTitle(note.title);
    this.setText(note.text);
    this.setUpdateTime(note.update);
  };

  NoteView.prototype.getID = function() {
    return parseInt(this.el.getAttribute("data-id"));
  };

  NoteView.prototype.setTitle = function(title) {
    this.titleView.innerHTML = shortenText(title, NotePad.Config.titleLengthOnCard);
  };

  NoteView.prototype.setText = function(text) {
    this.textView.innerHTML = shortenText(text, NotePad.Config.textLengthOnCard);
  };

  NoteView.prototype.setUpdateTime = function(timestamp) {
    this.updateView.innerHTML = getDateString(timestamp);
  };

  NoteView.prototype.setClickListener = function(callback) {
    this.clickListener = callback;
  };

  return NoteView;
}());