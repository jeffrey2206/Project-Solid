/**
 * ProductBloc — Orquestador de la tienda de souvenirs de la Reserva Ecológica
 *
 * ANTES (violación SRP): esta clase hacía TODO: cargaba productos, los guardaba
 * Y enviaba correos. Tenía tres razones para cambiar.
 *
 * DESPUÉS (SRP aplicado): ProductBloc únicamente ORQUESTA. Delega la persistencia
 * a ProductRepository y las notificaciones a MailerService.
 * Ahora solo tiene UNA razón para cambiar: cuando cambia la lógica de negocio
 * de la tienda (ej. reglas de validación de productos).
 */
import type { Product } from './product.interface';
import { ProductRepository } from './product.repository';
import { MailerService } from './mailer.service';

export class ProductBloc {
  private readonly repository: ProductRepository;
  private readonly mailer: MailerService;

  constructor(repository: ProductRepository, mailer: MailerService) {
    this.repository = repository;
    this.mailer = mailer;
  }

  /**
   * Carga un producto del inventario por su ID.
   */
  loadProduct(id: number): Product | undefined {
    return this.repository.findById(id);
  }

  /**
   * Agrega un producto al inventario y notifica al cliente responsable.
   */
  saveAndNotify(product: Product, managerEmail: string): void {
    this.repository.save(product);
    this.mailer.sendNotification(
      managerEmail,
      `El producto "${product.name}" fue agregado al inventario de la Reserva.`
    );
  }
}
