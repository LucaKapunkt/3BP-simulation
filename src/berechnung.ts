// Typ-Definitionen für die 3D-Vektoren
interface Vector3D {
    x: number;
    y: number;
    z: number;
}

// Typ-Definition für einen Himmelskörper
interface CelestialBodyData {
    position: Vector3D;
    velocity: Vector3D;
    mass: number;
}

// Typ-Definition für die Simulationsparameter
interface SimulationParameters {
    bodies: CelestialBodyData[];
    timeStep: number;
    totalTime: number;
}

// Typ-Definition für die Simulationsergebnisse
interface SimulationResults {
    positions: Vector3D[][];  // Array von Positionen für jeden Zeitschritt
    velocities: Vector3D[][]; // Array von Geschwindigkeiten für jeden Zeitschritt
    timeSteps: number[];     // Array der Zeitpunkte
}

/**
 * Berechnet die Bewegung der Himmelskörper
 * @param params - Die Simulationsparameter
 * @returns Die berechneten Positionen und Geschwindigkeiten für jeden Zeitschritt
 */
export function calculateMotion(params: SimulationParameters): SimulationResults {
    console.log('calculateMotion aufgerufen mit:', params);

    // Initialisierung der Ergebnisarrays
    const positions: Vector3D[][] = [];
    const velocities: Vector3D[][] = [];
    const timeSteps: number[] = [];

    // Anzahl der Zeitschritte berechnen
    const numberOfSteps = Math.floor(params.totalTime / params.timeStep);

    // Beispielhafte Berechnung (wird später durch echte Physik ersetzt)
    for (let step = 0; step < numberOfSteps; step++) {
        const currentTime = step * params.timeStep;
        const currentPositions: Vector3D[] = [];
        const currentVelocities: Vector3D[] = [];

        // Für jeden Körper eine einfache lineare Bewegung berechnen
        params.bodies.forEach((body, index) => {
            // Beispielhafte lineare Bewegung (wird später ersetzt)
            currentPositions.push({
                x: body.position.x + body.velocity.x * currentTime,
                y: body.position.y + body.velocity.y * currentTime,
                z: body.position.z + body.velocity.z * currentTime
            });

            // Geschwindigkeiten bleiben konstant in diesem Beispiel
            currentVelocities.push({ ...body.velocity });
        });

        positions.push(currentPositions);
        velocities.push(currentVelocities);
        timeSteps.push(currentTime);
    }

    const results: SimulationResults = {
        positions,
        velocities,
        timeSteps
    };

    console.log('calculateMotion beendet mit Ergebnissen:', results);
    return results;
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
