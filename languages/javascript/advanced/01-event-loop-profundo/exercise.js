// 01 · Event Loop Profundo — exercise.js

// PARTE 1: Predicción — escribe el orden antes de correr
console.log("A");
setTimeout(() => console.log("B"), 0);
setTimeout(() => console.log("C"), 0);
Promise.resolve().then(() => {
  console.log("D");
  Promise.resolve().then(() => console.log("E"));
});
queueMicrotask(() => console.log("F"));
console.log("G");
// Orden esperado: ??? (escríbelo aquí)


// PARTE 2: Microtask starvation — ¿por qué no llega el setTimeout?
// Corrígelo para que "¿Llego?" se imprima.
let c = 0;
function starve() { if (c++ < 5) Promise.resolve().then(starve); }
starve();
setTimeout(() => console.log("¿Llego?"), 0);


// PARTE 3: Scheduler manual
// procesarEnLotes(items, fn, tamLote) procesa en lotes cediendo el thread entre cada uno
async function procesarEnLotes(items, fn, tamLote=50) {
  // TU CÓDIGO AQUÍ
}
const mil = Array.from({length:1000},(_,i)=>i);
procesarEnLotes(mil, n=>n*2, 100).then(r => console.log(`Procesados: ${r.length}`));


// PARTE 4: Medir delay real de setTimeout(fn,0) — promedio de 50 mediciones
async function medirDelay() {
  // TU CÓDIGO AQUÍ
}
medirDelay().then(avg => console.log(`Delay promedio: ${avg.toFixed(2)}ms`));


// BONUS: Promise.all por lotes para no saturar con 1000 promesas simultáneas
async function promiseAllPorLotes(fns, tamLote=5) {
  // TU CÓDIGO AQUÍ
}
