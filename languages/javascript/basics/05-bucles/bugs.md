# 05 · Bucles — Bugs & Errores comunes

## Bug 1: Bucle infinito
```js
let i = 0;
while (i < 5) { console.log(i); } // olvidan i++ → infinito
```

## Bug 2: for...in en arrays
```js
const arr = [10, 20, 30];
for (const i in arr) console.log(i); // "0", "1", "2" — te da índices, no valores
// Usar for...of para valores
```

## Bug 3: Modificar array mientras se itera
Modificar la longitud del array dentro de un for clásico puede saltar o repetir elementos.
Preferir iterar sobre una copia o usar métodos funcionales (map, filter).

## Notas personales
