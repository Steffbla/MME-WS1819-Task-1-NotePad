# Übungsaufgabe: NotePad

![Screencast der finalen Anwendung](/docs/screencast.gif)

In dieser Aufgabe implementieren Sie eine Anwendung, mit deren Hilfe Nutzer digitale Notizzettel erstellen können. Auf den Notizen werden Titel und Text notiert. Erstellte Notizen können zu einem späteren Zeitpunkt editiert werden. Das Datum der letzten Änderung wird auf dem Notizzettel angezeigt. Lesen Sie sich zu Beginn die komplette Aufgabenstellung durch. Ihre Aufgabe beschränkt sich auf die Implementierung der Programmlogik mit Javascript. Sie müssen keine Änderungen am vorgegebenen CSS-Dokument oder der HTML-Datei vornehmen. Erweitern Sie nur den bereits vorhanden Javascript-Code. **Abgabetermin ist der 28. November 2018. Wir bewerten den letzten Commit, der an diesem Abgabetag in das Repository *gepusht* wird.** Informationen zur Nutzung von _Github_ finden Sie im GRIPS-Kurs. 

Bei Fragen zur Übungsaufgabe können Sie in das [GRIPS-Forum](https://elearning.uni-regensburg.de/mod/forum/view.php?id=1019010) *posten* oder diese per Mail (mi.mme@mailman.uni-regensburg.de) stellen.

## Bewertungskriterien

Wir werden Ihre Abgabe hinsichtlich der folgenden Kriterien bewerten:
* Ist die Aufgabenstellung vollständig erfüllt worden?
* Ist die Aufgabe fehler- und bugfrei implementiert worden?
* Lässt sich eine ausreichend hohe Codequalität feststellen?
* Wurde (im Rahmen der Aufgabenstellung) auf eine gute Bedienbarkeit der Anwendung geachtet?

Eine eigentständige Erweiterung der Aufgabenstellung ist nicht notwendig. Unabhängig davon können Sie natürlich gerne eigene Features, Verbesserungsvorschläge oder andere Inhalte ergänzen. Kennzeichnen Sie diese Änderungen bitte im Code. Ein dauerhaftes, *session*-übergreifendes Speichern der Notizen ist nicht erforderlich.

## Aufgabenstellung

Um die Aufgabenstellung vollständig zu erfüllen, müssen Sie alle hier aufgeführten *Features* implementieren und die unter *Design* beschriebenen Anforderungen umsetzten.

### Beschreibung des Anwendungsablaufs

1. Nach dem Starten wird dem Benutzer ein leeres Notizbuch angezeigt.

2. Durch einen Klick auf das `+`-Symbol wird eine neue Notiz mit Platzhaltererten für Titel (*Titel*) und Text (*Text*) erstellt und im Notizbuch angezeigt. Beim Erstellen der Notiz wird deren Aktualisierungsdatum auf das aktuelle Datum gesetzt. Zur internen Verarbeitung wird der erstellten Notiz eine eindeutige ID zugewiesen. 

3. Der Nutzer kann die erstellte Notiz anklicken, um diese zu bearbeiten. Die zu bearbeitende Notiz wird in einer Editor-Ansicht geladen, in der der Nutzer Titel und Text ändern kann. Der Nutzer hat die Möglichkeit, die Änderungen zu verwerfen (Button: `cancel`) oder zu speichern (Button: `save`). In beiden Fällen wird der Editor anschließend geschlossen.

4. Der Nutzer kann nun weitere Notizen hinzufügen.

### Vorgaben

Im vorgegebenen Projekt finden Sie alle notwendigen HTML- und CSS-Dateien zur Implementierung der Anwendung. Neue Notizen werden angezeigt, in dem der vorhandenen Liste (`<ul id="board"></ul>`) neue Kindelemente hinzugefügt werden. Verwenden Sie für die Darstellung der Notizen das `<li>`-Element, das Sie im *Template* mit der ID `note-view-template` finden. Die Bearbeitung bestehender Notizen erfolgt im Editor, der durch das HTML-Element mit der ID `editor` repräsentiert wird. Sie können dieses Element durch das Entfernen bzw. Hinzufügen der CSS-Klasse `hidden` ein- bzw. ausblenden.

### Feature: Übersicht über vorhandene Notizen

### Feature: Hinzufügen neuer Notizen

### Feature: Editieren vorhandener Notizen

### Design: Model und View

### Empfohlenes Vorgehen


# Modul-Struktur der Anwendung

Die Code-Struktur der Anwendung basiert auf dem [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) bzw. [MVP](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter) -Muster. Die unterschiedlichen Zuständigkeitsbereiche werden durch separate Module abgebildet, die jeweils in einer eigenen Datei implementiert werden. Im vorgegebenen Projekte finden Sie vorbereitete Dateien für eine sinnvolle Aufteilung der Module. Im `NotePad.js` ist bereits eine grundlegende *revealing module pattern*-Struktur implementiert. Alle Dateien werden durch `<script>`-Tags der `index.html`-Datei eingebunde und ausgeführt.

### Note

Bilden Sie die einzelnen, logischen Notizen als einfache *Javascript*-Ojekte ab. Ein Vorschlag für die Implementierung für dieses grundlegende Objekt ist hier aufgeführt. Sie können diese Objektstruktur für Ihre Implementierung verwenden oder einen eigenen Vorschlag entwerfen:

``` javascript 

function Note(id, title, text) {
  this.id = id;
  this.title = title;
  this.text = text;
  this.update = Date.now();
};

Note.prototype.setTitle = function(title) {
  this.title = title;
  this.update = Date.now();
};

Note.prototype.setText = function(text) {
  this.text = text;
  this.update = Date.now();
};
```

### App (NotePad.js)

Verwenden Sie dieses Modul zur Initalsierung und Steuerung der Anwendung. Initalisieren Sie hier die anderen Module und fangen Sie die Events, die Sie an anderer Stelle generieren, hier ab. Das Modul soll als Vermittler zwischen den übrigen Komponenten dienen, die im besten Fall keine direkte Verbindung benötigen.

### NoteStorage (NoteStorage.js)

Verwalten Sie in diesem Modul die Liste der gespeicherten Notizen. Sorgen Sie dafür, dass nur diese Komponenten der Anwendung neue Notizen erstellen und bestehende Notizen aktualisieren kann.

### BoardView (BoardView.js)

Dieses Modul verwaltet die Menge der **angezeigten** Notizen, die die im `NoteStorage` gespeicherten Notizen repräsentieren. Das Modul informiert die zentrale App, wenn der Nutzer eine der Notizen anklickt. Das Modul verwendet das HTML-Element `<ul id="board">` sowie das in `<template id="note-view-template">` gespeicherte Template.

### EditorView (EditView.js)

Das Modul verwaltet den Editor, der zur Bearbeitung einer existierenden Notiz verwendet wird. Der Editor stellt Titel und Text einer beliebigen Notiz dar und erlaubt dem Benutzer, die angezeigten Inhalte zu manipulieren. Der Editor ändert **nicht** selbständig die im `NoteStorage` gespeicherten Notizen, sondern informiert die zentrale App über die Änderungen, die der Nutzer an der angezeigten Notiz vorgenommen und bestätigt hat. Das Modul verwendet das HTML-Element `<div id="editor" class="hidden">`.

