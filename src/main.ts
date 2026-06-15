/**
 * main.ts — Punto de entrada de la Reserva Ecológica SOLID
 *
 * Demuestra todos los principios SOLID refactorizados funcionando en conjunto.
 * Cada sección corresponde a una rama y un principio independiente.
 */
import './style.css';

// ─── SRP: Single Responsibility Principle ────────────────────────────────────
import { ProductBloc } from './01-srp/product-bloc';
import { ProductRepository } from './01-srp/product.repository';
import { MailerService } from './01-srp/mailer.service';

// ─── OCP: Open/Closed Principle ──────────────────────────────────────────────
import { NewsService, PhotosService } from './02-ocp/news-service';
import { FetchHttpClient } from './02-ocp/fetch-http-client';

// ─── LSP: Liskov Substitution Principle ──────────────────────────────────────
import { VehicleManager } from './03-lsp/vehicle-manager';
import { Tesla } from './03-lsp/vehicles/tesla.vehicle';
import { Audi } from './03-lsp/vehicles/audi.vehicle';
import { Toyota } from './03-lsp/vehicles/toyota.vehicle';
import { Honda } from './03-lsp/vehicles/honda.vehicle';
import { Ford } from './03-lsp/vehicles/ford.vehicle';

// ─── ISP: Interface Segregation Principle ────────────────────────────────────
import { Toucan, Hummingbird, Ostrich, Duck } from './04-isp/bird-catalog';

// ─── DIP: Dependency Inversion Principle ─────────────────────────────────────
import { PostService } from './05-dip/post-service';
import { LocalDatabaseService, JsonDatabaseService } from './data/local-database';

// ══════════════════════════════════════════════════════════════════════════════
// DEMOSTRACIÓN — Revisar la consola del navegador
// ══════════════════════════════════════════════════════════════════════════════

console.group('🌿 RESERVA ECOLÓGICA — Principios SOLID Refactorizados');

// ─── SRP Demo ─────────────────────────────────────────────────────────────────
console.group('1️⃣  SRP — Single Responsibility Principle');
const repository = new ProductRepository();
const mailer = new MailerService();
const bloc = new ProductBloc(repository, mailer);
bloc.saveAndNotify(
  { id: 1, name: 'Camiseta Jaguar', price: 25 },
  'tienda@reserva-ecologica.com'
);
console.groupEnd();

// ─── OCP Demo ─────────────────────────────────────────────────────────────────
console.group('2️⃣  OCP — Open/Closed Principle');
const httpClient = new FetchHttpClient();
const newsService = new NewsService(httpClient);
const photosService = new PhotosService(httpClient);
console.log('[OCP] NewsService y PhotosService usan FetchHttpClient sin conocer axios.');
newsService.getLatestNews().then((posts) =>
  console.log(`[OCP] ${posts.length} noticias cargadas desde la API.`)
);
photosService.getGallery().then((photos) =>
  console.log(`[OCP] ${photos.length} fotos cargadas de la galería.`)
);
console.groupEnd();

// ─── LSP Demo ─────────────────────────────────────────────────────────────────
console.group('3️⃣  LSP — Liskov Substitution Principle');
const fleet = [
  new Tesla('Model 3'),
  new Audi('Q5'),
  new Toyota('Prius'),
  new Honda('CR-V'),
  new Ford('Ranger'),
];
VehicleManager.printFleetDetails(fleet);
console.groupEnd();

// ─── ISP Demo ─────────────────────────────────────────────────────────────────
console.group('4️⃣  ISP — Interface Segregation Principle');
const avifauna = [new Toucan(), new Hummingbird(), new Ostrich(), new Duck()];
avifauna.forEach((bird) => bird.eat());
// Solo las aves que PUEDEN volar, vuelan:
[new Toucan(), new Hummingbird(), new Duck()].forEach((b) => b.fly());
// Solo las aves que PUEDEN nadar, nadan:
[new Ostrich(), new Duck()].forEach((b) => b.swim());
console.groupEnd();

