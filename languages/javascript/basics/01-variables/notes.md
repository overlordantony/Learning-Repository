# 01 · Variables

## ¿Qué es una variable?
Una variable es un espacio con nombre para guardar un valor en memoria.
En JS hay tres formas de declararlas y cada una se comporta diferente.

---

## `var` — la vieja guardia (evitar en código moderno)
- Tiene **function scope**: existe dentro de toda la función donde se declara.
- Sufre **hoisting**: la declaración sube al tope del scope en tiempo de compilación,
  pero la asignación no. Esto genera bugs difíciles de rastrear.
- Se puede redeclarar sin error, lo que lleva a sobreescrituras accidentales.

```js
console.log(x); // undefined (no error, pero tampoco el valor esperado)
var x = 5;
```

---

## `let` — el reemplazo moderno de var
- Tiene **block scope**: solo existe dentro del bloque `{}` donde se declara.
- También hace hoisting pero entra en la **Temporal Dead Zone (TDZ)**:
  accederla antes de declararla lanza un ReferenceError.
- No se puede redeclarar en el mismo scope.

```js
{
  let nombre = "Ana";
  console.log(nombre); // "Ana"
}
console.log(nombre); // ReferenceError
```

---

## `const` — para valores que no cambian de referencia
- Mismo block scope que `let`.
- No se puede reasignar (la referencia es constante).
- OJO: si el valor es un objeto o array, su contenido sí se puede mutar.

```js
const PI = 3.14159;
PI = 3; // TypeError

const user = { name: "Ana" };
user.name = "Luis"; // Esto SÍ funciona — mutas el objeto, no la referencia
```

---

## Regla práctica
> Usa `const` por defecto.  
> Usa `let` solo cuando necesites reasignar.  
> Nunca uses `var` en código nuevo.

---

## Hoisting explicado visualmente
El motor de JS procesa el código en dos fases:
1. **Compilación**: recorre el código y registra todas las declaraciones.
2. **Ejecución**: corre el código línea por línea.

En la fase de compilación, `var` se registra e inicializa como `undefined`.
`let` y `const` se registran pero NO se inicializan → TDZ hasta su línea.

---

## Referencias
- MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/let
- MDN: https://developer.mozilla.org/es/docs/Glossary/Hoisting
