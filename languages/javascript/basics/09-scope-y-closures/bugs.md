# 09 · Scope y Closures — Bugs & Errores comunes

## Bug 1: var en bucle con closure (el más famoso)
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}
// var no crea un nuevo binding por iteración
// Solución: usar let
```

## Bug 2: Acceder a variable de scope exterior mutada
```js
function externo() {
  let valor = 1;
  function interno() { return valor; }
  valor = 99; // cambia ANTES de que interno() sea llamada
  return interno;
}
externo()(); // 99, no 1 — el closure captura la referencia, no el valor
```

## Bug 3: Memory leak con closures
Si una closure referencia objetos grandes y la closure nunca se libera,
esos objetos tampoco se liberan del heap. Importante en event listeners
que no se remueven.

## Notas personales
