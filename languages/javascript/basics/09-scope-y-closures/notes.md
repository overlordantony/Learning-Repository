# 09 · Scope y Closures

## ¿Qué es el scope?
El scope (ámbito) define dónde son accesibles las variables.
JS usa **lexical scope**: el scope se determina en tiempo de escritura, no de ejecución.

## Tipos de scope

### Global
Variables declaradas fuera de cualquier función o bloque.
Accesibles desde cualquier parte. Evitar contaminar el scope global.

### Function scope
Variables declaradas dentro de una función. Solo accesibles dentro de ella.
```js
function ejemplo() {
  const local = "solo aquí";
}
console.log(local); // ReferenceError
```

### Block scope (let y const)
Variables declaradas dentro de un bloque `{}`.
```js
if (true) {
  let x = 10;
  const y = 20;
}
console.log(x); // ReferenceError
```

### Module scope
Variables en un módulo ES6 son locales al módulo por defecto.

---

## Scope chain (cadena de scopes)
Cuando JS busca una variable, sube por la cadena de scopes hasta encontrarla o llegar al global.
```js
const global = "soy global";

function externa() {
  const enExterna = "soy de externa";

  function interna() {
    console.log(global);     // encuentra en global
    console.log(enExterna);  // encuentra en externa (scope padre)
  }

  interna();
}
```

---

## Closures
Una closure es una función que **recuerda el scope donde fue creada**,
incluso después de que ese scope ya terminó de ejecutarse.

```js
function contador() {
  let count = 0; // esta variable "vive" gracias al closure

  return function() {
    count++;
    return count;
  };
}

const incrementar = contador();
incrementar(); // 1
incrementar(); // 2
incrementar(); // 3
// count no es accesible desde afuera, pero la función interna lo recuerda
```

### Casos de uso reales
```js
// 1. Encapsulación (datos privados)
function crearCuenta(saldoInicial) {
  let saldo = saldoInicial; // privado
  return {
    depositar: (n) => { saldo += n; },
    retirar: (n) => { if (n <= saldo) saldo -= n; },
    verSaldo: () => saldo
  };
}

// 2. Funciones factory (ya visto en ejercicio 06)
const multiplicador = (factor) => (n) => n * factor;

// 3. Memoización
function memoize(fn) {
  const cache = {};
  return function(arg) {
    if (cache[arg] !== undefined) return cache[arg];
    cache[arg] = fn(arg);
    return cache[arg];
  };
}
```

---

## IIFE (Immediately Invoked Function Expression)
Función que se declara y ejecuta en el mismo lugar.
Usada para crear scope aislado (hoy en día reemplazada en parte por módulos).
```js
(function() {
  const privado = "no contamino el global";
  console.log(privado);
})();
```

---

## Bug clásico: closure en bucle con var
```js
// PROBLEMA
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // imprime 3, 3, 3
}
// SOLUCIÓN
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // imprime 0, 1, 2
}
// let crea un nuevo binding por iteración. var comparte uno solo.
```

---

## Referencias
- MDN Closures: https://developer.mozilla.org/es/docs/Web/JavaScript/Closures
- MDN Scope: https://developer.mozilla.org/es/docs/Glossary/Scope
