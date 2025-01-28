# Project Overview

## Zusammenfassung
Diese Webanwendung simuliert das **Drei-Körper-Problem** im **dreidimensionalen Raum** und bietet den Nutzern eine interaktive Oberfläche, um die Bewegung der drei Körper anhand individuell eingestellter Anfangsbedingungen zu betrachten. Nutzer können **Positionen**, **Geschwindigkeiten** und **Massen** jedes Körpers anpassen und eine **Animation** starten, die ihre resultierenden Bahnen zeigt. Zusätzlich lassen sich **Animationsgeschwindigkeit** und **Kamerafokus** konfigurieren. Damit wird sowohl ein lehrreicher als auch unterhaltsamer Einblick in ein komplexes physikalisches Phänomen ermöglicht.  

## Haupt-Features im Überblick
- **3D-Simulation**: Darstellung der drei Körper, die sich gegenseitig beeinflussen, basierend auf den Gravitationsgesetzen.  
- **Individuelle Anfangsparameter**: Eingabe und Veränderung von Positionen, Geschwindigkeiten und Massen jedes Körpers.  
- **Animationssteuerung**: Start, Pause, Schritt-für-Schritt-Mode, Anpassung der Animationsgeschwindigkeit.  
- **Kamerafokus**: Verschiedene Modi zur Auswahl (Fokus auf Körper 1, 2, 3, Gravitationszentrum, freibeweglicher Orbit).  
- **Bahnenanzeige**: Optionale Darstellung der zurückgelegten Pfade der Himmelskörper.  
- **Kollisionserkennung**: Echtzeit-Kollisionserkennung und Darstellung der Kollisionen.  
- **Voreinstellungen**: Schnellstart-Szenarien mit realen Himmelskörpern (z. B. Erde, Mond, Sonne) als Beispiel-Setups.  

## Key flow

### 1. Einstieg & Übersicht
1. **Zugriff auf die Webseite**  
   - Der/die Nutzer:in öffnet die Seite über den Browser.  
   - Eine kurze Erklärung oder Willkommensnachricht zeigt die wichtigsten Funktionen der Simulation (Hinweise auf Parameter-Eingabe, Start/Pause, Kameraeinstellungen, etc.).  

2. **Startbildschirm / Hauptmenü**  
   - Option zur Wahl eines vordefinierten Szenarios (z. B. "Erde-Mond-Sonne") oder einer benutzerdefinierten Simulation.  
   - Möglichkeit, bereits gespeicherte Konfigurationen (sofern implementiert) zu laden.

### 2. Parameter-Eingabe
1. **Benutzerdefinierte Einstellungen**  
   - Eingabefelder für **Position**, **Geschwindigkeit** und **Masse** jedes Körpers.  
   - Konfigurationsoption für die **Animationsgeschwindigkeit** (z. B. Zeitraffer oder Zeitlupe).  

2. **Voreinstellungen laden**  
   - Wählt der/die Nutzer:in eine vordefinierte Konfiguration (z. B. reale Himmelskörper), werden automatisch Werte für Position, Masse, etc. übernommen.  

### 3. Simulation starten & steuern
1. **Simulation starten**  
   - Durch einen Klick auf „Start“ (oder „Play“) beginnt die Echtzeitberechnung der Trajektorien der drei Körper.  

2. **Animationskontrolle**  
   - **Pause/Resume**: Ein Klick auf „Pause“ hält die Simulation an; erneutes Klicken startet sie wieder.  
   - **Vor-/Zurückschritt (optional)**: Ermöglicht, einzelne Zeitschritte durchzugehen.  
   - **Änderungen während der Simulation**: Optional, falls während laufender Simulation neue Werte hinzugefügt werden können.  

3. **Kamerafokus**  
   - Auswahloption: **Körper 1**, **Körper 2**, **Körper 3**, **Gravitationszentrum** oder **freibeweglicher Orbit**.  
   - Kamera bewegt sich automatisch, um den gewählten Fokuspunkt im Zentrum zu halten.

4. **Bahnenanzeige**  
   - Optionales Aktivieren/Deaktivieren von Linien, die den zurückgelegten Weg der Körper veranschaulichen.

