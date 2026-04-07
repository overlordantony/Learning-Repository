# 07 · Arquitectura Modular

## El problema que resuelve
A medida que la app crece, las dependencias entre módulos se vuelven un grafo imposible.
Cada módulo conoce a todos los demás → cambio en uno rompe todos.

## Principios clave
- **Single Responsibility**: cada módulo hace una sola cosa bien.
- **Open/Closed**: abierto para extensión, cerrado para modificación.
- **Dependency Inversion**: depender de abstracciones, no de implementaciones.
- **Loose coupling**: módulos que se comunican por interfaces, no por referencias directas.

---

## Event Bus — módulos que no se conocen entre sí
```js
// eventBus.js
class EventBus {
  #listeners = new Map();
  on(event, fn)     { (this.#listeners.get(event)??this.#listeners.set(event,[]).get(event)).push(fn); }
  off(event, fn)    { this.#listeners.set(event,(this.#listeners.get(event)??[]).filter(f=>f!==fn)); }
  emit(event, data) { (this.#listeners.get(event)??[]).forEach(fn=>fn(data)); }
}
export const bus = new EventBus();

// moduloA.js
import { bus } from "./eventBus.js";
bus.emit("usuario:login", { id:1, nombre:"Ana" });

// moduloB.js — no conoce a moduloA
import { bus } from "./eventBus.js";
bus.on("usuario:login", ({ nombre }) => console.log(`Bienvenido, ${nombre}`));
```

---

## Inyección de dependencias (DI)
En vez de que un módulo cree sus dependencias, las recibe desde afuera.
```js
// SIN DI — difícil de testear y cambiar
class UserService {
  constructor() {
    this.db = new MySQL(); // dependencia hardcoded
  }
}

// CON DI — fácil de testear (inyectar mock) y cambiar (inyectar otro adaptador)
class UserService {
  constructor(db) { this.db = db; }
}
const service = new UserService(new MySQL()); // producción
const service = new UserService(new MockDB()); // tests
```

---

## Plugin System
Sistema que permite extender funcionalidad sin modificar el núcleo.
```js
class App {
  #plugins = [];
  use(plugin) {
    plugin.install(this);
    this.#plugins.push(plugin);
    return this; // chainable
  }
  emit(event, data) { /* ... */ }
}

// Un plugin
const LoggerPlugin = {
  install(app) {
    app.on("*", (event, data) => console.log(`[${event}]`, data));
  }
};
app.use(LoggerPlugin);
```

---

## Repository Pattern
Abstrae el acceso a datos detrás de una interfaz.
```js
// La interfaz que todos deben cumplir
class UserRepository {
  async findById(id) { throw new Error("Not implemented"); }
  async save(user) { throw new Error("Not implemented"); }
  async delete(id) { throw new Error("Not implemented"); }
}
// Implementaciones intercambiables: MySQLUserRepo, MongoUserRepo, InMemoryUserRepo
```

---

## Container / Service Locator (básico)
```js
class Container {
  #servicios = new Map();
  register(nombre, factory) { this.#servicios.set(nombre, factory); }
  resolve(nombre) {
    const factory = this.#servicios.get(nombre);
    if (!factory) throw new Error(`Servicio no registrado: ${nombre}`);
    return factory(this); // la factory recibe el container para resolver sus propias deps
  }
}
```

## Referencias
- Clean Architecture (Robert Martin)
- Designing Modular Systems: https://addyosmani.com/writing-modular-js/
