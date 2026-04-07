// 01 · Event Loop Profundo — solution.js

// PARTE 1: Orden → A, G, D, F, E, B, C
// A,G: síncronos; D: primera microtask; F: queueMicrotask (encolada igual que D);
// E: microtask generada dentro de D; B,C: macrotasks (en orden de registro)
// Nota: F se encola después de D pero antes de que D corra, entonces D corre primero.
// La secuencia real: A G D F E B C

// PARTE 2: fix — usar setTimeout en vez de Promise para romper el ciclo
let cc = 0;
function starveFixed() { if (cc++ < 5) setTimeout(starveFixed, 0); }
starveFixed();
setTimeout(() => console.log("Ahora sí llego"), 0);

// PARTE 3
async function procesarEnLotes(items, fn, tamLote=50) {
  const resultado = [];
  const ceder = () => new Promise(r => setTimeout(r, 0));
  for (let i=0; i<items.length; i+=tamLote) {
    resultado.push(...items.slice(i,i+tamLote).map(fn));
    await ceder();
  }
  return resultado;
}

// PARTE 4
async function medirDelay() {
  const mediciones = [];
  for (let i=0; i<50; i++) {
    const t0 = performance.now();
    await new Promise(r => setTimeout(r, 0));
    mediciones.push(performance.now() - t0);
  }
  return mediciones.reduce((a,b)=>a+b,0) / mediciones.length;
}

// BONUS
async function promiseAllPorLotes(fns, tamLote=5) {
  const resultados = [];
  for (let i=0; i<fns.length; i+=tamLote) {
    const parciales = await Promise.all(fns.slice(i,i+tamLote).map(fn=>fn()));
    resultados.push(...parciales);
  }
  return resultados;
}
