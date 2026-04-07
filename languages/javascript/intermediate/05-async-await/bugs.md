# 05 · Async/Await — Bugs

## Bug 1: await en loop secuencial no intencional
```js
for (const id of ids) {
  const dato = await fetch(id); // espera cada uno — O(n * tiempo)
}
// Si las llamadas son independientes, usar Promise.all
```

## Bug 2: Olvidar await y obtener una Promise en vez del valor
```js
async function getUser() { return simAPI({ nombre:"Ana" }); }
const user = getUser(); // Promise, no el objeto
const user = await getUser(); // correcto
```

## Bug 3: try/catch no captura errores en callbacks internos
```js
async function ejemplo() {
  try {
    setTimeout(() => { throw new Error("no me capturas"); }, 100);
  } catch(e) { /* nunca llega aquí */ }
}
```

## Bug 4: Async en forEach no hace lo que parece
```js
ids.forEach(async (id) => {
  await fetch(id); // forEach no espera las promesas internas
});
// Usar: await Promise.all(ids.map(async id => await fetch(id)))
```

## Notas personales