### 4. Interaktive Anpassung & Szenario-Wechsel
1. **Änderung von Parametern**  
   - Nach einem „Reset“ oder in einem Pausenmodus kann der/die Nutzer:in die Anfangsbedingungen erneut anpassen.  
   - Optional: **On-the-fly**-Anpassung, falls es die Architektur unterstützt (z. B. sofortige Änderung der Masse).  

2. **Animationsgeschwindigkeit anpassen**  
   - Slider oder Buttons zur Änderung der Simulationsgeschwindigkeit (z. B. „Zeitraffer x2“, „Verlangsamung x0.5“).  

3. **Szenarien wechseln**  
   - Rückkehr zum Hauptmenü oder direkter Wechsel zu einem neuen voreingestellten Szenario.  

### 5. Optional: Speichern 
1. **Konfiguration speichern**  
   - Möglichkeit, benutzerdefinierte Startparameter als Datei oder in einem Nutzerkonto abzulegen.  

### 6. Abschluss & Auswertung
1. **Ergebnis**  
   - Die Simulation endet, wenn die Körper außerhalb eines festgelegten Bereichs driften oder wenn ein definiertes Zeitlimit erreicht ist (optional).  
   - Der/die Nutzer:in kann sich die Endpositionen anzeigen lassen oder direkt eine neue Simulation starten.  


## Tech Stack

### Frontend

1. **React (TypeScript)**  
   - Weit verbreitetes JavaScript-Framework mit einer großen Community.  
   - Bietet effiziente Komponenten-Struktur und ein stabiles Ökosystem (z. B. React Router, Redux/MobX für State-Management, etc.).  
   - TypeScript erleichtert die Wartung und Weiterentwicklung durch klar definierte Typen.

2. **Three.js**  
   - Leistungsstarke WebGL-Bibliothek, um 3D-Inhalte im Browser darzustellen.  
   - Umfangreiche Dokumentation und zahlreiche Beispiele für 3D-Simulationen.  
   - Gute Integration mit React (z. B. via React Three Fiber), wodurch Komponenten-basierte 3D-Szenen möglich sind.

3. **Physik & Numerik**  
   - Implementierung eines einfachen numerischen Integrationsverfahrens (z. B. Runge-Kutta) in TypeScript.  
   - Optional: Auslagerung rechenintensiver Aufgaben in **Web Worker**, um die Haupt-UI vor Blockaden zu schützen.  
   - Bei Bedarf können externe mathematische Libraries wie **math.js** eingebunden werden, wenn komplexere Rechenfunktionen nötig sind.

4. **State Management**  
   - In kleineren Projekten oft ausreichend: **React Context API** oder eigene Hooks.  
   - Für komplexere Szenarien können Libraries wie **Redux** oder **Zustand** eingesetzt werden, um die Einstellungen (Positionen, Massen, Geschwindigkeiten etc.) zu verwalten.

### (Optionales) Backend

Da die Anwendung rein zu Demonstrationszwecken dient und keine tiefgreifenden wissenschaftlichen Funktionen erfordert, ist ein **Backend aktuell nicht zwingend notwendig**.  

### Zusammenfassung

- **React (TypeScript)** + **Three.js** bilden das Herzstück für die **3D-Simulation** im Browser.  
- **Numerische Berechnungen** laufen direkt im Frontend, ggf. mithilfe eines **Web Workers**, um Performance-Probleme zu vermeiden.  
- **Kein separater Server** ist nötig, was zu einer sehr leichten und kostengünstigen Bereitstellung führt.  


## Core Functionalities

### 1. Simulation der Drei-Körper-Bewegung
- **3D-Anzeige** von drei Körpern (inkl. Positions- und Geschwindigkeitsvektoren), die sich gemäß physikalischer Gravitation gegenseitig beeinflussen.  
- **Numerische Integration** (z. B. via Runge-Kutta) für kontinuierliche und stabile Bahnberechnung.  
- **Anpassbare Zeitsteuergeschwindigkeit**: User können die Simulationsgeschwindigkeit in Echtzeit erhöhen, verlangsamen oder pausieren.

