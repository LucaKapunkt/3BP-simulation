/**
 * Kernmodul für die physikalische Simulation des Dreikörperproblems
 * 
 * Diese Datei enthält die gesamte Berechnungslogik für die Simulation, einschließlich:
 * - Typdefinitionen für Vektoren und Himmelskörper
 * - Berechnung der Gravitationskräfte zwischen den Körpern
 * - Numerische Integration der Bewegungsgleichungen
 * - Hilfsfunktionen zur Erstellung von Körpern und Vektoren
 * 
 * Die Simulation verwendet einen vereinfachten Runge-Kutta-Ansatz für die numerische Integration.
 */

export interface Vector3D {
    x: number;
    y: number;
    z: number;
  }
  
  export interface CelestialBodyData {
    position: Vector3D;
    velocity: Vector3D;
    mass: number;
  }
  
  interface SimulationParameters {
    bodies: CelestialBodyData[];
    timeStep: number;
  }
  
  interface SimulationStepResult {
    positions: Vector3D[];
    velocities: Vector3D[];
  }
  
  /**
   * Berechnet die Gravitationsbeschleunigung für einen Körper
   * @param bodyIndex - Index des Zielkörpers
   * @param bodies - Array aller Himmelskörper
   * @returns Beschleunigungsvektor
   */
  function calculateAcceleration(
    bodyIndex: number,
    bodies: CelestialBodyData[]
  ): Vector3D {
    //console.log('calculateAcceleration aufgerufen für Körper:', bodyIndex);
    

    const targetBody = bodies[bodyIndex];
    let ax = 0;
    let ay = 0;
    let az = 0;
  
    for (let i = 0; i < bodies.length; i++) {
      if (i === bodyIndex) continue;
  
      const sourceBody = bodies[i];
      const dx = sourceBody.position.x - targetBody.position.x;
      const dy = sourceBody.position.y - targetBody.position.y;
      const dz = sourceBody.position.z - targetBody.position.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  
      if (distance === 0) continue;
  
      const force = (sourceBody.mass / Math.pow(distance, 3));
      ax += force * dx;
      ay += force * dy;
      az += force * dz;
    }
  
    const result = { x: ax, y: ay, z: az };
    //console.log('calculateAcceleration Ergebnis:', result);
    return result;

  }
  
  /**
   * Berechnet einen einzelnen Zeitschritt der Simulation
   * @param params - Die Simulationsparameter
   * @returns Die neuen Positionen und Geschwindigkeiten der Körper
   */
  export function calculateNextStep(params: SimulationParameters): SimulationStepResult {
    //console.log('calculateNextStep aufgerufen mit:', params);
    
    const newBodies = params.bodies.map((body, index) => {
      // Beschleunigungen berechnen
      const acceleration = calculateAcceleration(index, params.bodies);
  
      // Neue Position und Geschwindigkeit mit Runge-Kutta-Ansatz
      const newPosition: Vector3D = {
        x: body.position.x + body.velocity.x * params.timeStep + 0.5 * acceleration.x * params.timeStep * params.timeStep,
        y: body.position.y + body.velocity.y * params.timeStep + 0.5 * acceleration.y * params.timeStep * params.timeStep,
        z: body.position.z + body.velocity.z * params.timeStep + 0.5 * acceleration.z * params.timeStep * params.timeStep
      };
  
      const newVelocity: Vector3D = {
        x: body.velocity.x + acceleration.x * params.timeStep,
        y: body.velocity.y + acceleration.y * params.timeStep,
        z: body.velocity.z + acceleration.z * params.timeStep
      };
  
      return {
        mass: body.mass,
        position: newPosition,
        velocity: newVelocity
      };
    });
  
    const result: SimulationStepResult = {
      positions: newBodies.map(body => body.position),
      velocities: newBodies.map(body => body.velocity)
    };
  
    //console.log('calculateNextStep beendet mit Ergebnissen:', result);
    return result;
  }
  
  // Hilfsfunktion zum Erstellen eines Vector3D-Objekts
  export function createVector3D(x: number, y: number, z: number): Vector3D {
    return { x, y, z };
  }
  
  // Hilfsfunktion zum Erstellen eines CelestialBodyData-Objekts
  export function createCelestialBody(
    position: Vector3D,
    velocity: Vector3D,
    mass: number
  ): CelestialBodyData {
    return { position, velocity, mass };
  }
  