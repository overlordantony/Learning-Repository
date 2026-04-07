// 10 · Patrones Funcionales — solution.js

// PARTE 1
// agregarAlTotal: IMPURA — modifica variable externa
// obtenerFecha: IMPURA — resultado varía con el tiempo
// calcularIVA: PURA — mismo input, mismo output, sin side effects

const sumarA = (acumulado, n) => acumulado + n; // versión pura

// PARTE 2
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const toSlug = pipe(
  str => str.trim(),
  str => str.toLowerCase(),
  str => str.replace(/\s+/g, "-"),
  str => `slug:${str}`
);
console.log(toSlug("  Hola Mundo  ")); // "slug:hola-mundo"

// PARTE 3
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
}
const multiplicar = curry((a,b,c) => a*b*c);

// PARTE 4
const partial = (fn, ...preArgs) => (...args) => fn(...preArgs, ...args);
const formatearMensaje = (nivel, contexto, mensaje) => `[${nivel}][${contexto}] ${mensaje}`;
const logInfo  = partial(formatearMensaje, "INFO");
const logError = partial(formatearMensaje, "ERROR");
const logDBInfo = partial(formatearMensaje, "INFO", "DB");

// PARTE 5
class Maybe {
  constructor(value) { this._value = value; }
  static of(value) { return new Maybe(value); }
  isNothing() { return this._value == null; }
  map(fn) { return this.isNothing() ? this : Maybe.of(fn(this._value)); }
  getOrElse(def) { return this.isNothing() ? def : this._value; }
}

// BONUS
const productos = [
  { nombre:"Laptop", precio:2500000, activo:true },
  { nombre:"Mouse",  precio:80000,   activo:false },
  { nombre:"Silla",  precio:450000,  activo:true },
];
const formatCOP = n => new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP"}).format(n);
const aplicarDescuento = pct => p => ({ ...p, precio: p.precio*(1-pct/100) });
const formatPrecio = p => ({ ...p, precioFormateado: formatCOP(p.precio) });

const procesarProductos = pipe(
  items => items.filter(p => p.activo),
  items => items.map(aplicarDescuento(15)),
  items => items.map(formatPrecio)
);
console.log(procesarProductos(productos));
