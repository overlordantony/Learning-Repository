// 08 · Iterators y Generators — solution.js

// PARTE 1
function rango(inicio, fin, paso=1) {
  return {
    [Symbol.iterator]() {
      let current = inicio;
      return {
        next() {
          if (current < fin) {
            const value = current;
            current += paso;
            return { value, done: false };
          }
          return { value: undefined, done: true };
        }
      };
    }
  };
}

// PARTE 2
function* fibonacci() {
  let [a, b] = [0, 1];
  while(true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// PARTE 3
function* paginar(items, tam) {
  for (let i=0; i<items.length; i+=tam) {
    yield items.slice(i, i+tam);
  }
}

// PARTE 4
function* semaforo() {
  const estados = [
    { color:"rojo",    segundos:3 },
    { color:"verde",   segundos:2 },
    { color:"amarillo",segundos:1 },
  ];
  let i = 0;
  while(true) {
    yield estados[i % estados.length];
    i++;
  }
}

// PARTE 5
function* flatten(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) yield* flatten(item);
    else yield item;
  }
}

// BONUS
function tomar(iterable, n) {
  const result = [];
  for (const val of iterable) {
    result.push(val);
    if (result.length >= n) break;
  }
  return result;
}
const fib = fibonacci();
console.log(tomar(fib, 8)); // [0,1,1,2,3,5,8,13]
