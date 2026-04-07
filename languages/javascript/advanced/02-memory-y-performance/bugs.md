# 02 · Memory y Performance — Bugs

## Bug 1: Arrow function como method listener pierde referencia para removeEventListener
```js
elemento.addEventListener("click", () => this.handler());
elemento.removeEventListener("click", () => this.handler()); // NO funciona — función nueva
// Guardar la referencia bound:
this._handler = () => this.handler();
elemento.addEventListener("click", this._handler);
elemento.removeEventListener("click", this._handler); // funciona
```

## Bug 2: Debounce que no preserva el contexto
```js
// Si la función usa `this`, asegurarse de usar fn.apply(this, args)
// Las arrow functions en el debounce no tienen su propio this
```

## Bug 3: LRU con objetos como keys
Map usa referencia de objeto como key — dos objetos con el mismo contenido son keys distintas.
Para keys por valor, usar JSON.stringify o una estrategia de normalización.

## Bug 4: WeakMap solo acepta objetos como keys
```js
const wm = new WeakMap();
wm.set("string", valor); // TypeError — solo objetos
```

## Notas personales
