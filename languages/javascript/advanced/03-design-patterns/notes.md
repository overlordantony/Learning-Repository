# 03 · Design Patterns

## ¿Por qué patrones?
Soluciones probadas a problemas recurrentes de diseño.
No son código copy-paste — son estructuras que guían decisiones de arquitectura.

---

## Observer (Pub/Sub)
Permite que un objeto notifique a múltiples suscriptores cuando cambia.
```js
class EventEmitter {
  #listeners = new Map();
  on(event, fn) {
    (this.#listeners.get(event) ?? this.#listeners.set(event,[]).get(event)).push(fn);
    return () => this.off(event, fn); // retorna unsubscribe
  }
  off(event, fn) {
    this.#listeners.set(event, (this.#listeners.get(event)??[]).filter(f=>f!==fn));
  }
  emit(event, ...args) {
    (this.#listeners.get(event)??[]).forEach(fn=>fn(...args));
  }
}
```

---

## Strategy
Encapsula algoritmos intercambiables bajo una interfaz común.
```js
class Sorter {
  constructor(strategy) { this.strategy = strategy; }
  sort(data) { return this.strategy(data); }
}
const quickSort = data => [...data].sort((a,b)=>a-b);
const bubbleSort = data => { /* implementación */ };
const sorter = new Sorter(quickSort);
```

---

## Command
Encapsula una operación como objeto, permitiendo undo/redo.
```js
class Editor {
  #historia = [];
  #texto = "";
  ejecutar(command) {
    command.ejecutar(this);
    this.#historia.push(command);
  }
  deshacer() { this.#historia.pop()?.deshacer(this); }
}
class InsertarTexto {
  constructor(texto) { this.texto = texto; }
  ejecutar(editor) { editor._texto += this.texto; }
  deshacer(editor) { editor._texto = editor._texto.slice(0,-this.texto.length); }
}
```

---

## Decorator
Agrega comportamiento a un objeto dinámicamente, sin herencia.
```js
class Logger {
  constructor(servicio) { this.servicio = servicio; }
  async obtener(id) {
    console.time(`obtener-${id}`);
    const result = await this.servicio.obtener(id);
    console.timeEnd(`obtener-${id}`);
    return result;
  }
}
// Uso: const api = new Logger(new UserService());
```

---

## Facade
Interfaz simplificada sobre un subsistema complejo.
```js
class SistemaDePago {
  constructor() {
    this.validador = new ValidadorTarjeta();
    this.procesador = new ProcesadorPago();
    this.notificador = new Notificador();
  }
  async pagar(tarjeta, monto) {
    await this.validador.validar(tarjeta);
    const tx = await this.procesador.procesar(tarjeta, monto);
    await this.notificador.enviar(tx);
    return tx;
  }
}
// El consumidor solo ve pagar(), no los subsistemas
```

---

## Singleton
Una sola instancia de una clase en toda la app.
```js
class Config {
  static #instancia = null;
  #datos = {};
  static getInstance() {
    if (!Config.#instancia) Config.#instancia = new Config();
    return Config.#instancia;
  }
  set(key, val) { this.#datos[key] = val; }
  get(key) { return this.#datos[key]; }
}
// En módulos ES6, el módulo mismo actúa como singleton
```

---

## References
- Refactoring Guru: https://refactoring.guru/es/design-patterns
