/**
 * ProductRepository — Responsabilidad: persistencia del inventario
 *
 * Principio SRP aplicado: esta clase tiene UNA sola razón para cambiar,
 * y es cuando cambia la forma en que se almacenan o recuperan productos.
 * Ya no tiene ningún conocimiento de correos ni de lógica de negocio superior.
 */
import type { Product } from './product.interface';

export class ProductRepository {
  private readonly products: Product[] = [];

  /**
   * Recupera un producto del inventario de la Reserva Ecológica por su ID.
   * @returns El producto encontrado o `undefined` si no existe.
   */
  findById(id: number): Product | undefined {
    console.log(`[ProductRepository] Buscando producto con ID: ${id} en el inventario.`);
    return this.products.find((p) => p.id === id);
  }

  /**
   * Persiste un nuevo producto en el inventario de la tienda de souvenirs.
   */
  save(product: Product): void {
    console.log(`[ProductRepository] Guardando "${product.name}" en la base de datos de la reserva.`);
    this.products.push(product);
  }
}
