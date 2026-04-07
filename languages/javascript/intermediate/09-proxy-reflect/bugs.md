# 09 · Proxy y Reflect — Bugs

## Bug 1: No retornar true en la trap set
```js
set(target, prop, value) {
  target[prop] = value;
  // si no retornas true, lanza TypeError en strict mode
  return true; // SIEMPRE retornar true si la operación fue exitosa
}
```

## Bug 2: Proxy no intercepta operaciones en objetos internos
```js
const p = new Proxy(new Map(), { get() {...} });
p.set("a", 1); // TypeError — Map usa slots internos que el Proxy no puede interceptar
// Solución: bindear el método al target
get(target, prop) {
  const val = Reflect.get(target, prop);
  return typeof val === "function" ? val.bind(target) : val;
}
```

## Bug 3: Circular con accesoSeguro y objetos reales
Si wrappeas objetos con métodos nativos (DOM, Map, etc.) en accesoSeguro,
los métodos pueden fallar porque `this` deja de ser el objeto original.

## Notas personales
