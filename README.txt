Handy-Fussballmanager Browser-Prototyp v86

Version v81:
- Untere Hauptnavigation wird waehrend eines aktiven Spiels ausgeblendet.
- Gilt fuer Spielstart, Live-Simulation, Halbzeit und Endscreen.
- Nach "Spieltag beenden" erscheint die Navigation automatisch wieder.
- Dadurch bleibt der Fokus waehrend der Spielsimulation komplett auf Match, Spielbericht, Formation, Taktik und Endscreen.

Handy-Fussballmanager Browser-Prototyp v75

Start:
1. ZIP entpacken
2. index.html per Doppelklick im Browser oeffnen

Hinweis:
- Reines HTML/CSS/JS-Browserprojekt
- Keine npm- oder Node-Installation erforderlich

Neu in v75:
- Co-Trainer-Hinweise vor dem Spiel stoppen die Wochensimulation nicht mehr
- Diese Meldungen werden nur noch als normale Info im Newscenter abgelegt
- Bereits offene Co-Trainer-Interrupts aus alten Spielstaenden werden automatisch entschaerft
- Die sichtbare Kalendersimulation laeuft nach solchen Meldungen weiter

Weiterhin enthalten aus v74:
- Die Sponsorvertrags-Auswahl erscheint nicht mehr sofort beim Spielstart
- Die Sponsorwahl wird erst nach der ersten simulierten Woche verfuegbar
- Bis dahin kann man Kader, Training, Markt und Verein vorbereiten
- In der Finanz-/Sponsoransicht erscheint bis zur Freischaltung ein Hinweis

Weiterhin enthalten aus v73:
- Die hochgeladenen Songs sind lokal im Projekt unter assets/music eingebunden
- Die Spielmusik startet beim App-/Spielstart automatisch und laeuft als Playlist in Dauerschleife
- Wenn ein mobiler Browser Autoplay blockiert, startet die Musik automatisch beim ersten Antippen
- Unter Optionen gibt es den neuen Punkt Spielmusik
- Dort kann die Musik ein- und ausgeschaltet werden
- Dort gibt es auch aktuellen Titel, naechster Song und Lautstaerke

Weiterhin enthalten aus v72:
- Vertragsentscheidungs-News haben direkte Buttons fuer Vertrag verlaengern und Abbrechen
- Der Button Vertrag verlaengern startet sofort die Vertragsverhandlung mit dem betroffenen Spieler
- Abbrechen schliesst die Pflichtnachricht, ohne den Vertrag zu veraendern
- Vertragsmeldungen werden im Newscenter als Kategorie Vertrag angezeigt

Weiterhin enthalten aus v71:
- Trainingsverletzungs-News stoppen die Wochensimulation nicht mehr
- Trainingsverletzungen werden weiterhin als Nachricht im Newscenter abgelegt, aber ohne Pflichtentscheidung
- Im Halbzeit-Reiter Spielbericht ist eine Benotung deiner Spieler zur ersten Halbzeit sichtbar
- Bei automatischen Spielstopps in der 35. oder 75. Minute zeigt der Spielbericht ebenfalls aktuelle Spielernoten
- Spielernoten werden farblich hervorgehoben: gute Noten klar gruen, schlechte Noten klar rot
- Unter Optionen gibt es den Punkt Automatische Spielstopps
- Standard: Stopp nur zur Halbzeit
- Erweitert: zusaetzliche Stopps in der 35. und 75. Minute fuer Formation, Wechsel und Taktik
- Formation und Taktik bleiben in der Halbzeit bzw. beim Taktikstopp fokussiert; wichtige Ereignisse stehen nur im Spielbericht

Weiterhin enthalten aus v70:
- Sichtbare Wochensimulation eingebaut: Beim Weiterschalten erscheint ein Kalenderfenster, das Tag fuer Tag weiterblaettert
- Newscenter erweitert um einen Priority-Interrupt-Handler fuer die Kalenderschleife
- Kritische Nachrichten wie Transferangebote, Vertragsentscheidungen oder Finanz-Ultimaten stoppen die Simulation sofort
- Soft-Interrupts fuer Scoutingberichte koennen die Simulation optional anhalten; Co-Trainer-Hinweise laufen nur als Newscenter-Info
- Im Interrupt-Fenster gibt es direkte Aktionsbuttons und eine Option, spaeter im Newscenter zu entscheiden
- Solange eine Pflichtnachricht offen ist, bleibt die Kalendersimulation angehalten und kann danach fortgesetzt werden
- Unter Optionen lassen sich Soft-Interrupts ein- oder ausschalten

