# 06 · Funciones

## Formas de declarar una función

### Declaración (function declaration)
Se hoistea completa — puedes llamarla antes de declararla.
```js
function saludar(nombre) {
  return `Hola, ${nombre}`;
}
```

### Expresión (function expression)
No se hoistea. La función se asigna a una variable.
```js
const saludar = function(nombre) {
  return `Hola, ${nombre}`;
};
```

### Arrow function
Sintaxis compacta. No tiene su propio `this`. Ideal para callbacks.
```js
const saludar = (nombre) => `Hola, ${nombre}`;
// Si hay un solo parámetro, los paréntesis son opcionales
// Si el body es una sola expresión, las llaves y return son opcionales
```

---

## Parámetros

### Valor por defecto
```js
function greet(name = "mundo") {
  return `Hola, ${name}`;
}
greet();        // "Hola, mundo"
greet("Ana");   // "Hola, Ana"
```

### Rest parameters (...args)
Captura todos los argumentos extras como array.
```js
function suma(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
suma(1, 2, 3, 4); // 10
```

### Destructuring en parámetros
```js
function mostrar({ nombre, edad }) {
  console.log(`${nombre} tiene ${edad} años`);
}
mostrar({ nombre: "Ana", edad: 28 });
```

---

## Return
Toda función devuelve algo. Si no hay `return`, devuelve `undefined`.
Un `return` sin valor también devuelve `undefined`.

---

## Funciones como valores (first-class functions)
En JS las funciones son ciudadanos de primera clase:
se pueden pasar como argumento, retornar desde otra función, asignar a variables.

```js
// Pasar como argumento (callback)
[1, 2, 3].map(n => n * 2);

// Retornar desde otra función (higher-order function)
function multiplicador(factor) {
  return (n) => n * factor;
}
const doble = multiplicador(2);
doble(5); // 10
```

---

## Referencias
- MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions
