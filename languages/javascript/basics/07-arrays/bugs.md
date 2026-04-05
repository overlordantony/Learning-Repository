# 07 · Arrays — Bugs & Errores comunes

## Bug 1: sort() con números
```js
[10, 9, 100].sort()              // [10, 100, 9] — ordena como strings
[10, 9, 100].sort((a,b) => a-b)  // [9, 10, 100] — correcto
```

## Bug 2: Mutar el array original sin querer
```js
const copia = arr; // NO es una copia, apunta al mismo array
arr.push(99);      // también modifica "copia"
// Solución:
const copia = [...arr];     // spread
const copia = arr.slice();  // slice sin args
```

## Bug 3: forEach no retorna nada
```js
const dobles = arr.forEach(n => n * 2); // undefined
// Usar map para transformar:
const dobles = arr.map(n => n * 2);
```

## Notas personales
