# 02 · Tipos de datos

## Tipos primitivos en JS
JS tiene 7 tipos primitivos. Son inmutables — cuando los "modificas", creas un valor nuevo.

| Tipo | Ejemplo | typeof |
|------|---------|--------|
| `string` | `"hola"` | `"string"` |
| `number` | `42`, `3.14`, `NaN`, `Infinity` | `"number"` |
| `bigint` | `9007199254740991n` | `"bigint"` |
| `boolean` | `true`, `false` | `"boolean"` |
| `undefined` | variable declarada sin valor | `"undefined"` |
| `null` | ausencia intencional de valor | `"object"` ← bug histórico de JS |
| `symbol` | identificador único | `"symbol"` |

Y un tipo complejo:
- `object` (incluye arrays, funciones, objetos literales)

---

## `typeof` — inspector de tipos
```js
typeof "hola"        // "string"
typeof 42            // "number"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object"  ← TRAMPA CLÁSICA
typeof []            // "object"  ← los arrays también son "object"
typeof function(){}  // "function"
```

Para distinguir array de objeto:
```js
Array.isArray([])   // true
Array.isArray({})   // false
```

---

## Coerción de tipos (type coercion)
JS convierte tipos automáticamente. Esto es fuente de bugs famosos.

### Coerción implícita
```js
"5" + 3     // "53"  — el + con string concatena
"5" - 3     // 2     — el - fuerza conversión a número
true + 1    // 2     — true es 1
false + 1   // 1     — false es 0
null + 1    // 1     — null es 0
undefined + 1 // NaN
```

### Comparación con == vs ===
`==` permite coerción. `===` compara valor Y tipo (usar siempre este).
```js
0 == false    // true  ← coerción
0 === false   // false ← sin coerción
"" == false   // true
null == undefined  // true
null === undefined // false
```

---

## NaN — el tipo más confuso
`NaN` significa "Not a Number" pero `typeof NaN === "number"`. 
Además, `NaN !== NaN` — es el único valor en JS que no es igual a sí mismo.

```js
isNaN("hola")   // true
Number.isNaN("hola")  // false ← más preciso, solo true si ES NaN
```

---

## Referencias
- MDN tipos: https://developer.mozilla.org/es/docs/Web/JavaScript/Data_structures
- MDN coerción: https://developer.mozilla.org/es/docs/Glossary/Type_coercion
