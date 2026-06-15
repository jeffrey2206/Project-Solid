/**
 * HttpClient — Abstracción para clientes HTTP de la Reserva Ecológica
 *
 * Principio OCP aplicado: los servicios (NewsService, PhotosService) dependen
 * de esta ABSTRACCIÓN y no de una implementación concreta como axios.
 * Están CERRADOS a modificación pero ABIERTOS a extensión:
 * podemos crear FetchHttpClient, MockHttpClient, etc. sin tocar los servicios.
 */
export interface HttpClient {
  /**
   * Realiza una petición GET a la URL indicada y devuelve los datos tipados.
   * @param url - Endpoint a consultar.
   */
  get<T>(url: string): Promise<T>;
}
