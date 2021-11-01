# Tiny-Erp
In dieser Beispielapplikation wurden folgende Konzepte erkundet:
- Webapplikation
- Authorisierung/Authentifizierung
- Multi-User-Applikation
- Rest-Schnittstelle
- Session Handling
- Responsives UI-Design mit einem Web-Frontend-Framework
- Object-Relational-Mapping (ORM)

Folgende Technologien werden im Projekt verwendet
- Java Springboot
- Json Web Token (JWT)
- Bootstrap
- HTML / Javascript / SCSS

## Loslegen
Folgende Schritte befolgen um loszulegen:
1. Sicherstellen, dass JDK 12 installiert und in der Umgebungsvariable `path` definiert ist.
1. Ins Verzeichnis der Applikation wechseln und über die Kommandozeile mit `./gradlew bootRun` oder `./gradlew.bat bootRun` starten
1. Unittest mit `./gradlew test` oder `./gradlew.bat test` ausführen.
1. Ein ausführbares JAR kann mit `./gradlew bootJar` oder `./gradlew.bat bootJar` erstellt werden.

Folgende Dienste stehen während der Ausführung im Profil `dev` zur Verfügung:
- REST-Schnittstelle der Applikation: http://localhost:8081
- Dashboard der H2 Datenbank: http://localhost:8081/h2-console