Weiterhin enthalten aus v69:
- Der Schnellzugriff-Block wurde von der Home-Seite entfernt
- Home zeigt nur noch die eigentlichen Dashboard-Karten und die untere Hauptnavigation
- Die Bereiche Matchday, Transfermarkt, Verein und Saison bleiben weiterhin ueber das normale Menue erreichbar

Weiterhin enthalten aus v68:
- Echte Liga- und Vereinsnamen fuer die spielbaren Ligen eingebaut
- Die Startauswahl nutzt reale Vereinslisten statt generischer Fantasieklubs
- Tabelle, Spielplan, Gegnernamen und Weltansicht werden aus der gewaehlten echten Liga aufgebaut
- Neuer Menuepunkt Newscenter direkt neben Home
- Ungelesene News sind per Badge in der Navigation und zusaetzlich im Header/Home-Bereich sichtbar
- Newscenter mit persoenlicher Inbox, Welt-News, Ungelesen-Filter, Prioritaeten und Aktions-/Pflichtnachrichten
- Nachrichten werden als strukturierte Datenobjekte mit Kategorie, Prioritaet, Templates, IDs, Scope und Aktionsziel gespeichert
- KI-Transfers, Spielausgaenge, Finanzberichte und Startmeldungen koennen News erzeugen
- Halbzeit-Screen umgebaut: Spielbericht ist ein eigener Reiter links neben Formation
- Beim Klick auf Formation oder Taktik werden die wichtigen Ereignisse ausgeblendet

Weiterhin enthalten aus v66:
- Eigene Startseite vor der Managererstellung eingebaut
- Das hochgeladene Rasenbild ist dauerhaft als Startseitenbild im Projekt enthalten
- Startseite hat direkte Aktionen fuer neue Karriere und Spielstand laden
- Die bisherige Manager-, Liga- und Vereinsauswahl bleibt danach im Ablauf erhalten

Weiterhin enthalten aus v65:
- KI-Transferlogik fuer andere Vereine mit Kaderanalyse, Positionsbedarf, Scouting-Filtern, Budgetpruefung und Vereinsphilosophien
- Marktbereich KI-Transfers mit Prioritaeten, Transferlog und Testlauf-Button

Weiterhin enthalten aus v64:
- Mathematische Spielernoten am Spielende mit Match-Points, Positionsgewichtung und Kontextfiltern
- Niederlagen ziehen die Mannschaftsnoten spuerbar nach unten
- Endscreen bleibt kompakt: Aktionen oben, Spielernoten nur mit Spieler, Position und Note


Version v74:
- Sponsorwahl erscheint nicht mehr sofort beim Spielstart, sondern erst nach einer simulierten Woche.
- Die Vereins-/Finanzansicht zeigt bis dahin einen Hinweis, dass die Sponsorwahl noch gesperrt ist.


Version v81:
- Newscenter: Beim Durchschalten wird nur noch die Nachricht im Detailbereich aktualisiert; kein Seitensprung/Seitenwechsel-Effekt.
- Untere Tabs koennen per langem Druecken am Handy frei nach links/rechts sortiert werden.
- Aufstellung: Positionsmarker koennen per langem Druecken frei auf dem Feld verschoben werden; Spieler-Auswahl ist nach Positionspassung sortiert.
- Aufstellung, Taktik, Training und Vertragsansicht von erklaerenden Prototyp-Texten bereinigt.
- Markt heisst jetzt Transfers; KI-Transfers wurden aus den sichtbaren Menues entfernt.
- Verein/Image ohne Prototyp-Testbereich.
- Saisons/Ligen zeigen vollstaendige Fussballtabellen; neue Tabellen starten ohne fiktive Punkte bei 0 Spielen.


Version v81:
- Freies Verschieben von Formationspositionen erkennt nun automatisch die neue Rolle nach Feldbereich, z. B. ST, LA, RA, DM, IV, LV oder RV.
- Die Spielerwahl nach Antippen einer Position erscheint nun weiter oben und sortiert weiterhin zuerst nach Positions-Eignung.


Version v81:
- Freies Verschieben der Formation erkennt jetzt auch LM/RM als eigene Zwischenzone zwischen LV/LA bzw. RV/RA.
- Aussenpositionen werden dadurch realistischer automatisch zugeordnet: hinten LV/RV, dazwischen LM/RM, ganz vorne LA/RA.

