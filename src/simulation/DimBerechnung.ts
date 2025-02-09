/***************************************************************
 * PreciseCalculation.ts
 *
 * Demonstrationscode für eine N-Körper-Gravitations-Simulation 
 * mit realen SI-Einheiten und RK4-Integrationsverfahren.
 *
 * - Längen in Metern [m]
 * - Massen in Kilogramm [kg]
 * - Zeiten in Sekunden [s]
 * - Gravitationskonstante G = 6.67430e-11 [m³ / (kg·s²)]
 *
 * Verwendung:
 *   1) Definiere ein Array von Himmelskörpern (Body[]),
 *      inklusive Position [m], Geschwindigkeit [m/s], Masse [kg].
 *   2) Rufe pro Integrationsschritt:
 *        const newBodies = rk4Step(bodies, dt);
 *      auf, mit dt in Sekunden.
 *   3) newBodies enthält die aktualisierten Positionen und Geschwindigkeiten.
 *
 ***************************************************************/

import { G } from "./units";

///////////////////////////////////////////////////////////////
// 1) Typdefinitionen
///////////////////////////////////////////////////////////////

/**
 * Einfacher 3D-Vektor in TypeScript.
 */
export interface Vector3D {
    x: number;
    y: number;
    z: number;
  }

  // Hilfsfunktion zum Erstellen eines Vector3D-Objekts
  export function createVector3D(x: number, y: number, z: number): Vector3D {
    return { x, y, z };
  }
  
  export interface CelestialBodyData {
    position: Vector3D;
    velocity: Vector3D;
    currentMass: number;
  }


  // Hilfsfunktion zum Erstellen eines CelestialBodyData-Objekts
  export function createCelestialBody(
    position: Vector3D,
    velocity: Vector3D,
    currentMass: number
  ): CelestialBodyData {
    return { position, velocity, currentMass };
  }


  
 
  interface Derivative {
    dPos: Vector3D[];
    dVel: Vector3D[];
  }
  

  ///////////////////////////////////////////////////////////////
  // 2) Globale Konstanten
  ///////////////////////////////////////////////////////////////
  
  /**
   * Gravitationskonstante in SI-Einheiten:
   * [m^3 / (kg s^2)]
   */
  
  
  ///////////////////////////////////////////////////////////////
  // 3) Hilfsfunktionen
  ///////////////////////////////////////////////////////////////
  
  /**
   * Vektor-Differenz: (a - b)
   */
  function sub(a: Vector3D, b: Vector3D): Vector3D {
    return {
      x: a.x - b.x,

      y: a.y - b.y,
      z: a.z - b.z,
    };
  }
  
  /**
   * Vektor-Summe: (a + b)
   */
  function add(a: Vector3D, b: Vector3D): Vector3D {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
      z: a.z + b.z,
    };
  }

  
  /**
   * Vektor-Skalierung: (a * scalar)
   */
  function scale(a: Vector3D, scalar: number): Vector3D {
    return {
      x: a.x * scalar,
      y: a.y * scalar,
      z: a.z * scalar,
    };
  }
  
  /**
   * Betrag (Länge) eines Vektors
   */
  function length(v: Vector3D): number {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  
  ///////////////////////////////////////////////////////////////
  // 4) Berechnung der Beschleunigungen (Newtonsche Gravitation)
  ///////////////////////////////////////////////////////////////
  
  /**
   * Berechnet für jedes Body-Objekt die Beschleunigung a = F/m
   * infolge der Gravitationswirkung aller anderen Körper.
   *
   * bodies[i].mass: Masse in [kg]
   * bodies[i].position: Position in [m]
   * 
   * Rückgabewert: Array "accelerations" der Länge N
   *   accelerations[i] = [ax, ay, az] in [m/s^2]
   */
  function computeAccelerations(bodies: CelestialBodyData[]): Vector3D[] {
    const N = bodies.length;

    const accelerations: Vector3D[] = new Array(N).fill(null).map(() => ({ x: 0, y: 0, z: 0 }));
  

    for (let i = 0; i < N; i++) {
      // Summe über Kräfte von allen j != i
      let ax = 0;
      let ay = 0;
      let az = 0;
  
      for (let j = 0; j < N; j++) {
        if (i === j) continue;
  
        // Richtungsvektor von i -> j
        const rVec = sub(bodies[j].position, bodies[i].position);
        const dist = length(rVec);
        if (dist === 0) {
          // Vermeide Division durch 0 (oder handle Kollisionen etc.)
          continue;
        }
  
        // Gravitationsbeschleunigung:
        //   a_i = G * m_j / r^2 in Richtung (rVec).
        //   Richtig vektorwertig: a_i += G*m_j*(r_j - r_i)/|r_ij|^3
        const factor = (G * bodies[j].currentMass) / (dist * dist * dist);
        ax += factor * rVec.x;
        ay += factor * rVec.y;
        az += factor * rVec.z;

      }
  
      accelerations[i] = { x: ax, y: ay, z: az };
    }
  
    return accelerations;
  }
  
  ///////////////////////////////////////////////////////////////
  // 5) Funktion zur Ableitung (d/dt) der Zustände (RK4-Helfer)
  ///////////////////////////////////////////////////////////////
  
  /**
   * Gibt die Zeitableitung (dPos, dVel) für alle Bodies zurück:
   *  - dPos = velocity
   *  - dVel = acceleration (aus computeAccelerations)
   */
  function calcDerivative(bodies: CelestialBodyData[]): Derivative {
    const N = bodies.length;
    const dPos: Vector3D[] = new Array(N);
    const dVel: Vector3D[] = computeAccelerations(bodies);
  

    for (let i = 0; i < N; i++) {
      dPos[i] = { ...bodies[i].velocity }; // dPos/dt = velocity
    }
  
    return { dPos, dVel };
  }
  
  /**
   * Erzeugt eine Kopie der Bodies, bei der Position und Geschwindigkeit 
   * um (k * dt) hinzugefügt wurden.
   *
   *  "bodiesK" = bodies + k*dt
   */
  function bodiesPlusDelta(bodies: CelestialBodyData[], d: Derivative, dt: number, scaleFactor: number): CelestialBodyData[] {
    const N = bodies.length;
    const result: CelestialBodyData[] = new Array(N);
  

    for (let i = 0; i < N; i++) {
      // Position + dPos * scaleFactor * dt
      const newPos = add(
        bodies[i].position,
        scale(d.dPos[i], scaleFactor * dt)
      );
  
      // Velocity + dVel * scaleFactor * dt
      const newVel = add(
        bodies[i].velocity,
        scale(d.dVel[i], scaleFactor * dt)
      );
  
      result[i] = {
        currentMass: bodies[i].currentMass,
        position: newPos,
        velocity: newVel,
      };

    }
  
    return result;
  }
  
  ///////////////////////////////////////////////////////////////
  // 6) Der zentrale RK4-Schritt
  ///////////////////////////////////////////////////////////////
  
  /**
   * Führt EINEN RK4-Schritt (4. Ordnung Runge-Kutta) mit Zeitschritt dt aus.
   *
   * @param bodies Array an Body-Objekten vor dem Schritt.
   * @param dt Zeitschritt in Sekunden.
   * @returns Array an Body-Objekten nach dem Schritt.
   */
  export function rk4Step(bodies: CelestialBodyData[], dt: number): CelestialBodyData[] {
    // 1) k1 = f(t, y)
    const k1 = calcDerivative(bodies);
  
    // 2) k2 = f(t + dt/2, y + k1*dt/2)
    const bodies2 = bodiesPlusDelta(bodies, k1, dt, 0.5);
    const k2 = calcDerivative(bodies2);
  
    // 3) k3 = f(t + dt/2, y + k2*dt/2)
    const bodies3 = bodiesPlusDelta(bodies, k2, dt, 0.5);
    const k3 = calcDerivative(bodies3);
  
    // 4) k4 = f(t + dt, y + k3*dt)
    const bodies4 = bodiesPlusDelta(bodies, k3, dt, 1.0);
    const k4 = calcDerivative(bodies4);
  
    // Endzustand y(t+dt) = y(t) + dt/6 * (k1 + 2*k2 + 2*k3 + k4)
    const N = bodies.length;
    const newBodies: CelestialBodyData[] = new Array(N);
  
    for (let i = 0; i < N; i++) {
      // Position
      const posTerm = add(
        k1.dPos[i],
        add(scale(k2.dPos[i], 2), add(scale(k3.dPos[i], 2), k4.dPos[i]))
      );
      // Geschwindigkeits-Term
      const velTerm = add(
        k1.dVel[i],
        add(scale(k2.dVel[i], 2), add(scale(k3.dVel[i], 2), k4.dVel[i]))
      );
  
      const newPosition = add(
        bodies[i].position,
        scale(posTerm, dt / 6)
      );
  
      const newVelocity = add(
        bodies[i].velocity,
        scale(velTerm, dt / 6)
      );
  
      newBodies[i] = {
        currentMass: bodies[i].currentMass,
        position: newPosition,
        velocity: newVelocity,
      };

    }
  
    return newBodies;
  }
  
  ///////////////////////////////////////////////////////////////
  // 7) Beispiel-Nutzung (optional)
  ///////////////////////////////////////////////////////////////
  
  /**
   * Kurzes Beispiel, wie man es nutzen würde:
   */
  // function exampleUsage() {
  //   // Erde-Sonne-System, stark vereinfacht:
  //   // Sonne: ~1.989e30 kg, Erde: ~5.972e24 kg
  //   // Abstand ~1 AU = 1.496e11 m
  //   // Erdgeschwindigkeit ~29.78e3 m/s (um Sonne)
  //   const bodies: Body[] = [
  //     {
  //       name: "Sonne",
  //       mass: 1.989e30,
  //       position: { x: 0, y: 0, z: 0 },
  //       velocity: { x: 0, y: 0, z: 0 },
  //     },
  //     {
  //       name: "Erde",
  //       mass: 5.972e24,
  //       position: { x: 1.496e11, y: 0, z: 0 },
  //       velocity: { x: 0, y: 29780, z: 0 },
  //     }
  //   ];
  
  //   // Zeitschritt: z.B. 3600s = 1 Stunde
  //   let dt = 3600;
  
  //   // Starte Simulation
  //   for (let step = 0; step < 1000; step++) {
  //     // einmal RK4
  //     const newBodies = rk4Step(bodies, dt);
  //     // bodies updaten
  //     for (let i = 0; i < bodies.length; i++) {
  //       bodies[i] = newBodies[i];
  //     }
  //     // z.B. Positionen ausgeben
  //     console.log(`Step ${step}: Erde bei `, bodies[1].position);
  //   }
  // }
  
  // exampleUsage();
  