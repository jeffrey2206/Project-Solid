import type { Vehicle } from '../vehicle.interface';

/** Vehículo eléctrico Tesla de la flota de la Reserva Ecológica. */
export class Tesla implements Vehicle {
  constructor(public readonly model: string) {}

  getDetails(): string {
    return `Tesla ${this.model} — Carga eléctrica al 100%. Cero emisiones en la reserva.`;
  }
}
