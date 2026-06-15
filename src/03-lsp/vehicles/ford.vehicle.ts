import type { Vehicle } from '../vehicle.interface';

/** Vehículo Ford de la flota de la Reserva Ecológica. */
export class Ford implements Vehicle {
  constructor(public readonly model: string) {}

  getDetails(): string {
    return `Ford ${this.model} — Built Tough. Resistencia para los caminos más difíciles de la reserva.`;
  }
}
