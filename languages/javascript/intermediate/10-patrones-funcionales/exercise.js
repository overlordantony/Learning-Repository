// 10 · Patrones Funcionales — exercise.js

// PARTE 1: Funciones puras vs impuras
// Identifica cuáles son puras e impuras. Reescribe las impuras como puras.
let total = 0;
const agregarAlTotal = (n) => { total += n; return total; }; // ¿pura?

const obtenerFecha = () => new Date().toISOString(); // ¿pura?

const calcularIVA = (precio, tasa = 0.19) => precio * tasa; // ¿pura?

// Reescribe agregarAlTotal como pura:
// TU CÓDIGO AQUÍ


// PARTE 2: pipe y compose
// Implementa pipe(...fns) y compose(...fns)
const pipe = (...fns) => /* TU CÓDIGO AQUÍ */;
const compose = (...fns) => /* TU CÓDIGO AQUÍ */;

// Úsalos para crear un pipeline que:
// 1. Recibe un string con espacios extra y mayúsculas mezcladas
// 2. Hace trim
// 3. Convierte a minúsculas
// 4. Reemplaza espacios por guiones
// 5. Agrega prefijo "slug:"
const toSlug = pipe(/* TU CÓDIGO AQUÍ */);
console.log(toSlug("  Hola Mundo  ")); // "slug:hola-mundo"


// PARTE 3: Currying
// Implementa curry(fn) que convierte cualquier función en su versión curried
function curry(fn) {
  // TU CÓDIGO AQUÍ
}

const multiplicar = curry((a, b, c) => a * b * c);
console.log(multiplicar(2)(3)(4));    // 24
console.log(multiplicar(2, 3)(4));    // 24
console.log(multiplicar(2)(3, 4));    // 24
console.log(multiplicar(2, 3, 4));    // 24


// PARTE 4: Partial application
// Implementa partial(fn, ...preArgs)
const partial = (fn, ...preArgs) => /* TU CÓDIGO AQUÍ */;

const formatearMensaje = (nivel, contexto, mensaje) =>
  `[${nivel}][${contexto}] ${mensaje}`;

const logInfo  = partial(formatearMensaje, "INFO");
const logError = partial(formatearMensaje, "ERROR");
const logDBInfo = partial(formatearMensaje, "INFO", "DB");

console.log(logInfo("App", "Iniciando"));          // [INFO][App] Iniciando
console.log(logError("API", "Timeout"));           // [ERROR][API] Timeout
console.log(logDBInfo("Conexión establecida"));    // [INFO][DB] Conexión establecida


// PARTE 5: Maybe functor
// Implementa la clase Maybe con: of(), isNothing(), map(), getOrElse()
// Úsala para hacer un pipeline seguro que no explote con null
class Maybe {
  // TU CÓDIGO AQUÍ
}

const usuario = { nombre: "Ana", direccion: { ciudad: "Cali" } };
const usuarioSinDir = { nombre: "Luis" };

const obtenerCiudad = (u) =>
  Maybe.of(u)
    .map(u => u.direccion)
    .map(d => d.ciudad)
    .map(c => c.toUpperCase())
    .getOrElse("Ciudad desconocida");

console.log(obtenerCiudad(usuario));      // "CALI"
console.log(obtenerCiudad(usuarioSinDir)); // "Ciudad desconocida"
console.log(obtenerCiudad(null));          // "Ciudad desconocida"


// BONUS
// Combina todo: escribe un pipeline funcional que procese un array de productos:
// - filtra los activos
// - aplica 15% de descuento
// - formatea el precio
// Usando pipe, funciones puras y sin mutar el array original
