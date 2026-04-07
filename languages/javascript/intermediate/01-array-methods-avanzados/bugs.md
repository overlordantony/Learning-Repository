# 01 · Array Methods Avanzados — Bugs

## Bug 1: flat() sin profundidad suficiente
```js
[[1,[2]],3].flat()         // [1,[2],3] — solo un nivel
[[1,[2]],3].flat(Infinity) // [1,2,3]
```

## Bug 2: sort() muta el original
```js
const ordenado = [...arr].sort(...); // siempre copiar primero
```

## Bug 3: reduce sin valor inicial en array vacío
```js
[].reduce((a,x) => a+x);    // TypeError
[].reduce((a,x) => a+x, 0); // seguro → 0
```

## Bug 4: flatMap solo aplana un nivel
Si necesitas más profundidad: `.map(fn).flat(n)`

## Notas personales
