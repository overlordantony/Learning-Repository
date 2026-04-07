# 09 · Proxy y Reflect

## ¿Qué es un Proxy?
Permite interceptar y redefinir operaciones fundamentales sobre un objeto.
```js
const proxy = new Proxy(target, handler);
```
`target`: el objeto original.
`handler`: objeto con "traps" — funciones que interceptan operaciones.

## Traps más usadas
```js
const handler = {
  get(target, prop, receiver) { },         // lectura de propiedad
  set(target, prop, value, receiver) { },  // escritura de propiedad
  has(target, prop) { },                   // operador in
  deleteProperty(target, prop) { },        // delete obj.prop
  apply(target, thisArg, args) { },        // llamada a función
  construct(target, args) { },             // new Clase()
  ownKeys(target) { },                     // Object.keys()
};
```

## Reflect
API que expone las operaciones internas de JS como métodos.
Útil para implementar el comportamiento por defecto dentro de una trap.
```js
Reflect.get(target, prop)          // equivale a target[prop]
Reflect.set(target, prop, value)   // equivale a target[prop] = value
Reflect.has(target, prop)          // equivale a prop in target
Reflect.deleteProperty(target, prop)
```

## Casos de uso reales

### Validación automática
```js
function crearValidado(target, schema) {
  return new Proxy(target, {
    set(obj, prop, value) {
      if (schema[prop] && !schema[prop](value))
        throw new TypeError(`Valor inválido para ${prop}: ${value}`);
      return Reflect.set(obj, prop, value);
    }
  });
}
```

### Logging / observabilidad
```js
function observar(target, onChange) {
  return new Proxy(target, {
    set(obj, prop, value) {
      const old = obj[prop];
      const result = Reflect.set(obj, prop, value);
      if (old !== value) onChange(prop, old, value);
      return result;
    }
  });
}
```

### Propiedades por defecto (default trap)
```js
const conDefecto = new Proxy({}, {
  get(target, prop) {
    return prop in target ? target[prop] : 0; // 0 para propiedades inexistentes
  }
});
conDefecto.x; // 0
conDefecto.x = 5;
conDefecto.x; // 5
```

## Limitaciones
- No puede interceptar operaciones en objetos sin proxy (solo el proxy intercepta).
- Overhead de rendimiento — no usar en hot paths.
- No funciona bien con objetos que usan slots internos (Map, Set, Date nativas).

## Referencias
- MDN Proxy: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy
- MDN Reflect: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Reflect
