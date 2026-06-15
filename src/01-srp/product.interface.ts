/**
 * Interfaz que define la forma de un Producto en la tienda de souvenirs
 * de la Reserva Ecológica.
 *
 * Principio SRP: esta interfaz tiene una única responsabilidad:
 * describir el contrato de datos de un Producto.
 */
export interface Product {
  readonly id: number;
  readonly name: string;
  readonly price: number;
}
