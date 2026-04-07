# 02 · Objetos Avanzados — Bugs

## Bug 1: freeze es shallow
```js
const obj = Object.freeze({ datos: { x: 1 } });
obj.datos.x = 99; // funciona — el objeto anidado NO está congelado
// Para freeze profundo: función recursiva o structuredClone + freeze
```

## Bug 2: getter sin setter lanza en strict mode
```js
"use strict";
const obj = { get val() { return 42; } };
obj.val = 99; // TypeError en strict, silencioso en sloppy
```

## Bug 3: Object.create(null) no tiene métodos de Object
```js
const obj = Object.create(null);
obj.toString(); // TypeError — no hereda de Object.prototype
// Útil para diccionarios puros, pero hay que tenerlo en cuenta
```

## Notas personales
