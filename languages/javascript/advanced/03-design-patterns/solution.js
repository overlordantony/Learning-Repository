// 03 · Design Patterns — solution.js

// PARTE 1
class EventEmitter {
  #listeners = new Map();
  on(event, fn) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, []);
    this.#listeners.get(event).push(fn);
    return () => this.off(event, fn);
  }
  off(event, fn) {
    this.#listeners.set(event, (this.#listeners.get(event) ?? []).filter(f => f !== fn));
  }
  emit(event, ...args) {
    (this.#listeners.get(event) ?? []).forEach(fn => fn(...args));
  }
  once(event, fn) {
    const wrapper = (...args) => { fn(...args); this.off(event, wrapper); };
    this.on(event, wrapper);
  }
}

// PARTE 2
class Validador {
  constructor(estrategia) { this.estrategia = estrategia; }
  setEstrategia(estrategia) { this.estrategia = estrategia; }
  validar(valor) { return this.estrategia(valor); }
}
const validarEmail = (v) => {
  const errores = [];
  if (!v.includes("@")) errores.push("Falta @");
  if (!v.includes(".")) errores.push("Falta dominio");
  return { valido: errores.length === 0, errores };
};
const validarPassword = (v) => {
  const errores = [];
  if (v.length < 8) errores.push("Mínimo 8 caracteres");
  if (!/[A-Z]/.test(v)) errores.push("Necesita al menos una mayúscula");
  if (!/[0-9]/.test(v)) errores.push("Necesita al menos un número");
  return { valido: errores.length === 0, errores };
};

// PARTE 3
class HistorialComandos {
  #estado; #pila = []; #rehacer = [];
  constructor(estado) { this.#estado = estado; }
  ejecutar(cmd) {
    cmd.ejecutar(this.#estado);
    this.#pila.push(cmd);
    this.#rehacer = []; // limpiar redo al ejecutar nuevo comando
  }
  deshacer() {
    const cmd = this.#pila.pop();
    if (cmd) { cmd.deshacer(this.#estado); this.#rehacer.push(cmd); }
  }
  rehacer() {
    const cmd = this.#rehacer.pop();
    if (cmd) { cmd.ejecutar(this.#estado); this.#pila.push(cmd); }
  }
}

// PARTE 4
function withCache(servicio, ttlMs=5000) {
  const cache = new Map();
  return new Proxy(servicio, {
    get(target, prop) {
      const fn = target[prop];
      if (typeof fn !== "function") return fn;
      return async (...args) => {
        const key = `${prop}:${JSON.stringify(args)}`;
        const cached = cache.get(key);
        if (cached && Date.now() - cached.ts < ttlMs) {
          console.log(`[cache hit] ${key}`);
          return cached.valor;
        }
        const valor = await fn.apply(target, args);
        cache.set(key, { valor, ts: Date.now() });
        return valor;
      };
    }
  });
}

// PARTE 5
class NotificadorFacade {
  #email = { enviar: async (u,m) => console.log(`[EMAIL→${u.email}] ${m}`) };
  #sms   = { enviar: async (u,m) => console.log(`[SMS→${u.tel}] ${m}`) };
  #push  = { enviar: async (u,m) => console.log(`[PUSH→${u.deviceId}] ${m}`) };

  async notificar(usuario, mensaje, canales=["email"]) {
    const mapa = { email: this.#email, sms: this.#sms, push: this.#push };
    await Promise.all(canales.map(c => mapa[c]?.enviar(usuario, mensaje)));
  }
}

// BONUS
class Config {
  static #instancia = null;
  #datos = {};
  static getInstance() {
    if (!Config.#instancia) Config.#instancia = new Config();
    return Config.#instancia;
  }
  set(key, val) { this.#datos[key] = val; return this; }
  get(key) { return this.#datos[key]; }
  getAll() { return { ...this.#datos }; }
}