### 2. Nutzerdefinierte Anfangsparameter
- **Eingabe** von Position, Geschwindigkeit und Masse für jeden Körper.  
- **Voreinstellungen laden** (z. B. Erde-Mond-Sonne), um schnell typische Szenarien zu starten.  
- **On-the-fly-Anpassung** von Einstellungen (im Pause-Modus oder via Reset) mit sofortiger Auswirkung auf die Simulation.

### 3. Interaktive Steuerung & Kameraoptionen
- **Kamerafokus** wählbar: Körper 1, Körper 2, Körper 3, Gravitationszentrum oder frei bewegliche Kamera.  
- **Zoom- und Schwenkfunktionen**: User können die Ansicht individuell anpassen (Rotation, Nah-/Fernansicht).  
- **Aktivierung/Deaktivierung von Bahnen**: Visualisierung der zurückgelegten Pfade der Himmelskörper mit einem Klick.

### 4. Benutzeroberfläche & Bedienkomfort
- **Intuitive UI** zur Eingabe aller Parameter über Slider, Eingabefelder oder Dropdowns.  
- **Start/Pause/Reset-Buttons** für eine schnelle Steuerung der Simulation.  
- **Tooltips und Hilfetexte**: Erläuterung zentraler Funktionen und physikalischer Grundbegriffe.

### 5. Performance und Skalierbarkeit
- **Effizientes Rendering** per Three.js/WebGL, um auch bei komplexen Szenarien flüssige Animationen zu ermöglichen.  
- **Einsatz von Web Workern** (optional), damit rechenintensive Prozesse die Benutzeroberfläche nicht blockieren.  
- **Responsives Design**: Anpassung der UI an verschiedene Bildschirmgrößen (Desktops, Laptops, Tablets, etc.).


## Projektablauf

### 1. Grobe Übersicht:

1. **Projekt-Setup und Grundgerüst**  
   - Projekt initialisieren (z. B. mit Vite + React + TypeScript).  
   - Grundlegende Dateistruktur erstellen (siehe PRD-Empfehlung).  

2. **3D-Szene aufsetzen**  
   - Canvas-Szene einrichten (Three.js oder React-Three-Fiber).  
   - Erste Testobjekte rendern (z. B. drei simple Kugeln).  

3. **Physik & Numerische Integration**  
   - Die Kernlogik (z. B. Runge-Kutta) für die Berechnung der Drei-Körper-Bewegungen implementieren.  
   - Schnittstelle zum 3D-Rendering definieren (Positionsupdates).  

4. **Benutzeroberfläche & Parameter-Eingaben**  
   - UI-Elemente erstellen: Eingabefelder/Slider für Position, Geschwindigkeit, Masse.  
   - Buttons für Start, Pause, Reset, etc. einbauen.  

5. **Kamerafunktionen & Bahnenanzeige**  
   - Verschiedene Kamerafokus-Modi implementieren.  
   - Optional: Pfadlinien (Orbits) ein- und ausblenden.  

6. **Fehlermanagement & Kollisionserkennung**  
   - Kollisionsabstand definieren und Logik für Kollisionswarnungen.  
   - Validierung der Eingabeparameter (z. B. ungültige Zahlenwerte).  

7. **Optimierung & Feinschliff**  
   - Performance-Tuning (z. B. Web Worker, FPS-Limits, etc.).  
   - UI-Styling, responsives Design, Tooltips.  

8. **Deployment & Dokumentation**  
   - Finales Testing auf verschiedenen Browsern.  
   - Deployment (z. B. auf GitHub Pages, Netlify, o. Ä.).  
   - README/PRD aktualisieren und finalisieren.  

---

### 2. Detaillierte Umsetzungsschritte:

#### **2.1 Projekt-Setup und Grundgerüst**

**Hauptaspekte:**
- **Initialisierung**:  
  - Starte ein neues Projekt mit Vite oder Create React App (falls gewünscht).  
  - Wähle TypeScript als Sprache.  
- **Ordnerstruktur**:  
  - Lege die Minimalstruktur gemäß PRD an (z. B. `src/main.tsx`, `src/App.tsx`, `src/simulation.ts`, etc.).  
- **Basis-Konfiguration**:  
  - Richte `tsconfig.json` (TypeScript-Einstellungen) ein.  
  - Passe `vite.config.ts` an, falls Custom-Build-Einstellungen erforderlich sind.  

