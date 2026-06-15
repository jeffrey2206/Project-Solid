# 🌿 Reserva Ecológica — Refactorización SOLID

> Stack: TypeScript · Vite · Principios SOLID · Conventional Commits

---

## 📦 Instalación y ejecución

```bash
npm install
npm run dev        # Servidor de desarrollo
npm run build      # Compilación para producción
```

Abrir la **consola del navegador** (`F12`) para ver los demos de cada principio ejecutándose.

---

## 🌿 Contexto del dominio

El proyecto simula el sistema de gestión de una **Reserva Ecológica**, que incluye:
- Tienda de souvenirs (inventario de productos)
- Noticias y galería multimedia de fauna/flora
- Flota de vehículos para recorridos
- Catálogo aviar (Tucán, Colibrí, Avestruz, Pato)
- Publicaciones y reportes de avistamientos

Cada módulo SOLID tiene su raíz en este dominio real.

---

## 🗂️ Estructura de ramas

| Rama | Principio | Estado |
|------|-----------|--------|
| `master` | Código base original con violaciones | ✅ |
| `feat/refactor-srp` | Single Responsibility | ✅ Mergeado |
| `feat/refactor-ocp` | Open/Closed | ✅ Mergeado |
| `feat/refactor-lsp` | Liskov Substitution | ✅ Mergeado |
| `feat/refactor-isp` | Interface Segregation | ✅ Mergeado |
| `feat/refactor-dip` | Dependency Inversion | ✅ Mergeado |

---

## 📖 Bitácora de Reflexión Crítica

### S — Single Responsibility Principle

**ANTES:** `ProductBloc` tenía **tres razones para cambiar**: la lógica de carga/guardado de productos (persistencia), y la lógica de envío de correos (infraestructura). Cualquier cambio en el sistema de email obligaba a tocar la misma clase que gestiona el inventario.

**DESPUÉS:** Se extrajeron tres unidades con responsabilidad única:
- `ProductRepository` → solo persistencia. Cambia si cambia la forma de guardar.
- `MailerService` → solo notificaciones. Cambia si cambia el proveedor de email.
- `ProductBloc` → solo orquestación. Cambia si cambian las reglas de negocio.

**Reflexión crítica:** La "clase Dios" es el antipatrón más común en proyectos reales. El problema no es solo de diseño: es de *costos de mantenimiento*. Cuando `ProductBloc` mezclaba responsabilidades, un cambio en el proveedor de email podía romper la lógica del inventario. La separación no añade clases por añadirlas; las añade porque cada una encapsula un *motivo de cambio diferente*.

---

### O — Open/Closed Principle

**ANTES:** `NewsService` y `PhotosService` importaban `axios` directamente. Si se quisiera migrar a la Fetch API nativa, o a otro cliente HTTP, habría que **abrir y modificar** cada servicio. Esto viola OCP porque el código no es "abierto a extensión" ni "cerrado a modificación".

**DESPUÉS:** Se creó la interfaz `HttpClient` con un único método `get<T>()`. `FetchHttpClient` la implementa usando la Fetch API. Los servicios reciben `HttpClient` en su constructor y nunca saben qué implementación concreta están usando.

**Reflexión crítica:** OCP es el principio más malinterpretado. No significa que el código nunca se modifique, sino que los **puntos de variación conocidos** (en este caso, el cliente HTTP) deben ser puntos de extensión, no de modificación. La abstracción `HttpClient` captura exactamente esa variabilidad: mañana podemos crear `AxiosHttpClient`, `MockHttpClient` para tests, o `CachedHttpClient` sin tocar `NewsService` ni `PhotosService`.

---

### L — Liskov Substitution Principle

**ANTES:** `VehicleManager.printVehicleDetails` hacía `instanceof Tesla`, `instanceof Audi`... La firma del método era `(Tesla | Audi | Toyota | Honda | Ford)[]`. Si alguien agregaba una clase `Volvo`, tenía que **modificar `VehicleManager`**, rompiendo OCP y LSP simultáneamente.

**DESPUÉS:** La interfaz `Vehicle` define el contrato `getDetails(): string`. Cada vehículo concreto implementa su propia lógica sin que el manager lo sepa. `VehicleManager.printFleetDetails(vehicles: Vehicle[])` funciona con cualquier subclase de `Vehicle`, presente o futura.

**Reflexión crítica:** LSP en esencia dice: *si tu código necesita hacer `instanceof` para decidir qué método llamar, estás violando el principio*. La transparencia referencial es la clave: cualquier instancia de `Vehicle` debe poder substituir a cualquier otra sin que el código cliente lo note. El `instanceof` en el código original no era un problema técnico; era una señal de diseño roto.

---

### I — Interface Segregation Principle

