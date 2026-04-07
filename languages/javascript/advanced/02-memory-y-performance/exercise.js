// 02 · Memory y Performance — exercise.js

// PARTE 1: Identificar el memory leak
// ¿Cuál es el problema aquí? Corrígelo.
class ComponenteLeaky {
  constructor(elemento) {
    this.elemento = elemento;
    this.datos = new Array(100000).fill("datos");
    this.elemento.addEventListener("click", this.onClick);
  }
  onClick() { console.log(this.datos.length); }
  destroy() {
    // Bug: no limpia el listener — this.datos nunca se libera
    this.elemento = null;
  }
}

class ComponenteFixed {
  // TU CÓDIGO AQUÍ — misma funcionalidad pero sin leak
}


// PARTE 2: Debounce
// Implementa debounce(fn, ms, { leading=false, trailing=true })
// leading: ejecuta al inicio del delay también
function debounce(fn, ms, { leading=false, trailing=true } = {}) {
  // TU CÓDIGO AQUÍ
}
const buscar = debounce((query) => console.log("Buscando:", query), 300);
// Simular: buscar("h") buscar("ho") buscar("hol") buscar("hola") → solo "hola"


// PARTE 3: Throttle
// Implementa throttle(fn, ms) que garantiza máximo una ejecución cada ms
function throttle(fn, ms) {
  // TU CÓDIGO AQUÍ
}
const onScroll = throttle(() => console.log("scroll", Date.now()), 100);


// PARTE 4: Cache con límite (LRU simple)
// Implementa LRUCache(capacidad) con get(key) y set(key, value)
// El item menos recientemente usado se elimina cuando se llena
class LRUCache {
  constructor(capacidad) {
    // TU CÓDIGO AQUÍ
  }
  get(key) { /* TU CÓDIGO AQUÍ */ }
  set(key, value) { /* TU CÓDIGO AQUÍ */ }
}

const cache = new LRUCache(3);
cache.set("a",1); cache.set("b",2); cache.set("c",3);
cache.get("a");          // 1 — lo hace el más reciente
cache.set("d",4);        // elimina "b" (el menos reciente)
console.log(cache.get("b")); // undefined


// PARTE 5: DocumentFragment vs DOM directo
// Compara el tiempo de insertar 1000 elementos directamente vs con DocumentFragment
function insertarDirecto(lista, items) {
  // TU CÓDIGO AQUÍ
}
function insertarConFragment(lista, items) {
  // TU CÓDIGO AQUÍ — usa DocumentFragment
}


// BONUS: WeakMap para datos privados de instancia
// Usa un WeakMap para almacenar datos privados de instancias de clase
// sin que esos datos impidan el GC cuando la instancia se descarta
const _privados = new WeakMap();
class Sensor {
  // TU CÓDIGO AQUÍ — guarda lecturas privadas en _privados
}
