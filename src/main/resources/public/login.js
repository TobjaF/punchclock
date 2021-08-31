// Simulate a mouse click:
// window.location.href = "http://www.w3schools.com";
/*
Mehrere html-files für verschiedene Ansichten und jeweils ein dazu assoziiertes js-file.
die js-files können sich den local storage teilen.
* Im index.html-javascript zu beginn einen fetch absetzen, um zu prüfen, ob wer angemeldet ist, falls nicht, auf loginpage navigieren
--> zu beginn den local storage abfragen nach einem jwt-token.
--> falls ein jwt vorhanden ist, die dashboard-seite aufrufen
    falls nicht, eine Startseite mit sign-in / sign-up Knöpfen
--> immer, wenn bei einem request ein access-denied (unauthorized 403?) code zurückkommt, soll auf eine Fehlerseite verwiesen werden.


*
* // Store
localStorage.setItem("lastname", "Smith");
// Retrieve
localStorage.getItem("lastname");
*

bootstrap: javascript und css einbinden, dann im html die bootstrap-components verwenden.



* Local storage works on a per domain basis (not per page) so any HTML pages will share the same LocalStorage database as long as they are on the same domain.
*
*
*
*
* */