**ANTES:** La interfaz `Bird` era una interfaz "gorda": `eat()`, `fly()`, `swim()`. El `Avestruz` tenía que implementar `fly()` lanzando `throw new Error()`. El `Colibrí` implementaba `swim()` lanzando también un error. Esto significa que el **contrato de la interfaz era una mentira**: prometía comportamiento que las clases no podían cumplir.

**DESPUÉS:** Tres interfaces segregadas:
- `CanEat` → comportamiento de alimentación
- `CanFly` → comportamiento de vuelo
- `CanSwim` → comportamiento de natación

`Ostrich` implementa `CanEat + CanSwim`. `Toucan` implementa `CanEat + CanFly`. `Duck` implementa las tres. No hay errores artificiales, no hay métodos vacíos.

**Reflexión crítica:** ISP es especialmente relevante cuando se trabaja con herencia o polimorfismo. Una interfaz gorda crea *dependencias implícitas*: `Ostrich` depende de `CanFly` aunque biológicamente no lo necesite. La segregación no es solo limpieza estética; evita que cambios en `CanFly` rompan código de `Ostrich`, y permite que distintos consumidores trabajen con subconjuntos del comportamiento sin cargar con todo el contrato.

---

### D — Dependency Inversion Principle

**ANTES:** `PostService.getPosts()` hacía `const databaseProvider = new LocalDatabaseService()` dentro del método. Esto tiene dos problemas: (1) el módulo de alto nivel (`PostService`) conocía y dependía del módulo de bajo nivel (`LocalDatabaseService`), y (2) era imposible hacer tests unitarios sin modificar el código.

**DESPUÉS:** Se creó la interfaz `DatabaseProvider` con `getFakePosts(): Promise<EcoPost[]>`. `PostService` recibe `DatabaseProvider` en el constructor (inyección de dependencias). Ahora se puede pasar `LocalDatabaseService`, `JsonDatabaseService`, o un `MockDatabaseService` para tests, sin tocar `PostService`.

**Reflexión crítica:** DIP no es solo "usar interfaces". La clave está en *la dirección de la dependencia*. Antes, `PostService` (alto nivel) → `LocalDatabaseService` (bajo nivel). Después, ambos apuntan hacia `DatabaseProvider` (abstracción). Este es el patrón que habilita la **inyección de dependencias** y es la base de frameworks como Angular (su DI container), NestJS y Spring. Además, DIP es la condición necesaria para hacer código **testeable**: si no puedes reemplazar la dependencia, no puedes escribir unit tests sin efectos secundarios.

---

## 🌳 Estructura de archivos

```
src/
├── 01-srp/
│   ├── product.interface.ts       ← Tipo de datos Product
│   ├── product.repository.ts      ← Única resp: persistencia
│   ├── mailer.service.ts          ← Única resp: notificaciones
│   └── product-bloc.ts            ← Orquestador puro
├── 02-ocp/
│   ├── http-client.interface.ts   ← Abstracción HttpClient
│   ├── fetch-http-client.ts       ← Impl. con Fetch API nativa
│   └── news-service.ts            ← Cerrado a modificación
├── 03-lsp/
│   ├── vehicle.interface.ts       ← Contrato Vehicle
│   ├── vehicles/
│   │   ├── tesla.vehicle.ts
│   │   ├── audi.vehicle.ts
│   │   ├── toyota.vehicle.ts
│   │   ├── honda.vehicle.ts
│   │   └── ford.vehicle.ts
│   └── vehicle-manager.ts         ← Opera sobre Vehicle[]
├── 04-isp/
│   ├── bird-abilities.interfaces.ts ← CanEat, CanFly, CanSwim
│   └── bird-catalog.ts              ← Aves con contratos exactos
├── 05-dip/
│   └── post-service.ts             ← Recibe DatabaseProvider
├── data/
│   ├── database-provider.interface.ts ← Abstracción DatabaseProvider
│   └── local-database.ts              ← Implementaciones concretas
└── main.ts                             ← Demo de todos los principios
```

---

## 🔖 Historial de commits (Conventional Commits)

```
chore: initial project setup with SOLID violation examples
refactor(srp): split ProductBloc into ProductRepository and MailerService
merge(srp): integrate Single Responsibility refactoring into master
refactor(ocp): introduce HttpClient abstraction to decouple services from axios
merge(ocp): integrate Open/Closed refactoring into master
refactor(lsp): replace instanceof checks with Vehicle interface polymorphism
merge(lsp): integrate Liskov Substitution refactoring into master
refactor(isp): segregate Bird interface into CanEat, CanFly, CanSwim
merge(isp): integrate Interface Segregation refactoring into master
refactor(dip): inject DatabaseProvider abstraction into PostService
merge(dip): integrate Dependency Inversion refactoring into master
```

---

## ✅ Verificación

```bash
npx tsc --noEmit   # Verificar tipado estricto sin errores
npm run build      # Compilar para producción
```

---
