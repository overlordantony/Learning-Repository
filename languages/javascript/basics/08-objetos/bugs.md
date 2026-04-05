# 08 · Objetos — Bugs & Errores comunes

## Bug 1: Referencia vs copia
```js
const a = { x: 1 };
const b = a;       // b apunta al mismo objeto
b.x = 99;
console.log(a.x);  // 99 — se modificó el original
// Solución: const b = { ...a };
```

## Bug 2: Spread es shallow (copia superficial)
```js
const a = { datos: { valor: 1 } };
const b = { ...a };
b.datos.valor = 99;
console.log(a.datos.valor); // 99 — el objeto anidado sigue siendo referencia
// Para copia profunda: structuredClone(a) o JSON.parse(JSON.stringify(a))
```

## Bug 3: Acceder a propiedad de null/undefined
```js
const user = null;
user.nombre; // TypeError
user?.nombre; // undefined — safe
```

## Notas personales
