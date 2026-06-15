/**
 * FetchHttpClient — Implementación concreta de HttpClient usando la Fetch API nativa
 *
 * Principio OCP: esta es UNA de las posibles implementaciones de HttpClient.
 * Si mañana se requiere usar axios u otra librería, se crea una nueva clase
 * (AxiosHttpClient) sin modificar FetchHttpClient ni los servicios que la consumen.
 */
import type { HttpClient } from './http-client.interface';

export class FetchHttpClient implements HttpClient {
  /**
   * Realiza una petición GET usando la Fetch API nativa del navegador.
   * Lanza un error descriptivo si la respuesta HTTP no es exitosa.
   */
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `[FetchHttpClient] Error HTTP ${response.status} al consultar: ${url}`
      );
    }

    return response.json() as Promise<T>;
  }
}
