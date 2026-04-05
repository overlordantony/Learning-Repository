// ─────────────────────────────────────────
// 03 · Operadores — exercise.js
// ─────────────────────────────────────────

// ── PARTE 1: Aritméticos ──────────────────
// Predice y verifica: 17 % 5, 2 ** 8
// ¿Cuál es la diferencia entre ++a y a++ cuando a = 10?

let a = 10;
console.log(`17 % 5 = ${17 % 5}`);
console.log(`2 ** 8 = ${2 ** 8}`);
console.log(`++a = ${++a} (a ahora es ${a})`);
a = 10; // reset a
console.log(`a++ = ${a++} (a ahora es ${a})`);



// ── PARTE 2: Cortocircuito ────────────────
// Predice antes de correr:
// false && console.log("¿se imprime?")
// null || "valor por defecto"
// 0 || "valor por defecto"
// 0 ?? "valor por defecto"

if (false && console.log("¿se imprime?")) {
  // No se ejecuta el console.log porque el primer operando es false
}

console.log(null || "valor por defecto"); // Imprime "valor por defecto" porque null es falsy
console.log(0 || "valor por defecto");    // Imprime "valor por defecto" porque 0 es falsy
console.log(0 ?? "valor por defecto");    // Imprime 0 porque ?? solo considera null y undefined como valores nulos


// ── PARTE 3: Ternario ─────────────────────
// Convierte a ternario:
// if (stock > 0) { msg = "disponible" } else { msg = "agotado" }

let stock = 5;
let msg = stock > 0 ? "disponible" : "agotado";
console.log(`El producto está ${msg}.`);


// ── PARTE 4: Falsy/Truthy ─────────────────
// Escribe esFalsy(val) en una línea
const esFalsy = (val) => !val;
// Prueba con: 0, "", null, undefined, NaN, false, [], {}, "0", -1
console.log(esFalsy(0));          // true
console.log(esFalsy(""));         // true
console.log(esFalsy(null));       // true
console.log(esFalsy(undefined));  // true
console.log(esFalsy(NaN));        // true
console.log(esFalsy(false));      // true
console.log(esFalsy([]));         // false (array vacío es truthy)
console.log(esFalsy({}));         // false (objeto vacío es truthy)
console.log(esFalsy("0"));        // false (cadena no vacía es truthy)
console.log(esFalsy(-1));         // false (número distinto de 0 es truthy)


// ── PARTE 5: Operadores de asignación ─────
// Parte de x = 100, aplica: -30, *2, /5, **2 usando solo +=,-=,*=,/=,**=

let x = 100;
x -= 30; // x ahora es 70
x *= 2;  // x ahora es 140
x /= 5;  // x ahora es 28
x **= 2; // x ahora es 784

console.log(`El valor final de x es ${x}.`);


// ── BONUS ─────────────────────────────────
// Escribe un ejemplo donde || y ?? se comporten diferente con el mismo input.
let valor = 0;
console.log(`Usando ||: ${valor || "valor por defecto"}`); // Imprime "valor por defecto" porque 0 es falsy
console.log(`Usando ??: ${valor ?? "valor por defecto"}`); // Imprime 0 porque ?? solo considera null y undefined como valores nulos

