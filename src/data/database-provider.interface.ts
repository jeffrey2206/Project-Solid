/**
 * DatabaseProvider — Abstracción para proveedores de datos de la Reserva Ecológica
 *
 * Principio DIP aplicado: los módulos de alto nivel (PostService) dependen de
 * esta ABSTRACCIÓN, no de implementaciones concretas (LocalDatabaseService).
 *
 * "Los módulos de alto nivel no deben depender de módulos de bajo nivel.
 * Ambos deben depender de abstracciones."
 * — Robert C. Martin
 */

/** Representa una publicación o reporte de la Reserva Ecológica. */
export interface EcoPost {
  readonly id: number;
  readonly title: string;
  readonly body: string;
}

/** Contrato que debe cumplir cualquier proveedor de datos de publicaciones. */
export interface DatabaseProvider {
  getFakePosts(): Promise<EcoPost[]>;
}
