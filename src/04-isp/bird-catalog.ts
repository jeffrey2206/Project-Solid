/**
 * Catálogo de Fauna Aviar de la Reserva Ecológica
 *
 * ANTES (violación ISP): interfaz Bird con eat(), fly() y swim().
 * - Toucan.swim() → implementación vacía sin sentido
 * - Hummingbird.swim() → lanzaba Error en tiempo de ejecución
 * - Ostrich.fly() → lanzaba Error en tiempo de ejecución
 *
 * DESPUÉS (ISP aplicado): cada ave implementa SOLO las interfaces
 * que corresponden a su naturaleza biológica real.
 * No hay métodos vacíos, no hay errores artificiales, no hay mentiras en el contrato.
 */
import type { CanEat, CanFly, CanSwim } from './bird-abilities.interfaces';

/**
 * Tucán — Ave del dosel tropical de la Reserva.
 * Come frutas y vuela, pero NO nada.
 * Implementa: CanEat, CanFly
 */
export class Toucan implements CanEat, CanFly {
  eat(): void {
    console.log('[Toucan] El Tucán come frutas del dosel tropical.');
  }

  fly(): void {
    console.log('[Toucan] El Tucán vuela sobre la selva de la reserva.');
  }
}

/**
 * Colibrí — Ave polinizadora de la Reserva.
 * Bebe néctar y vuela con gran agilidad, pero NO nada.
 * Implementa: CanEat, CanFly
 */
export class Hummingbird implements CanEat, CanFly {
  eat(): void {
    console.log('[Hummingbird] El Colibrí libra néctar de las flores de la reserva.');
  }

  fly(): void {
    console.log('[Hummingbird] El Colibrí aletea hasta 80 veces por segundo.');
  }
}

/**
 * Avestruz — Ave terrestre de la Reserva.
 * Come y puede nadar, pero DEFINITIVAMENTE no vuela.
 * Implementa: CanEat, CanSwim
 * ❌ NO implementa CanFly → ISP correcto: no se fuerza ningún contrato falso.
 */
export class Ostrich implements CanEat, CanSwim {
  eat(): void {
    console.log('[Ostrich] El Avestruz come hierbas y semillas del suelo.');
  }

  swim(): void {
    console.log('[Ostrich] El Avestruz puede cruzar cuerpos de agua a nado si es necesario.');
  }
}

/**
 * Pato — Ave semi-acuática de la Reserva.
 * Come, vuela y nada. Implementa las tres habilidades.
 * Implementa: CanEat, CanFly, CanSwim
 */
export class Duck implements CanEat, CanFly, CanSwim {
  eat(): void {
    console.log('[Duck] El Pato busca invertebrados en el agua.');
  }

  fly(): void {
    console.log('[Duck] El Pato migra largas distancias en formación.');
  }

  swim(): void {
    console.log('[Duck] El Pato nada en el humedal de la reserva.');
  }
}
