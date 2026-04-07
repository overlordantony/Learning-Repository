# 10 · Patrones Funcionales

## Programación Funcional — principios
- **Funciones puras**: mismo input → mismo output, sin side effects
- **Inmutabilidad**: no mutar datos, crear copias modificadas
- **Composición**: construir funciones complejas desde funciones simples
- **First-class functions**: funciones como valores

## Currying
Transformar f(a,b,c) en f(a)(b)(c) — aplicación parcial de argumentos.
```js
const sumar = (a) => (b) => a + b;
const sumar5 = sumar(5);
sumar5(3); // 8

// Curry automático
const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
};
```

## Composición y pipe
```js
// compose: aplica funciones de derecha a izquierda
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// pipe: aplica funciones de izquierda a derecha (más legible)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const procesarTexto = pipe(
  str => str.trim(),
  str => str.toLowerCase(),
  str => str.replace(/\s+/g, "-")
);
procesarTexto("  Hola Mundo  "); // "hola-mundo"
```

## Partial application
Fijar algunos argumentos de una función sin convertirla en curried.
```js
const partial = (fn, ...preArgs) => (...args) => fn(...preArgs, ...args);

const log = (nivel, mensaje) => console.log(`[${nivel}] ${mensaje}`);
const logError = partial(log, "ERROR");
logError("conexión fallida"); // [ERROR] conexión fallida
```

## Memoización funcional
```js
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};
```

## Functors y map
Un functor es cualquier cosa que tiene map y cumple las leyes de functor.
Array es el functor más conocido. Pero puedes crear los tuyos.
```js
class Maybe {
  constructor(value) { this._value = value; }
  static of(value) { return new Maybe(value); }
  isNothing() { return this._value == null; }
  map(fn) { return this.isNothing() ? this : Maybe.of(fn(this._value)); }
  getOrElse(def) { return this.isNothing() ? def : this._value; }
}

Maybe.of(null).map(x => x * 2).getOrElse(0); // 0 — no explota
Maybe.of(5).map(x => x * 2).getOrElse(0);    // 10
```

## Transducers (concepto)
Composición de transformaciones sin crear arrays intermedios.
```js
// Con map+filter normales: crea 2 arrays intermedios
arr.filter(x=>x>0).map(x=>x*2);

// Con reduce en una pasada: cero arrays intermedios
arr.reduce((acc,x) => { if(x>0) acc.push(x*2); return acc; }, []);
```

## Referencias
- Mostly Adequate Guide to FP: https://mostly-adequate.gitbook.io/mostly-adequate-guide
