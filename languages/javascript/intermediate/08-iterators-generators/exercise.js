// 08 · Iterators y Generators — exercise.js

// PARTE 1: Iterable custom
// Implementa un objeto "rango" iterable: rango(inicio, fin, paso=1)
// Debe funcionar con for...of, spread, destructuring
function rango(inicio, fin, paso=1) {
  return {
    // TU CÓDIGO AQUÍ — implementa Symbol.iterator
  };
}
for (const n of rango(1,6)) console.log(n);   // 1,2,3,4,5
console.log([...rango(0,10,2)]);               // [0,2,4,6,8]
const [a,b,c] = rango(10,20,5);               // 10,15  (destructuring)


// PARTE 2: Generator infinito
// Escribe un generator fibonacci() que genere la secuencia infinita
// 0, 1, 1, 2, 3, 5, 8, 13, 21...
function* fibonacci() {
  // TU CÓDIGO AQUÍ
}
const fib = fibonacci();
const primeros10 = Array.from({length:10}, () => fib.next().value);
console.log(primeros10); // [0,1,1,2,3,5,8,13,21,34]


// PARTE 3: Generator para paginación lazy
// Escribe function* paginar(items, tamPagina) que yield páginas (arrays)
// paginar([1..10], 3) → [1,2,3], [4,5,6], [7,8,9], [10]
function* paginar(items, tamPagina) {
  // TU CÓDIGO AQUÍ
}
const nums = Array.from({length:10}, (_,i)=>i+1);
for (const pagina of paginar(nums, 3)) console.log(pagina);


// PARTE 4: Máquina de estado con generator
// Implementa un semáforo cíclico: rojo → verde → amarillo → rojo → ...
// Con tiempos: rojo=3s, verde=2s, amarillo=1s (simulados como números)
function* semaforo() {
  // TU CÓDIGO AQUÍ
}
const luz = semaforo();
for (let i=0; i<6; i++) console.log(luz.next().value);


// PARTE 5: yield* para componer generators
// Escribe function* flatten(arr) que aplane arrays anidados arbitrariamente
// Usando yield* de forma recursiva
function* flatten(arr) {
  // TU CÓDIGO AQUÍ
}
console.log([...flatten([1,[2,[3,[4]],5],6])]); // [1,2,3,4,5,6]


// BONUS
// Escribe tomar(iterable, n) que retorna los primeros n valores de cualquier iterable
// Debe funcionar con arrays, strings, generators, rangos, etc.
function tomar(iterable, n) {
  // TU CÓDIGO AQUÍ
}
