# 05 · Concurrencia y Workers — Bugs

## Bug 1: Acceder a DOM desde un Worker
```js
// En el worker:
document.getElementById("btn"); // ReferenceError — DOM no existe en Workers
// Los workers solo tienen acceso a: fetch, setTimeout, IndexedDB, postMessage, etc.
```

## Bug 2: Funciones no serializables con postMessage
postMessage usa el structured clone algorithm.
No puede clonar: funciones, DOM nodes, clases personalizadas con métodos.
Solo transfiere: objetos planos, arrays, primitivos, ArrayBuffers, etc.

## Bug 3: Olvidar terminate() → Worker leak
Los workers siguen corriendo aunque no haya referencias a ellos en el main thread.
Siempre llamar worker.terminate() cuando ya no se necesite.

## Bug 4: Race condition en SharedArrayBuffer sin Atomics
```js
// MAL — no atómico
view[0] = view[0] + 1; // lectura y escritura no son una operación
// BIEN
Atomics.add(view, 0, 1); // operación atómica indivisible
```

## Notas personales
