# 07 · Arrays

## Creación
```js
const arr = [1, 2, 3];
const arr2 = new Array(3); // [empty × 3] — evitar
```

## Acceso y modificación
```js
arr[0]          // primer elemento
arr[arr.length - 1]  // último elemento
arr[0] = 99     // mutar elemento
```

## Métodos esenciales (los más usados)

### Mutadores (modifican el array original)
```js
arr.push(val)       // agrega al final, retorna nueva longitud
arr.pop()           // elimina del final, retorna el elemento
arr.unshift(val)    // agrega al inicio
arr.shift()         // elimina del inicio
arr.splice(i, n)    // elimina n elementos desde índice i
arr.sort()          // ordena (OJO: ordena como strings por defecto)
arr.reverse()       // invierte
```

### No mutadores (retornan nuevo valor, no tocan el original)
```js
arr.slice(start, end)      // extrae porción
arr.concat(arr2)           // une arrays
arr.indexOf(val)           // primer índice de val (-1 si no existe)
arr.includes(val)          // boolean
arr.find(fn)               // primer elemento que cumple la condición
arr.findIndex(fn)          // índice del primero que cumple
arr.join(sep)              // convierte a string
```

### Métodos funcionales (iteración)
```js
arr.map(fn)        // transforma — retorna nuevo array del mismo tamaño
arr.filter(fn)     // filtra — retorna nuevo array con elementos que pasan
arr.reduce(fn, initial)  // acumula — retorna un solo valor
arr.forEach(fn)    // itera — no retorna nada (solo efectos secundarios)
arr.some(fn)       // true si AL MENOS uno cumple
arr.every(fn)      // true si TODOS cumplen
arr.flat(depth)    // aplana arrays anidados
arr.flatMap(fn)    // map + flat en uno
```

## Spread operator
```js
const copia = [...arr];
const unido = [...arr1, ...arr2];
const [primero, ...resto] = arr; // destructuring con rest
```

## Destructuring
```js
const [a, b, c] = [1, 2, 3];
const [x, , z] = [1, 2, 3]; // saltar elementos con coma
```

## sort() con comparador
```js
// Por defecto ordena como strings — bug común con números
[10, 9, 100].sort()             // [10, 100, 9] — INCORRECTO
[10, 9, 100].sort((a, b) => a - b) // [9, 10, 100] — CORRECTO
```

## Referencias
- MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array