Version v86
- KW-Simulation zeigt wieder zuverlässig das Kalenderfenster.
- Beim Klick auf Zur nächsten KW. wird zuerst auf Home gewechselt und dann die sichtbare Tag-für-Tag-Kalendersimulation gestartet.
- Die Kalenderansicht wird auch nach späteren Render-Erweiterungen wieder in die App injiziert.


v86:
- Transfers-Unterpunkte Spielersuche und Leihen repariert.
- Die Reiter rufen wieder die bestehenden Ansichten playerSearchView() und loansView() auf.


v86:
- Das Simulationsprotokoll wurde aus dem Kalenderfenster der Wochensimulation entfernt.
- Die Kalenderanimation zeigt weiter Tag fuer Tag den Ablauf, aber ohne technische Protokollliste.


v86:
- Spielersuche zeigt bei nicht gescouteten Spielern jetzt die Gesamtstärke an.
- Detailwerte wie Talent, Marktwert, Vertrag und einzelne Fähigkeiten bleiben weiterhin bis zum Scouting verborgen.
- Der Stärkefilter greift nun auch bei ungescouteten Spielern, weil die Gesamtstärke bewusst sichtbar ist.


v86:
- Spielersuche: Gesamtstaerke steht nun rechts neben dem Scouten-/Angebotsbutton fett hervor.
- Spielersuche: ungefaehrer Marktwert wird direkt beim Spieler als klare Kostenorientierung angezeigt.
- Nicht gescoutet bleiben weiterhin Talent, Vertrag und Detailwerte.

v88:
- Team/Aufstellung: Unter dem visuellen Spielfeld gibt es nun eine Kaderliste wie in klassischen Manageransichten.
- Die Liste zeigt zuerst Startformation, danach Bankspieler und danach restliche Kaderspieler.
- Spielerwechsel in dieser Ansicht erfolgen per Drag & Drop zwischen Feld, Bank und Kaderliste.
- Klick auf einen Spieler in der Kaderliste öffnet ein eigenes Spielerprofil mit Alter, Positionen, Vertrag, Historie, Marktwert, Fitness, Form und Fähigkeiten.
- Vertragsansicht: Klick auf einen Spieler öffnet ebenfalls dasselbe Spielerprofil.

Version v88
- Kaderliste farblich klar nach Startformation, Bank und restlichem Kader getrennt.
- Spielerprofil-Navigation zur Vertragsansicht repariert, danach bleiben Spielerprofile wieder antippbar.

Version v90
- Team/Aufstellung: Die Kaderliste nutzt nun kurze Statuscodes SF, B und T statt langer Statusnamen.
- Team/Aufstellung: Die Talentsterne bleiben als eigene Tabellenspalte sichtbar.
- Spielerprofil: Der Button Zur Vertragsansicht springt wieder zuverlässig in den Team-Menüpunkt Vertragsansicht.
- Team/Vertragsansicht: Der Reiter funktioniert wieder stabil und Spielerprofile bleiben danach anklickbar.
- Team/Allgemeines: Die Karte Kadergröße öffnet eine vollständige Spielerliste mit Profis und Akademiespielern.
- Team/Allgemeines: In der neuen Liste sind unter anderem Positionen, Stärke, Talent, Vertrag und Marktwert sichtbar.
- Team/Allgemeines: Jugendspieler können in dieser Liste ein- und ausgeblendet werden.
- Team/Allgemeines: Die bisherige Talente-Karte wurde entfernt.


v90:
- Kaderlisten-Spalten unter Team > Aufstellung koennen per langem Druck frei verschoben werden.
- Die Spaltenreihenfolge wird im Spielstand gespeichert.
- Spielerprofil-Buttons Schliessen und Zur Vertragsansicht robust repariert.

Version v92
- Vertragsansicht unter Team wiederhergestellt: Klick auf Vertragsansicht zeigt wieder die eigene Mannschaft mit Vertragslaufzeiten.
- Fehlerquelle durch fehlende Ablösefrei-Liste behoben.
- Spielerprofil-Button „Zur Vertragsansicht“ verlinkt wieder zuverlässig in die Vertragsansicht.
- Ungelesene News werden beim Anklicken sofort als gelesen markiert und die Anzeige wird direkt aktualisiert.


v92:
- Transferliste nach Stärke, Alter, Marktwert und Preis auf-/absteigend sortierbar.
- Vertragsverlaengerungsfenster erscheint wieder oben im Sichtbereich.
