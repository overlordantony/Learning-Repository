// ─────────────────────────────────────────
// 02 · Tipos de datos — exercise.js
// ─────────────────────────────────────────

// ── PARTE 1: typeof ───────────────────────
// Usa typeof en cada uno de estos valores y predice el resultado ANTES de correrlo:
// "hola", 42, true, null, undefined, [], {}, function(){}

let valores = ["hola", 42, true, null, undefined, [], {}, function(){}];
valores.forEach(valor => {
  console.log(`typeof ${JSON.stringify(valor)}: ${typeof valor}`);
});

// ── PARTE 2: Coerción implícita ───────────
// Predice el resultado de cada operación y luego verifícalo:
// "5" + 3
// "5" - 3
// true + true
// false + 1
// null + 5
// undefined + 5
// "3" * "4"

let operaciones = [
  '"5" + 3',
  '"5" - 3',
  'true + true',
  'false + 1',
  'null + 5',
  'undefined + 5',
  '"3" * "4"'
];

operaciones.forEach(op => {
  console.log(`${op} = ${eval(op)}`);
});


// ── PARTE 3: == vs === ────────────────────
// Evalúa estas comparaciones con == y con ===
// Anota cuáles sorprenden:
// 0 y false
// "" y false
// null y undefined
// 1 y "1"
// [] y false

let comparaciones = [
  [0, false],
  ["", false],
  [null, undefined],
  [1, "1"],
  [[], false]
];

comparaciones.forEach(([a, b]) => {
  console.log(`${JSON.stringify(a)} == ${JSON.stringify(b)}: ${a == b}`);
  console.log(`${JSON.stringify(a)} === ${JSON.stringify(b)}: ${a === b}`);
});


// ── PARTE 4: NaN ──────────────────────────
// ¿Qué devuelve NaN === NaN?
// ¿Cuál es la forma correcta de detectar NaN?
// Prueba isNaN() vs Number.isNaN() con estos valores: NaN, "hola", 0, undefined

console.log(`NaN === NaN: ${NaN === NaN}`);

let valoresNaN = [NaN, "hola", 0, undefined];
valoresNaN.forEach(valor => {
  console.log(`isNaN(${JSON.stringify(valor)}): ${isNaN(valor)}`);
  console.log(`Number.isNaN(${JSON.stringify(valor)}): ${Number.isNaN(valor)}`);
});


// ── PARTE 5: Distinguir tipos ─────────────
// Escribe una función tipoDetallado(valor) que retorne:
// "array", "null", "objeto", "función", o el typeof para el resto.
// Pista: typeof no es suficiente para todos los casos.

function tipoDetallado(valor) {
  if (Array.isArray(valor)) {
    return "array";
  } else if (valor === null) {
    return "null";
  } else if (typeof valor === "function") {
    return "función";
  } else if (typeof valor === "object") {
    return "objeto";
  } else {
    return typeof valor;
  }
}

console.log(tipoDetallado([]));         // "array"
console.log(tipoDetallado(null));       // "null"
console.log(tipoDetallado({}));         // "objeto"
console.log(tipoDetallado(function(){})); // "función"
console.log(tipoDetallado(42));         // "number"
console.log(tipoDetallado("hola"));     // "string"
