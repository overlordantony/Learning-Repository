// 02 · Memory y Performance — solution.js

// PARTE 1
class ComponenteFixed {
  constructor(elemento) {
    this.elemento = elemento;
    this.datos = new Array(100000).fill("datos");
    this._onClick = () => console.log(this.datos.length); // referencia guardada
    this.elemento.addEventListener("click", this._onClick);
  }
  destroy() {
    this.elemento.removeEventListener("click", this._onClick); // limpieza
    this.elemento = null;
    this.datos = null;
  }
}

// PARTE 2
function debounce(fn, ms, { leading=false, trailing=true }={}) {
  let timer = null;
  let ultimaLlamada = false;
  return function(...args) {
    const llamarAhora = leading && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (trailing && ultimaLlamada) fn.apply(this, args);
      ultimaLlamada = false;
    }, ms);
    ultimaLlamada = true;
    if (llamarAhora) fn.apply(this, args);
  };
}

// PARTE 3
function throttle(fn, ms) {
  let ultimo = 0;
  let timer = null;
  return function(...args) {
    const ahora = Date.now();
    const restante = ms - (ahora - ultimo);
    if (restante <= 0) {
      if (timer) { clearTimeout(timer); timer = null; }
      ultimo = ahora;
      fn.apply(this, args);
    }
  };
}

// PARTE 4
class LRUCache {
  constructor(cap) {
    this.cap = cap;
    this.cache = new Map(); // Map mantiene orden de inserción
  }
  get(key) {
    if (!this.cache.has(key)) return undefined;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val); // mover al final = más reciente
    return val;
  }
  set(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.cap) {
      this.cache.delete(this.cache.keys().next().value); // eliminar el primero = LRU
    }
    this.cache.set(key, value);
  }
}

// PARTE 5
function insertarDirecto(lista, items) {
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li); // un reflow por cada append
  });
}
function insertarConFragment(lista, items) {
  const frag = document.createDocumentFragment();
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    frag.appendChild(li); // sin reflow
  });
  lista.appendChild(frag); // UN solo reflow
}

// BONUS
const _privados = new WeakMap();
class Sensor {
  constructor(nombre) {
    _privados.set(this, { lecturas: [] });
    this.nombre = nombre;
  }
  registrar(valor) { _privados.get(this).lecturas.push({ valor, ts: Date.now() }); }
  promedio() {
    const { lecturas } = _privados.get(this);
    return lecturas.reduce((a,b) => a+b.valor, 0) / lecturas.length;
  }
}
