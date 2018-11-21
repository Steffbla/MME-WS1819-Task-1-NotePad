/* eslint-env browser */

// namespace object for this app
var NotePad = NotePad || {};

/**
 * NotePad.Config
 *
 * Set of configuration values used within the NotePad-App
 */
NotePad.Config = {
  // maximum length of a note's displayed title (NoteView)
  titleLengthOnCard: 20,
  // maximum length of a note's displayed text (NoteView)
  textLengthOntCard: 80,
  // suffix used to mark shortened titles and texts (NoteView)
  shortenedTextSuffix: "...",
  // seperator used in the formated date (NoteView)
  dateSeperator: "/",
};

// preventing changes to configuration by freezing the object
Object.freeze(NotePad.Config);