// 06 · Funciones — exercise.js

// ── PARTE 1: Declaración vs expresión vs arrow ────
// Escribe la misma función de tres formas: recibe dos números, retorna su suma
// 1. Declaración
function sumarDeclaracion(a, b) {
  return a + b;  
}

// 2. Expresión
const sumarExpresion = function(a, b) {
  return a + b;
};

// 3. Arrow function
const sumarArrow = (a, b) => {
  return a + b;
};

console.log(sumarDeclaracion(2, 3));   // 5
console.log(sumarExpresion(2, 3));     // 5
console.log(sumarArrow(2, 3));         // 5


// ── PARTE 2: Parámetros por defecto ──────────────
// Escribe crearUsuario(nombre, rol = "viewer", activo = true)
// que retorne un objeto con esas propiedades
function crearUsuario(nombre, rol = "viewer", activo = true) {
  return { nombre, rol, activo };
}
console.log(crearUsuario("Ana"));                    // { nombre: "Ana", rol: "viewer", activo: true }
console.log(crearUsuario("Luis", "admin", false));   // { nombre: "Luis", rol: "admin", activo: false }


// ── PARTE 3: Rest parameters ──────────────────────
// Escribe una función promedio(...nums) que calcule el promedio de N números
function promedio(...nums) {
  const suma = nums.reduce((acc, num) => acc + num, 0);
  return suma / nums.length;
}
console.log(promedio(10, 20, 30));      // 20
console.log(promedio(5, 10));           // 7.5


// ── PARTE 4: Higher-order functions ──────────────
// Escribe una función aplicar(fn, valor) que aplique fn a valor
// Luego crea funciones: duplicar, cuadrado, alMayus
// y prueba aplicar con cada una
function aplicar(fn, valor) {
  return fn(valor);
}

const duplicar = x => x * 2;
const cuadrado = x => x * x;
const alMayus = str => str.toUpperCase();

console.log(aplicar(duplicar, 5));      // 10
console.log(aplicar(cuadrado, 4));      // 16
console.log(aplicar(alMayus, "hola"));   // "HOLA"


// ── PARTE 5: Retornar funciones ───────────────────
// Escribe multiplicador(factor) que retorne una función
// Crea: doble, triple, decuple
function multiplicador(factor) {
  return function(num) {
    return num * factor;
  };
}

const doble = multiplicador(2);
const triple = multiplicador(3);
const decuple = multiplicador(10);

console.log(doble(5));      // 10
console.log(triple(5));    // 15
console.log(decuple(5));   // 50


// ── BONUS ─────────────────────────────────────────
// ¿Cuál es la diferencia entre una arrow function y una function declaration
// respecto a `this`? Escribe tu respuesta como comentario.
// Las arrow functions no tienen su propio `this`, sino que heredan el `this` del contexto en el que fueron definidas. 
// En cambio, las function declarations tienen su propio `this` que se determina por cómo se llaman.
