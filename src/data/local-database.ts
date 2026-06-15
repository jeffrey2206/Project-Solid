/**
 * Proveedores de datos de la Reserva Ecológica
 *
 * DESPUÉS (DIP aplicado): ambas clases implementan la interfaz DatabaseProvider.
 * PostService puede recibir cualquiera de ellas sin saberlo.
 * Agregar un nuevo proveedor (ApiDatabaseService) no requiere modificar PostService.
 */
import type { DatabaseProvider, EcoPost } from './database-provider.interface';

/**
 * LocalDatabaseService — Proveedor de datos en memoria de la Reserva.
 * Simula reportes almacenados localmente (avistamientos, flora, fauna).
 */
export class LocalDatabaseService implements DatabaseProvider {
  async getFakePosts(): Promise<EcoPost[]> {
    return [
      {
        id: 1,
        title: 'Avistamiento de Jaguar',
        body: 'Se reportó un jaguar adulto cerca del río Sarapiquí.',
      },
      {
        id: 2,
        title: 'Nuevas Orquídeas',
        body: 'Han florecido tres especies raras en el jardín botánico de la reserva.',
      },
    ];
  }
}

/**
 * JsonDatabaseService — Proveedor alternativo que simula una fuente JSON externa.
 * Se puede inyectar en PostService sin modificar ninguna línea de PostService.
 */
export class JsonDatabaseService implements DatabaseProvider {
  async getFakePosts(): Promise<EcoPost[]> {
    return [
      {
        id: 1,
        title: 'Reporte de Biodiversidad 2025',
        body: 'Datos consolidados desde el sistema JSON externo de la reserva.',
      },
    ];
  }
}
