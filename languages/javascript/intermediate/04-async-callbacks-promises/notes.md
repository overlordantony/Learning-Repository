# 04 · Async: Callbacks y Promises

## El Event Loop
JS es single-threaded pero maneja asincronía con el event loop.
- **Call stack**: ejecuta código síncrono
- **Web APIs / Node APIs**: manejan timers, fetch, I/O
- **Task queue (macrotasks)**: setTimeout, setInterval
- **Microtask queue**: Promises, queueMicrotask — se vacía ANTES de la siguiente macrotask

```js
console.log("1");
setTimeout(() => console.log("3"), 0);
Promise.resolve().then(() => console.log("2"));
// Output: 1, 2, 3  ← Promise (microtask) antes que setTimeout (macrotask)
```

## Callbacks
El patrón más antiguo. Pasa una función que se llama cuando algo termina.
```js
fs.readFile("archivo.txt", (err, data) => {
  if (err) return handleError(err);
  process(data);
});
```
**Callback hell**: callbacks anidados que se vuelven ilegibles.

## Promises
Objeto que representa un valor eventual: pending → fulfilled | rejected.
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("datos"), 1000);
});
p.then(datos => console.log(datos))
 .catch(err => console.error(err))
 .finally(() => console.log("terminó"));
```

### Promisificar un callback
```js
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));
```

## Métodos estáticos de Promise

```js
// Espera todas — falla si UNA falla
Promise.all([p1, p2, p3]).then(([r1,r2,r3]) => ...);

// Espera todas — nunca falla, retorna [{status, value/reason}]
Promise.allSettled([p1, p2, p3]).then(results => ...);

// La primera en resolver (fulfilled)
Promise.race([p1, p2]).then(primero => ...);

// La primera en resolver (fulfilled) — ignora rechazadas
Promise.any([p1, p2, p3]).then(primero => ...);
```

## Encadenar .then()
```js
fetch("/api/user")
  .then(res => res.json())          // transforma
  .then(user => fetch(`/api/posts/${user.id}`)) // nueva promesa
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err)); // captura cualquier error de la cadena
```

## Referencias
- MDN Promise: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise
- MDN Event Loop: https://developer.mozilla.org/es/docs/Web/JavaScript/Event_loop
