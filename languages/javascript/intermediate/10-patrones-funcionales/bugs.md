# 10 · Patrones Funcionales — Bugs

## Bug 1: Función "pura" que muta el argumento
```js
const ordenar = (arr) => arr.sort(); // IMPURA — muta el argumento
const ordenarPuro = (arr) => [...arr].sort(); // pura — copia primero
```

## Bug 2: Curry con funciones variádicas (sin .length definido)
```js
const fn = (...args) => args.reduce((a,b)=>a+b, 0);
fn.length; // 0 — el curry automático no funciona con rest params
// Solución: pasar la aridad explícitamente o usar otra estrategia
```

## Bug 3: pipe/compose con funciones async
```js
// pipe síncrono no funciona con async
const pipeline = pipe(paso1, paso2Async, paso3);
// Necesitas una versión async de pipe:
const pipeAsync = (...fns) => x => fns.reduce((p, f) => p.then(f), Promise.resolve(x));
```

## Bug 4: Maybe.map con funciones que lanzan errores
El Maybe básico no captura excepciones dentro del map.
Para eso existe el tipo Either/Result que separa éxito de error.

## Notas personales