// ─── DIP Demo ─────────────────────────────────────────────────────────────────
console.group('5️⃣  DIP — Dependency Inversion Principle');
const localService = new PostService(new LocalDatabaseService());
const jsonService = new PostService(new JsonDatabaseService());
localService.getPosts().then((posts) =>
  console.log('[DIP] Local DB posts:', posts.map((p) => p.title))
);
jsonService.getPosts().then((posts) =>
  console.log('[DIP] JSON DB posts:', posts.map((p) => p.title))
);
console.groupEnd();

console.groupEnd();

// ─── Render de la UI ──────────────────────────────────────────────────────────
const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <header class="hero">
    <div class="hero-content">
      <span class="badge">TypeScript · SOLID · Clean Code</span>
      <h1>Reserva Ecológica</h1>
      <p class="subtitle">Refactorización arquitectónica con los 5 principios SOLID</p>
    </div>
  </header>

  <main class="principles-grid">

    <article class="card" id="srp-card">
      <div class="card-icon">S</div>
      <div class="card-body">
        <h2>SRP</h2>
        <h3>Single Responsibility</h3>
        <p class="violation">
          <span class="tag before">ANTES</span>
          <code>ProductBloc</code> gestionaba el inventario <em>y</em> enviaba correos.
        </p>
        <p class="fix">
          <span class="tag after">DESPUÉS</span>
          <code>ProductRepository</code> + <code>MailerService</code> + <code>ProductBloc</code> orquestador.
        </p>
      </div>
    </article>

    <article class="card" id="ocp-card">
      <div class="card-icon">O</div>
      <div class="card-body">
        <h2>OCP</h2>
        <h3>Open / Closed</h3>
        <p class="violation">
          <span class="tag before">ANTES</span>
          <code>NewsService</code> importaba <code>axios</code> directamente. Cambiar librería = modificar código.
        </p>
        <p class="fix">
          <span class="tag after">DESPUÉS</span>
          Interfaz <code>HttpClient</code> + <code>FetchHttpClient</code>. Los servicios no tocan implementaciones.
        </p>
      </div>
    </article>

    <article class="card" id="lsp-card">
      <div class="card-icon">L</div>
      <div class="card-body">
        <h2>LSP</h2>
        <h3>Liskov Substitution</h3>
        <p class="violation">
          <span class="tag before">ANTES</span>
          <code>VehicleManager</code> usaba <code>instanceof Tesla</code>, <code>instanceof Audi</code>…
        </p>
        <p class="fix">
          <span class="tag after">DESPUÉS</span>
          Interfaz <code>Vehicle</code> con <code>getDetails()</code>. Polimorfismo puro, sin marcas concretas.
        </p>
      </div>
    </article>

    <article class="card" id="isp-card">
      <div class="card-icon">I</div>
      <div class="card-body">
        <h2>ISP</h2>
        <h3>Interface Segregation</h3>
        <p class="violation">
          <span class="tag before">ANTES</span>
          Interfaz <code>Bird</code> forzaba al <code>Avestruz</code> a implementar <code>fly()</code> → Error.
        </p>
        <p class="fix">
          <span class="tag after">DESPUÉS</span>
          <code>CanEat</code> · <code>CanFly</code> · <code>CanSwim</code>. Cada ave implementa solo su naturaleza.
        </p>
      </div>
    </article>

    <article class="card" id="dip-card">
      <div class="card-icon">D</div>
      <div class="card-body">
        <h2>DIP</h2>
        <h3>Dependency Inversion</h3>
        <p class="violation">
          <span class="tag before">ANTES</span>
          <code>PostService</code> instanciaba <code>new LocalDatabaseService()</code> internamente.
        </p>
        <p class="fix">
          <span class="tag after">DESPUÉS</span>
          <code>DatabaseProvider</code> inyectado por constructor. Alto nivel no conoce al bajo nivel.
        </p>
      </div>
    </article>

  </main>

  <footer class="footer">
    <p>🌿 Reserva Ecológica · Principios SOLID · Revisar la consola del navegador para ver los demos</p>
  </footer>
`;
