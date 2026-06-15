/**
 * Interfaces de habilidades para el catálogo de fauna de la Reserva Ecológica
 *
 * ANTES (violación ISP): una interfaz Bird "gorda" obligaba a todas las aves
 * a implementar eat(), fly() Y swim(). El Avestruz (Ostrich) lanzaba una
 * excepción en fly() y el Colibrí (Hummingbird) en swim().
 *
 * DESPUÉS (ISP aplicado): cada habilidad es una interfaz separada.
 * Las aves implementan ÚNICAMENTE las interfaces que corresponden a su naturaleza.
 * No hay métodos vacíos ni excepciones artificiales.
 *
 * Principio ISP: "Los clientes no deben verse obligados a depender de interfaces
 * que no utilizan."
 */

/** Habilidad de alimentación — toda criatura viviente en la Reserva come. */
export interface CanEat {
  eat(): void;
}

/** Habilidad de vuelo — exclusiva de las aves que pueden volar. */
export interface CanFly {
  fly(): void;
}

/** Habilidad de natación — exclusiva de las aves acuáticas o semi-acuáticas. */
export interface CanSwim {
  swim(): void;
}
