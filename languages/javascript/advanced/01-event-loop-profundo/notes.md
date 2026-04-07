# 01 · Event Loop Profundo

## El modelo completo
```
Call Stack → Microtask Queue → (render) → Macrotask Queue → repeat
```

- **Microtasks**: Promise callbacks, queueMicrotask, MutationObserver
  → Se vacían COMPLETAMENTE antes de cada macrotask/render
- **Macrotasks**: setTimeout, setInterval, I/O, UI events
  → Solo UNO por vuelta del loop

## Orden garantizado
1. Código síncrono (call stack hasta vaciarse)
2. Todas las microtasks (incluyendo las nuevas generadas durante el vaciado)
3. Render (browser)
4. Un macrotask
5. Vuelve al paso 2

## Microtask starvation
Si generas microtasks infinitamente, las macrotasks nunca corren.
```js
function starve() { Promise.resolve().then(starve); }
starve();
setTimeout(() => console.log("nunca"), 0); // bloqueado
```

## Ejemplo canónico
```js
console.log("1");          // sync
setTimeout(() => console.log("6"), 0);   // macrotask
Promise.resolve()
  .then(() => {
    console.log("3");      // microtask 1
    setTimeout(() => console.log("7"), 0); // macrotask 2
    return Promise.resolve();
  })
  .then(() => console.log("4")); // microtask 2
queueMicrotask(() => console.log("5")); // microtask 3
console.log("2");          // sync
// Output: 1,2,3,4,5,6,7
```

## Referencias
- Jake Archibald: https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