**Ziel**: Eine lauffähige, leere React-Anwendung, die im Browser unter `localhost:3000` (oder Standard-Port) erreichbar ist.

---

#### **2.2 3D-Szene aufsetzen**

**Hauptaspekte:**
1. **Three.js oder React Three Fiber**  
   - Entscheide dich für eine Implementierung in reinem Three.js oder nutze React Three Fiber.  
   - Erstelle eine einfache `<Canvas>`-Komponente (bei React Three Fiber) oder initialisiere eine Three.js-Renderer-Instanz in `App.tsx`.  
2. **Erste Testobjekte**  
   - Implementiere drei einfache Kugeln (Sphären) als Platzhalter-Körper.  
   - Positioniere sie an unterschiedlichen Startkoordinaten.  
3. **Licht & Hintergrund**  
   - Füge ggf. ein einfaches Licht (DirectionalLight) hinzu, um 3D-Objekte sichtbar zu machen.  
   - Setze eine Hintergrundfarbe oder ein passendes Environment (optional).

**Ziel**: Drei sichtbare Kugeln in einer 3D-Szene, die als Platzhalter für die Himmelskörper dienen.

---

#### **2.3 Physik & Numerische Integration**

**Hauptaspekte:**
1. **Grundlegendes Physik-Modul** (`berechnung.ts`)  
   - Erstelle Datenstrukturen für jedes Objekt (z. B. Masse, Position, Geschwindigkeit, Beschleunigung).  
   - Implementiere eine Funktion zur Berechnung der Gravitationskraft zwischen zwei Körpern (Newtonsche Gravitationsformel).  
2. **Numerische Verfahren**  
   - Entscheide dich für ein Integrationsverfahren: Euler, Verlet oder Runge-Kutta (RK4).  
   - Schreibe eine Funktion, die pro Zeitschritt die neuen Positionen und Geschwindigkeiten aller Körper berechnet.  
3. **Abgleich mit Renderer**  
   - Stelle eine Funktion bereit, die vom Renderer (z. B. in jedem Frame) aufgerufen wird, um die aktualisierten Positionen zurückzuliefern.  
   - Achte auf definierte Zeitschrittgröße (`deltaT`), damit die Simulation stabil bleibt.  

**Ziel**: Eine lauffähige Berechnungsroutine, die im zeitlichen Verlauf Positionsupdates liefert, sodass sich die Kugeln gemäß der Gravitation bewegen.

---

#### **2.4 Benutzeroberfläche & Parameter-Eingaben**

**Hauptaspekte:**
1. **UI-Elemente**  
   - Baue im `App.tsx` oder in separaten Komponenten Eingabefelder/Slider für:  
     - Position (x, y, z)  
     - Geschwindigkeit (vx, vy, vz)  
     - Masse  
   - Binde pro Körper (Körper 1, 2, 3) jeweils diese Eingabeelemente ein.  
2. **Buttons**  
   - **Start**: Simulation initialisieren und laufen lassen.  
   - **Pause/Resume**: Läuft die Simulation, kann sie pausiert werden, erneut klicken führt fort.  
   - **Reset**: Setzt die Körper auf die ursprünglichen oder neue Startwerte zurück.  
3. **Datentransfer**  
   - Wenn Nutzer:innen Parameter ändern, speichere sie in einem State (z. B. `React.useState` oder Redux/Context).  
   - Beim „Start“ oder „Reset“ werden diese Werte an das Physikmodul (z. B. `simulation.ts`) übergeben.  

**Ziel**: Nutzer:innen können in der UI die Körperdaten anpassen, die App liest diese Werte aus und nutzt sie, um die Simulation zu steuern.

---

#### **2.5 Kamerafunktionen & Bahnenanzeige**

**Hauptaspekte:**
1. **Kamerafokus**  
   - Implementiere verschiedene Modi (z. B. Drop-down-Auswahl):  
     - **Körper 1**: Kamera zentriert/folgt Körper 1.  
     - **Körper 2**  
     - **Körper 3**  
     - **Gravitationszentrum**: Berechne den Schwerpunkt, fokussiere Kamera darauf.  
     - **Frei**: Nutzer kann per Maus/Tastatur im Raum navigieren (Orbit Controls, etc.).  
