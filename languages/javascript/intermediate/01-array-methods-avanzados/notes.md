# 01 · Array Methods Avanzados

## Array.from()
Crea un array desde cualquier iterable o array-like.
```js
Array.from("hola")                        // ["h","o","l","a"]
Array.from({length:5}, (_,i) => i)        // [0,1,2,3,4]
Array.from(new Set([1,1,2]))              // [1,2]
Array.from(document.querySelectorAll("li")) // NodeList → Array real
```

## flatMap()
`.map().flat(1)` en una sola pasada. Útil cuando cada elemento produce un array.
```js
const frases = ["hola mundo", "foo bar"];
frases.flatMap(f => f.split(" ")); // ["hola","mundo","foo","bar"]
```

## reduce() compuesto
reduce puede construir cualquier estructura: objetos, Maps, arrays filtrados+transformados.
```js
// Agrupar por propiedad
items.reduce((acc, item) => {
  (acc[item.cat] ??= []).push(item);
  return acc;
}, {});

// Contar ocurrencias
palabras.reduce((acc, p) => {
  acc[p] = (acc[p] ?? 0) + 1;
  return acc;
}, {});

// map+filter en una sola pasada
data.reduce((acc, x) => {
  if (x > 0) acc.push(x * 2);
  return acc;
}, []);
```

## sort() estable y multicriterio
Desde ES2019 el sort es garantizadamente estable.
```js
arr.sort((a,b) => a - b);   // números ASC
arr.sort((a,b) => b - a);   // números DESC

// multicriterio: primero por categoría, desempate por precio
items.sort((a,b) => {
  if (a.cat !== b.cat) return a.cat.localeCompare(b.cat);
  return a.precio - b.precio;
});
```

## at() — acceso con índices negativos (ES2022)
```js
const arr = [10,20,30,40,50];
arr.at(-1)  // 50
arr.at(-2)  // 40
```

## Referencias
- MDN Array: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array
