# 08 · Iterators y Generators

## Protocolo iterable
Un objeto es iterable si implementa Symbol.iterator que retorna un iterator.
Un iterator es un objeto con método next() que retorna { value, done }.

```js
// Array, String, Map, Set, NodeList son iterables nativamente
for (const x of [1,2,3]) {}        // usa el protocolo
const [a,b] = "hi";                 // destructuring usa el protocolo
[...new Set([1,2,2,3])]             // spread usa el protocolo
```

## Crear un iterable custom
```js
const rango = {
  from: 1, to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};
for (const n of rango) console.log(n); // 1 2 3 4 5
[...rango]; // [1,2,3,4,5]
```

## Generators (function*)
Funciones que pueden pausarse y reanudarse. Retornan un generator object (que es iterable).

```js
function* contador(inicio=0) {
  while(true) {
    yield inicio++;  // pausa aquí y retorna el valor
  }
}
const gen = contador(5);
gen.next(); // { value:5, done:false }
gen.next(); // { value:6, done:false }
// infinito pero lazy — solo calcula cuando se pide
```

## yield*
Delegar a otro iterable o generator.
```js
function* concatenar(a, b) {
  yield* a; // itera a
  yield* b; // luego b
}
[...concatenar([1,2],[3,4])]; // [1,2,3,4]
```

## Generators para secuencias lazy
```js
function* rango(inicio, fin, paso=1) {
  for (let i=inicio; i<fin; i+=paso) yield i;
}
// Solo genera los valores cuando se piden — eficiente en memoria
const primerosMayoresA100 = [...rango(0,1000)].filter(n=>n>100).slice(0,5);
```

## Generators como máquinas de estado
```js
function* semaforo() {
  while(true) {
    yield "rojo";
    yield "amarillo";
    yield "verde";
  }
}
const luz = semaforo();
luz.next().value; // "rojo"
luz.next().value; // "amarillo"
luz.next().value; // "verde"
luz.next().value; // "rojo" — cicla infinitamente
```

## Referencias
- MDN Iterators: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Iterators_and_generators
