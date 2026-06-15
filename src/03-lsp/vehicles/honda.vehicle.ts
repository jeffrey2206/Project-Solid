import type { Vehicle } from '../vehicle.interface';

/** Vehículo Honda de la flota de la Reserva Ecológica. */
export class Honda implements Vehicle {
  constructor(public readonly model: string) {}

  getDetails(): string {
    return `Honda ${this.model} — Motor VTEC activado. Potencia y control en la selva.`;
  }
}
