import type { Vehicle } from '../vehicle.interface';

/** Vehículo Toyota de la flota de la Reserva Ecológica. */
export class Toyota implements Vehicle {
  constructor(public readonly model: string) {}

  getDetails(): string {
    return `Toyota ${this.model} — Motor híbrido listo. Eficiencia máxima en el recorrido ecológico.`;
  }
}
