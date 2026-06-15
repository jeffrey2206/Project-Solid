/**
 * NewsService y PhotosService — Servicios de contenido de la Reserva Ecológica
 *
 * ANTES (violación OCP): ambos servicios importaban axios directamente.
 * Si axios cambiara o desapareciera, habría que modificar cada servicio.
 *
 * DESPUÉS (OCP aplicado): los servicios dependen de la ABSTRACCIÓN HttpClient.
 * Están CERRADOS a modificación (no importamos axios ni fetch directamente)
 * y ABIERTOS a extensión (cualquier HttpClient compatible puede inyectarse).
 */
import type { HttpClient } from './http-client.interface';

/** Representa una noticia/publicación de la Reserva Ecológica. */
interface NewsPost {
  readonly id: number;
  readonly title: string;
  readonly body: string;
}

/** Representa una foto de la galería multimedia de la Reserva. */
interface GalleryPhoto {
  readonly id: number;
  readonly title: string;
  readonly url: string;
  readonly thumbnailUrl: string;
}

export class NewsService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene las últimas noticias publicadas sobre la Reserva Ecológica.
   */
  async getLatestNews(): Promise<NewsPost[]> {
    console.log('[NewsService] Obteniendo noticias de la reserva biológica...');
    return this.http.get<NewsPost[]>('https://jsonplaceholder.typicode.com/posts');
  }
}

export class PhotosService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene la galería de fotografías de fauna y flora de la Reserva.
   */
  async getGallery(): Promise<GalleryPhoto[]> {
    console.log('[PhotosService] Cargando galería multimedia de la Reserva...');
    return this.http.get<GalleryPhoto[]>('https://jsonplaceholder.typicode.com/photos');
  }
}
