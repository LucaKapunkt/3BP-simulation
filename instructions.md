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
- **Serverless-Hosting** (z. B. **Netlify**, **Vercel**, **GitHub Pages**): Für die statischen Dateien der Anwendung.  

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


## Documentation

## Current file structure
3bp-simulation/
├─ public/
│   └─ index.html
│
├─ src/
│   ├─ App.tsx
│   ├─ main.tsx
│   ├─ ThreeScene.tsx
│   ├─ physics.ts
│   └─ styles.css
│
├─ package.json
├─ tsconfig.json
├─ .gitignore
└─ README.md
