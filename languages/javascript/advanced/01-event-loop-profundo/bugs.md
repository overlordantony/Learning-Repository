# 01 · Event Loop Profundo — Bugs

## Bug 1: setTimeout(fn,0) no es 0ms
El mínimo real en browsers es ~4ms (más con anidación).
Siempre corre DESPUÉS de todas las microtasks pendientes.

## Bug 2: Microtasks recursivas inadvertidas
```js
async function poll() {
  await fetchStatus();
  poll(); // sin await → Promise flotante, puede generar microtask leak
}
// Usar setTimeout para polling controlado
```

## Bug 3: await en loop cuando las promesas son independientes
```js
for (const fn of fns) await fn(); // secuencial — O(n*t)
await Promise.all(fns.map(f=>f())); // paralelo — O(t)
```

## Notas personales
