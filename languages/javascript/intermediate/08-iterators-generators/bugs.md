# 08 · Iterators y Generators — Bugs

## Bug 1: Generator consumido no se reinicia
```js
function* gen() { yield 1; yield 2; }
const g = gen();
[...g]; // [1,2]
[...g]; // [] — ya está consumido, done:true
// Para reusar: crear nueva instancia
```

## Bug 2: for...of en generator infinito sin break
```js
function* infinito() { while(true) yield 1; }
for (const x of infinito()) console.log(x); // loop infinito — cuelga el proceso
// Siempre usar break o tomar() para generators infinitos
```

## Bug 3: return en generator emite {done:true} pero el valor se ignora en for...of
```js
function* ejemplo() { yield 1; return 99; }
[...ejemplo()]; // [1] — el 99 del return no aparece
// for...of y spread ignoran el valor del done:true
```

## Notas personales
