# 04 · Metaprogramación — Bugs

## Bug 1: Symbol.toStringTag como método en vez de getter
```js
// MAL
[Symbol.toStringTag]() { return "MiClase"; }
// BIEN
get [Symbol.toStringTag]() { return "MiClase"; }
```
toStringTag debe ser un getter, no un método.

## Bug 2: Symbol no serializa con JSON
```js
const ID = Symbol("id");
const obj = { [ID]: 123, nombre: "Ana" };
JSON.stringify(obj); // {"nombre":"Ana"} — el Symbol desaparece silenciosamente
// Implementar toJSON() si necesitas incluirlo
```

## Bug 3: Tagged template — strings[0] es siempre el texto ANTES del primer valor
```js
// Para `Hola ${name} mundo`:
// strings = ["Hola ", " mundo"]
// values = [name]
// strings.length siempre es values.length + 1
```

## Bug 4: Symbol.iterator retorna el objeto mismo en vez de un nuevo iterator
```js
// MAL: si iteras dos veces, la segunda falla porque el estado es compartido
[Symbol.iterator]() { return this; }
// BIEN: retornar un nuevo objeto con estado fresco cada vez
[Symbol.iterator]() { let i=0; return { next:()=>({value:this.datos[i++],done:i>this.datos.length}) }; }
```

## Notas personales
