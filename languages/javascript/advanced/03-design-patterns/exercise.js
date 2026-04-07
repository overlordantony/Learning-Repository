// 03 · Design Patterns — exercise.js

// PARTE 1: EventEmitter (Observer)
// Implementa un EventEmitter completo con:
// on(event, fn) → retorna función unsubscribe
// off(event, fn)
// emit(event, ...args)
// once(event, fn) → se desuscribe automáticamente después de la primera llamada
class EventEmitter {
  // TU CÓDIGO AQUÍ
}

const emitter = new EventEmitter();
const unsubscribe = emitter.on("datos", (d) => console.log("A recibió:", d));
emitter.once("datos", (d) => console.log("B (once) recibió:", d));

emitter.emit("datos", { x: 1 }); // A y B reciben
emitter.emit("datos", { x: 2 }); // solo A recibe
unsubscribe();
emitter.emit("datos", { x: 3 }); // nadie recibe


// PARTE 2: Strategy para validación
// Implementa un Validador que acepta estrategias intercambiables.
// Estrategias: validarEmail, validarTelefono, validarPassword
// Cada estrategia retorna { valido: bool, errores: string[] }
class Validador {
  constructor(estrategia) { this.estrategia = estrategia; }
  // TU CÓDIGO AQUÍ
}

const validarEmail = (valor) => {
  // TU CÓDIGO AQUÍ
};
const validarPassword = (valor) => {
  // Reglas: min 8 chars, al menos una mayúscula, un número
  // TU CÓDIGO AQUÍ
};

const v = new Validador(validarEmail);
console.log(v.validar("test@mail.com")); // { valido: true, errores: [] }
console.log(v.validar("invalido"));      // { valido: false, errores: [...] }
v.setEstrategia(validarPassword);
console.log(v.validar("abc"));           // { valido: false, errores: [...] }


// PARTE 3: Command con undo/redo
// Implementa un historial de comandos para un objeto "estado"
// Comandos: SetValor(key, valor), IncrementarContador(key, cantidad)
// El historial debe soportar undo() y redo()
class HistorialComandos {
  // TU CÓDIGO AQUÍ
}

const estado = { contador: 0, nombre: "" };
const historial = new HistorialComandos(estado);
historial.ejecutar({ 
  ejecutar: (s) => { s._prev = s.nombre; s.nombre = "Ana"; },
  deshacer: (s) => { s.nombre = s._prev; }
});
console.log(estado.nombre); // "Ana"
historial.deshacer();
console.log(estado.nombre); // ""


// PARTE 4: Decorator para cache automático
// Crea withCache(servicio, ttlMs) que wrappea cualquier servicio
// y cachea los resultados de sus métodos async por ttlMs milisegundos
function withCache(servicio, ttlMs = 5000) {
  // TU CÓDIGO AQUÍ — retorna un Proxy o wrapper del servicio
}

const delay = ms => new Promise(r => setTimeout(r, ms));
const apiLenta = {
  async obtener(id) {
    await delay(200);
    return { id, data: `resultado-${id}`, ts: Date.now() };
  }
};
const apiCacheada = withCache(apiLenta, 3000);
// Primera llamada: 200ms. Segunda llamada al mismo id: instantánea.


// PARTE 5: Facade para sistema de notificaciones
// Crea NotificadorFacade que unifica email, SMS y push
// internamente usa subsistemas separados, externamente expone:
// notificar(usuario, mensaje, canales=[])
class NotificadorFacade {
  // TU CÓDIGO AQUÍ
}


// BONUS: Singleton para config de app
// Implementa Config como singleton que persiste durante el ciclo de vida de la app
// Config.getInstance().set(key, val) / Config.getInstance().get(key)
