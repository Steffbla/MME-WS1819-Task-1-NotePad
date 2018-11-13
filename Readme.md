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

Eine eigentständige Erweiterung der Aufgabenstellung ist nicht notwendig. Unabhängig davon können Sie natürlich gerne eigene Features, Verbesserungsvorschläge oder andere Inhalte ergänzen. Kennzeichnen Sie diese Änderungen bitte im Code.

## Aufgabenstellung

Um die Aufgabenstellung vollständig zu erfüllen, müssen Sie alle hier aufgeführten *Features* implementieren und die unter *Design* beschriebenen Anforderungen umsetzten.

### Beschreibung des Anwendungsablaufs

### Feature: Übersicht über vorhandene Notizen

### Feature: Hinzufügen neuer Notizen

### Feature: Editieren vorhandener Notizen

### Design: Model und View

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

### NoteStorage (NoteStorage.js)

### BoardView (BoardView.js)

### EditorView (EditView.js)

