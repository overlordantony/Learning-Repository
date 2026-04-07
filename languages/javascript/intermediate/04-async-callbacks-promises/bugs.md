# 04 · Async: Callbacks y Promises — Bugs

## Bug 1: Olvidar retornar la promise en .then()
```js
fetch("/api/users")
  .then(res => { res.json(); })  // sin return — la cadena recibe undefined
  .then(data => console.log(data)); // undefined

// Correcto:
  .then(res => res.json())  // return implícito con arrow sin llaves
  .then(res => { return res.json(); }) // return explícito
```

## Bug 2: Promise no capturada
```js
Promise.reject(new Error("fallo")); // UnhandledPromiseRejection en Node
// Siempre agregar .catch() al final de la cadena
```

## Bug 3: Crear promises innecesarias (promise constructor anti-pattern)
```js
// MAL
function getData() {
  return new Promise((resolve) => {
    fetch("/api").then(res => resolve(res)); // envolver una promise en otra
  });
}
// BIEN — fetch ya retorna una promise
function getData() { return fetch("/api"); }
```

## Bug 4: Callback hell que esconde errores
```js
fs.readFile("a", (err, a) => {
  // si olvidas manejar err aquí y sigues adelante → bugs silenciosos
  fs.readFile("b", (err, b) => { ... });
});
```

## Notas personales
