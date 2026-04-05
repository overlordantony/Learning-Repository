# 04 · Condicionales

## if / else if / else
```js
if (condición) {
  // bloque
} else if (otraCondición) {
  // bloque
} else {
  // fallback
}
```

## switch
Útil para múltiples valores exactos de una expresión. Usa `break` o caerá al siguiente caso.
```js
switch (expresión) {
  case valor1:
    // código
    break;
  case valor2:
    // código
    break;
  default:
    // fallback
}
```
### Fall-through intencional
```js
case "sábado":
case "domingo":
  console.log("fin de semana"); // ambos casos llegan aquí
  break;
```

## Nullish coalescing (??) como condicional compacto
```js
const nombre = input ?? "Anónimo"; // si input es null/undefined, usa "Anónimo"
```

## Optional chaining (?.)
Evita errores al acceder propiedades de valores que pueden ser null/undefined.
```js
const ciudad = usuario?.direccion?.ciudad; // undefined en vez de TypeError
```

## Guard clauses — mejor que anidar
En vez de:
```js
if (usuario) {
  if (usuario.activo) {
    if (usuario.rol === "admin") { ... }
  }
}
```
Usa:
```js
if (!usuario) return;
if (!usuario.activo) return;
if (usuario.rol !== "admin") return;
// lógica principal aquí
```

## Referencias
- MDN if: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/if...else
- MDN switch: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/switch
