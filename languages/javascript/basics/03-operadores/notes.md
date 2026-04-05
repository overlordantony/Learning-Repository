# 03 · Operadores

## Aritméticos
```js
+   // suma (o concatenación con strings)
-   // resta
*   // multiplicación
/   // división
%   // módulo (resto de la división)
**  // exponenciación
++  // incremento (prefijo vs postfijo)
--  // decremento
```

### Prefijo vs postfijo
```js
let a = 5;
console.log(a++); // 5  — devuelve ANTES de incrementar
console.log(a);   // 6

let b = 5;
console.log(++b); // 6  — incrementa PRIMERO, luego devuelve
```

## Comparación
Usar siempre `===` y `!==`. El `==` aplica coerción y genera bugs.

## Lógicos y cortocircuito
```js
// && devuelve el primer falsy o el último valor
false && "hola"   // false
"mundo" && "hola" // "hola"

// || devuelve el primer truthy o el último valor
null || "default"    // "default"
0 || "default"       // "default" ← 0 es falsy

// ?? solo activa con null/undefined (no con 0, "", false)
0 ?? "default"       // 0   ← diferencia clave con ||
null ?? "default"    // "default"
```

## Ternario
```js
condición ? valorSiTrue : valorSiFalse
const acceso = edad >= 18 ? "permitido" : "denegado";
```

## Valores falsy
`false`, `0`, `""`, `null`, `undefined`, `NaN`
Todo lo demás es truthy — incluyendo `[]`, `{}`, `"0"`, `-1`.

## Referencias
- MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators
