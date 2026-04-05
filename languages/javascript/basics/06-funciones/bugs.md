# 06 · Funciones — Bugs & Errores comunes

## Bug 1: Arrow function con objeto literal como return implícito
```js
const getObj = () => { nombre: "Ana" }; // undefined — JS interpreta {} como bloque
const getObj = () => ({ nombre: "Ana" }); // correcto — paréntesis envuelven el objeto
```

## Bug 2: this en arrow function dentro de método
```js
const obj = {
  nombre: "Ana",
  saludar: () => console.log(this.nombre) // undefined — arrow no tiene su propio this
};
// Usar function declaration para métodos que necesiten `this`
```

## Bug 3: Llamar antes de declarar una expresión
```js
saludar("Ana"); // TypeError: saludar is not a function
const saludar = (n) => `Hola ${n}`;
// Las expresiones no se hoistean como las declaraciones
```

## Notas personales
