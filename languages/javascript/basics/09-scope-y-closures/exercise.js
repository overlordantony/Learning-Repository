// 09 · Scope y Closures — exercise.js

// ── PARTE 1: Scope chain ──────────────────
// Predice qué imprime cada console.log y por qué
const x = "global";

function nivel1() {
  const x = "nivel1";

  function nivel2() {
    const x = "nivel2";
    console.log(x); // ¿qué imprime? nivel2
  }

  function nivel3() {
    console.log(x); // ¿qué imprime? nivel1
  }

  nivel2();
  nivel3();
}

nivel1();
console.log(x); // ¿qué imprime? global

// ── PARTE 2: Closure básico ───────────────
// Escribe crearContador() que retorne un objeto con tres métodos:
// incrementar(), decrementar(), valor()
// El contador interno no debe ser accesible desde afuera
function crearContador(valorInicial = 0) {
  let count = valorInicial;
  return {
    incrementar: () => { count++; },
    decrementar: () => { count--; },
    valor: () => count
  };
}

const c = crearContador(10);
c.incrementar();
c.incrementar();
c.decrementar();
console.log(c.valor()); // 11


// ── PARTE 3: Closure en bucle ─────────────
// ¿Por qué este código no hace lo esperado? Corrígelo.
const funciones = [];
for (var i = 0; i < 5; i++) {
  funciones.push(function() { return i; });
}
console.log(funciones[0]()); // ¿qué imprime? ¿qué debería imprimir? 5
console.log(funciones[3]()); // ¿qué imprime? ¿qué debería imprimir? 5

// Versión corregida:
const funcionesFixed = [];
for (let i = 0; i < 5; i++) { // let crea un nuevo binding por iteración
  funcionesFixed.push(function() { return i; });
}
console.log(funcionesFixed[0]()); // 0
console.log(funcionesFixed[3]()); // 3

// ── PARTE 4: Factory function ─────────────
// Escribe crearSaludo(idioma) que retorne una función saludar(nombre)
// Soporta: "es" → "Hola", "en" → "Hello", "fr" → "Bonjour"
function crearSaludo(idioma) {
  const saludos = { es: "Hola", en: "Hello", fr: "Bonjour" };
  const prefijo = saludos[idioma] ?? "Hola";
  return (nombre) => `${prefijo}, ${nombre}`;
}

const saludarEs = crearSaludo("es");
const saludarEn = crearSaludo("en");
console.log(saludarEs("Ana"));  // "Hola, Ana"
console.log(saludarEn("Ana"));  // "Hello, Ana"


// ── PARTE 5: Memoización ──────────────────
// Implementa memoize(fn) usando closure para cachear resultados
function memoize(fn) {
  const cache = {};
  return function(arg) {
    if (arg in cache) {
      console.log(`(cache) ${arg}`);
      return cache[arg];
    }
    cache[arg] = fn(arg);
    return cache[arg];
  };
}

const factorialLento = (n) => n <= 1 ? 1 : n * factorialLento(n - 1);
const factorial = memoize(factorialLento);
console.log(factorial(5));  // 120
console.log(factorial(5));  // 120 (desde cache)


// ── BONUS ─────────────────────────────────
// ¿Qué es una IIFE y para qué sirve?
// Escribe una que inicialice una variable "app" con configuración inicial
// sin contaminar el scope global.
const app = (function() {
  const version = "1.0.0";
  const env = "development";
  return { version, env, debug: env === "development" };
})();
console.log(app.version); // "1.0.0"
// version no existe en el scope global
