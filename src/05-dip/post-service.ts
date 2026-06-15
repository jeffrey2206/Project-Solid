/**
 * PostService — Servicio de publicaciones de la Reserva Ecológica
 *
 * ANTES (violación DIP): PostService instanciaba LocalDatabaseService directamente
 * dentro de getPosts(). Era imposible cambiar el proveedor sin abrir este archivo.
 * El módulo de alto nivel dependía del módulo de bajo nivel.
 *
 * DESPUÉS (DIP aplicado): PostService depende de la ABSTRACCIÓN DatabaseProvider.
 * La implementación concreta (Local, JSON, API, Mock) se inyecta desde afuera.
 * El módulo de alto nivel ya no conoce al módulo de bajo nivel.
 */
import type { DatabaseProvider, EcoPost } from '../data/database-provider.interface';

export class PostService {
  private posts: EcoPost[] = [];

  /**
   * @param databaseProvider - Proveedor de datos inyectado desde el exterior.
   *   Puede ser LocalDatabaseService, JsonDatabaseService, o cualquier
   *   implementación futura de DatabaseProvider.
   */
  constructor(private readonly databaseProvider: DatabaseProvider) {}

  /**
   * Recupera las publicaciones y reportes de la Reserva Ecológica.
   * Delega la obtención de datos al proveedor inyectado.
   */
  async getPosts(): Promise<EcoPost[]> {
    console.log('[PostService] Solicitando publicaciones al proveedor de datos...');
    this.posts = await this.databaseProvider.getFakePosts();
    return this.posts;
  }
}
