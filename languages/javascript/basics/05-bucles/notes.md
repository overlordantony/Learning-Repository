# 05 · Bucles

## for clásico
```js
for (inicialización; condición; actualización) { }
for (let i = 0; i < 5; i++) { console.log(i); }
```

## while
Cuando no sabes cuántas iteraciones habrá.
```js
while (condición) { }
```

## do...while
Se ejecuta AL MENOS una vez, luego evalúa la condición.
```js
do { } while (condición);
```

## for...of — iterar valores
Para arrays, strings, Sets, Maps. Devuelve el VALOR.
```js
const nums = [10, 20, 30];
for (const n of nums) { console.log(n); } // 10, 20, 30
```

## for...in — iterar claves
Para objetos. Devuelve la CLAVE. Evitar en arrays.
```js
const obj = { a: 1, b: 2 };
for (const key in obj) { console.log(key, obj[key]); }
```

## break y continue
```js
break;    // sale del bucle completamente
continue; // salta a la siguiente iteración
```

## Cuándo usar cada uno
| Bucle | Usar cuando... |
|-------|---------------|
| `for` | Sabes exactamente cuántas veces |
| `while` | Condición dinámica, no sabes cuántas veces |
| `do...while` | Necesitas al menos una ejecución |
| `for...of` | Iterar valores de un iterable |
| `for...in` | Iterar claves de un objeto |

## Referencias
- MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for
