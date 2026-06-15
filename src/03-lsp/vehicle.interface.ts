/**
 * Vehicle — Abstracción base para todos los vehículos de la flota de la Reserva Ecológica
 *
 * Principio LSP aplicado: cualquier subclase de Vehicle puede sustituir a Vehicle
 * de forma TRANSPARENTE. VehicleManager no necesita saber qué marca es cada vehículo;
 * simplemente llama a getDetails() y el polimorfismo hace el resto.
 *
 * ANTES (violación LSP): VehicleManager hacía `instanceof Tesla`, `instanceof Audi`, etc.
 * Agregar una nueva marca requería modificar VehicleManager.
 *
 * DESPUÉS (LSP aplicado): cada vehículo concreto implementa su propio getDetails().
 * VehicleManager itera sobre Vehicle[] sin conocer la marca concreta.
 */
export interface Vehicle {
  readonly model: string;
  /**
   * Retorna una descripción detallada del vehículo con información específica de su marca.
   * Toda subclase DEBE implementar este método sin romper el contrato.
   */
  getDetails(): string;
}
