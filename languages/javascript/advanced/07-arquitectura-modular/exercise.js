// 07 · Arquitectura Modular — exercise.js

// PARTE 1: Event Bus tipado
// Implementa un EventBus con tipado de eventos para evitar typos
// Los tipos de eventos se definen al crear el bus
class EventBus {
  // TU CÓDIGO AQUÍ
  // on(event, fn), off(event, fn), emit(event, data), once(event, fn)
  // wildcard: on("*", fn) recibe todos los eventos
}

const bus = new EventBus();
bus.on("carrito:agregar", ({ producto, cantidad }) =>
  console.log(`+${cantidad} ${producto}`));
bus.on("carrito:vaciar", () => console.log("Carrito vaciado"));
bus.on("*", (event, data) => console.log(`[LOG] ${event}`, data));

bus.emit("carrito:agregar", { producto:"laptop", cantidad:1 });
bus.emit("carrito:vaciar");


// PARTE 2: Sistema de DI simple
// Implementa un Container que:
// - register(nombre, factory) — registra un servicio por nombre
// - singleton(nombre, factory) — registra y cachea la instancia
// - resolve(nombre) — resuelve y construye el servicio
class Container {
  // TU CÓDIGO AQUÍ
}

const container = new Container();
container.register("config", () => ({ host:"localhost", port:3000 }));
container.singleton("logger", (c) => {
  const config = c.resolve("config");
  return { log: (m) => console.log(`[${config.host}] ${m}`) };
});
container.register("userService", (c) => {
  const logger = c.resolve("logger");
  return { crear: (u) => { logger.log(`Creando usuario: ${u.nombre}`); return u; } };
});

const svc = container.resolve("userService");
svc.crear({ nombre:"Ana", email:"ana@test.com" });
// logger singleton: misma instancia aunque se resuelva múltiples veces


// PARTE 3: Repository Pattern
// Implementa InMemoryUserRepo que cumple la interfaz UserRepository
// y permite CRUD completo + búsqueda por campo

class UserRepository {
  async findById(id) { throw new Error("No implementado"); }
  async findAll() { throw new Error("No implementado"); }
  async findBy(campo, valor) { throw new Error("No implementado"); }
  async save(user) { throw new Error("No implementado"); } // insert o update
  async delete(id) { throw new Error("No implementado"); }
}

class InMemoryUserRepo extends UserRepository {
  // TU CÓDIGO AQUÍ
}

(async () => {
  const repo = new InMemoryUserRepo();
  const ana = await repo.save({ nombre:"Ana", email:"ana@test.com", rol:"admin" });
  const luis = await repo.save({ nombre:"Luis", email:"luis@test.com", rol:"user" });
  console.log(await repo.findAll());
  console.log(await repo.findBy("rol","admin"));
  await repo.delete(ana.id);
  console.log(await repo.findAll()); // solo Luis
})();


// PARTE 4: Plugin System
// Implementa una mini-app extensible con sistema de plugins
// La app expone: use(plugin), emit(event,data), on(event,fn)
// Plugins de ejemplo: LoggerPlugin, AnalyticsPlugin, CachePlugin
class MiniApp {
  // TU CÓDIGO AQUÍ
}

const LoggerPlugin = {
  nombre: "logger",
  install(app) {
    app.on("*", (event, data) => console.log(`[LOG] ${event}:`, JSON.stringify(data)));
  }
};
const app = new MiniApp();
app.use(LoggerPlugin);
app.emit("usuario:login", { id:1, nombre:"Ana" }); // [LOG] usuario:login: {...}


// PARTE 5: Módulo con interfaz pública/privada
// Implementa un módulo "carrito" con API pública y estado privado
// API pública: agregar(producto), quitar(id), vaciar(), obtenerTotal(), obtenerItems()
// El estado interno (array de items) no debe ser accesible directamente
const carrito = (() => {
  // TU CÓDIGO AQUÍ — IIFE o factory
})();

carrito.agregar({ id:1, nombre:"laptop", precio:2500000 });
carrito.agregar({ id:2, nombre:"mouse", precio:80000 });
console.log(carrito.obtenerTotal()); // 2580000
carrito.quitar(1);
console.log(carrito.obtenerItems()); // [{ id:2, ... }]