2. **Bahnenanzeige**  
   - Option: Ein/Aus-Schalter („Orbit lines“).  
   - Speicherung der jeweiligen Körper-Positionen in einem Array oder Buffer.  
   - Zeichne mit Three.js-Linienobjekten (LineSegments) oder React Three Fiber `<line>` das Pfadstück nach.  

**Ziel**: Eine flexible Kamera, die den jeweils ausgewählten Fokus hält, und optional die sichtbaren Bahnen aller Körper.

---

#### **2.6 Fehlermanagement & Kollisionserkennung**

**Hauptaspekte:**
1. **Kollisionsabstand**  
   - Definiere eine minimal akzeptierte Distanz, ab der eine Kollision gemeldet wird (z. B. Summe der Kugelradien oder ein willkürlicher Wert).  
2. **Kollisionswarnung**  
   - Sobald zwei Körper kollidieren, kann die Simulation pausieren oder eine optische Warnung (z. B. rotes Aufleuchten) anzeigen.  
3. **Eingabevalidierung**  
   - Achte auf gültige Eingaben (keine negativen Massen, keine zu großen/kleinen Werte, etc.).  
   - Zeige ggf. eine Fehlermeldung im UI bei ungültigen Parametern.  

**Ziel**: Prävention von physikalisch unmöglichen Szenarien und eine saubere Handhabung, falls Körper zusammenstoßen.

---

#### **2.7 Optimierung & Feinschliff**

**Hauptaspekte:**
1. **Performance**  
   - Falls die Berechnungen zu umfangreich werden, ausgelagerte Physik in einen Web Worker.  
   - Zeitaufwändige Berechnungen nicht auf der Haupt-UI-Thread ausführen.  
2. **UI/UX-Verbesserungen**  
   - Stilvolles, responsives Layout (CSS Media Queries, oder ein UI-Framework).  
   - Tooltips/Hilfetexte für physikalische Erläuterungen.  
3. **Fehlerkontrollen & Debugging**  
   - Teste verschiedene Startwerte, hohe und niedrige Massen, große Abstände, etc.  
   - Checke, ob die Simulation stabil bleibt.  

**Ziel**: Ein ansprechendes, flüssiges Nutzererlebnis ohne störende Ruckler oder unsinnige Simulationsergebnisse.

---

#### **2.8 Deployment & Dokumentation**

**Hauptaspekte:**
1. **Finales Testing**  
   - Prüfung in modernen Browsern (Chrome, Firefox, Safari, Edge).  
   - Mobile/Tablet-Ansicht, falls gewünscht.  
2. **Deployment**  
   - Einfache statische Bereitstellung (z. B. über GitHub Pages, Netlify oder Vercel).  
   - Prüfen, ob alle Ressourcen korrekt geladen werden (3D-Objekte, Bilder, etc.).  
3. **Dokumentation**  
   - Aktualisiertes README.md:  
     - Installationsanleitung (npm install, npm run dev)  
     - Kurzanleitung zur Nutzung  
   - Eventuelles Hinzufügen letzter Features/Änderungen ins PRD.  

**Ziel**: Das fertige Projekt steht öffentlich zur Verfügung und ist ausreichend dokumentiert.

---

### **3. Zusammenfassung**

Mit diesem Arbeitsablauf können alle Beteiligten den Entwicklungsprozess schrittweise umsetzen:

1. **Setup** der Grundstrukturen  
2. **3D-Szene** einrichten und erste Visualisierung  
3. **Physik**-Modul erstellen und mit dem Renderer verbinden  
4. **UI** für Parametersteuerung und Start/Pause/Reset  
5. **Kamera und Bahnen** implementieren  
6. **Kollision & Fehlermanagement** erweitern  
7. **Optimieren** und Feinschliff (Performance & UX)  
8. **Testen & Deployen** für Endnutzer



## Current file structure
3bp-simulation/
├─ public/
│   └─ vite.svg
│
├─ src/
│   ├─ assets/
│   │    └─ vite.svg
│   ├─ App.css
│   ├─ App.tsx  
│   ├─ berechnung.ts
│   ├─ index.css
│   ├─ main.tsx
│   └─ vite-env.d.ts
│
├─ package-lock.json
├─ package.json
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
