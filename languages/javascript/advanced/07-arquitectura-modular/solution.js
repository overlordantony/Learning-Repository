// 07 · Arquitectura Modular — solution.js

// PARTE 1
class EventBus {
  #listeners = new Map();
  #wildcards = [];
  on(event, fn) {
    if (event==="*") { this.#wildcards.push(fn); return ()=>this.#wildcards.splice(this.#wildcards.indexOf(fn),1); }
    if (!this.#listeners.has(event)) this.#listeners.set(event,[]);
    this.#listeners.get(event).push(fn);
    return () => this.off(event,fn);
  }
  off(event,fn) { this.#listeners.set(event,(this.#listeners.get(event)??[]).filter(f=>f!==fn)); }
  emit(event,data) {
    (this.#listeners.get(event)??[]).forEach(fn=>fn(data));
    this.#wildcards.forEach(fn=>fn(event,data));
  }
  once(event,fn) { const u=this.on(event,(...a)=>{fn(...a);u();}); }
}

// PARTE 2
class Container {
  #registro = new Map();
  #cache = new Map();
  register(nombre, factory) { this.#registro.set(nombre,{factory,singleton:false}); }
  singleton(nombre, factory) { this.#registro.set(nombre,{factory,singleton:true}); }
  resolve(nombre) {
    const entry = this.#registro.get(nombre);
    if (!entry) throw new Error(`No registrado: ${nombre}`);
    if (entry.singleton) {
      if (!this.#cache.has(nombre)) this.#cache.set(nombre,entry.factory(this));
      return this.#cache.get(nombre);
    }
    return entry.factory(this);
  }
}

// PARTE 3
class InMemoryUserRepo extends UserRepository {
  #datos = new Map();
  #nextId = 1;
  async findById(id) { return this.#datos.get(id) ?? null; }
  async findAll() { return [...this.#datos.values()]; }
  async findBy(campo,valor) { return [...this.#datos.values()].filter(u=>u[campo]===valor); }
  async save(user) {
    const id = user.id ?? this.#nextId++;
    const guardado = { ...user, id };
    this.#datos.set(id, guardado);
    return guardado;
  }
  async delete(id) { return this.#datos.delete(id); }
}

// PARTE 4
class MiniApp {
  #bus = new EventBus();
  #plugins = [];
  use(plugin) { plugin.install(this); this.#plugins.push(plugin); return this; }
  on(event,fn) { return this.#bus.on(event,fn); }
  emit(event,data) { this.#bus.emit(event,data); }
}

// PARTE 5
const carrito = (() => {
  let _items = [];
  let _nextId = 1;
  return {
    agregar(producto) { _items.push({...(producto), _cartId:_nextId++}); },
    quitar(id) { _items = _items.filter(i=>i.id!==id); },
    vaciar() { _items = []; },
    obtenerTotal() { return _items.reduce((a,i)=>a+i.precio,0); },
    obtenerItems() { return _items.map(i=>({...i})); } // copia defensiva
  };
})();
