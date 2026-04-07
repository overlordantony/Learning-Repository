# 02 · Objetos Avanzados

## Getters y Setters
Propiedades que ejecutan lógica al leerse o escribirse.
```js
const circulo = {
  _radio: 5,
  get radio() { return this._radio; },
  set radio(v) {
    if (v < 0) throw new Error("Radio negativo");
    this._radio = v;
  },
  get area() { return Math.PI * this._radio ** 2; } // calculada, sin setter
};
circulo.radio = 10;
console.log(circulo.area); // 314.15...
```

## Object.defineProperty()
Control fino sobre propiedades: enumerable, writable, configurable.
```js
Object.defineProperty(obj, "id", {
  value: 42,
  writable: false,     // no se puede reasignar
  enumerable: false,   // no aparece en for...in ni Object.keys
  configurable: false  // no se puede redefinir ni eliminar
});
```

## Object.create()
Crea un objeto con el prototipo que le indiques.
```js
const animal = {
  hablar() { return `${this.nombre} hace un sonido`; }
};
const perro = Object.create(animal);
perro.nombre = "Rex";
perro.hablar(); // "Rex hace un sonido"
```

## Computed property names
```js
const prefijo = "get";
const campo = "nombre";
const obj = {
  [`${prefijo}${campo.charAt(0).toUpperCase()}${campo.slice(1)}`]: function() {
    return this._nombre;
  }
};
// genera la propiedad "getNombre"
```

## Object.freeze() vs Object.seal()
```js
const congelado = Object.freeze({ x: 1 });
congelado.x = 99;       // silencioso en non-strict, error en strict
congelado.nuevo = "a";  // ignorado

const sellado = Object.seal({ x: 1 });
sellado.x = 99;         // permitido (modificar existente)
sellado.nuevo = "a";    // ignorado (no agregar nuevas)
```
Nota: freeze es **shallow** — objetos anidados siguen siendo mutables.

## Property descriptors
```js
Object.getOwnPropertyDescriptor(obj, "prop");
// { value, writable, enumerable, configurable }

Object.getOwnPropertyDescriptors(obj); // todos
```

## Símbolos como claves
```js
const ID = Symbol("id");
const obj = { [ID]: 123, nombre: "Ana" };
obj[ID];          // 123
Object.keys(obj); // ["nombre"] — los símbolos no aparecen
```

## Referencias
- MDN Object: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object
