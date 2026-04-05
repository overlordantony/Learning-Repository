# 03 · Operadores — Bugs & Errores comunes

## Bug 1: Postfijo vs prefijo en ++
```js
let a = 5;
let b = a++;  // b = 5, a = 6
let c = ++a;  // c = 7, a = 7
```
El postfijo retorna el valor original. Fuente de bugs en loops y asignaciones.

## Bug 2: || con valores válidos como 0 o ""
```js
function setVol(vol) { return vol || 50; }
setVol(0);  // 50 — BUG: el 0 es un volumen válido
// Solución: usar ?? en vez de ||
```

## Bug 3: Ternarios anidados
Evitar más de un nivel de anidación — se vuelven ilegibles.
Preferir if/else para lógica compleja.

## Notas personales
