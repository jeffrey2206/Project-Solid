import type { Vehicle } from '../vehicle.interface';

/** Vehículo Audi de la flota de la Reserva Ecológica. */
export class Audi implements Vehicle {
  constructor(public readonly model: string) {}

  getDetails(): string {
    return `Audi ${this.model} — Tracción Quattro activada. Listo para los senderos de la reserva.`;
  }
}
