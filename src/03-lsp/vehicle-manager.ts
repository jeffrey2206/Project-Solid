/**
 * VehicleManager — Gestor de la flota de vehículos de la Reserva Ecológica
 *
 * ANTES (violación LSP): el método printVehicleDetails hacía `instanceof Tesla`,
 * `instanceof Audi`, etc. No se podía sustituir un vehículo por otro de forma
 * transparente. Agregar una nueva marca requería MODIFICAR este método.
 *
 * DESPUÉS (LSP aplicado): VehicleManager opera sobre la ABSTRACCIÓN Vehicle[].
 * Cualquier vehículo concreto (Tesla, Audi, Volvo —si se agrega— etc.) puede
 * sustituir a Vehicle sin que VehicleManager lo note. El polimorfismo resuelve
 * el despacho. Agregar una nueva marca = crear una nueva clase, sin tocar el manager.
 */
import type { Vehicle } from './vehicle.interface';

export class VehicleManager {
  /**
   * Imprime los detalles de cada vehículo en la flota.
   * Opera exclusivamente sobre la abstracción Vehicle, respetando LSP.
   *
   * @param vehicles - Arreglo de vehículos de cualquier marca concreta.
   */
  static printFleetDetails(vehicles: Vehicle[]): void {
    console.log('[VehicleManager] — Detalles de la flota de la Reserva Ecológica:');
    vehicles.forEach((vehicle, index) => {
      console.log(`  ${index + 1}. ${vehicle.getDetails()}`);
    });
  }
}
