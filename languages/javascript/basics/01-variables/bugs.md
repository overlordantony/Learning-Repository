# 01 · Variables — Bugs & Errores comunes

## Bug 1: TypeError al reasignar const
**Código que lo produce:**
```js
const PI = 3.14;
PI = 3; // TypeError
```
**Error:** `TypeError: Assignment to constant variable.`  
**Por qué pasa:** `const` bloquea la reasignación de la referencia.  
**Solución:** Usar `let` si el valor va a cambiar. Reservar `const` para valores fijos.

---

## Bug 2: ReferenceError con let antes de declarar (TDZ)
**Código que lo produce:**
```js
console.log(x);
let x = 5;
```
**Error:** `ReferenceError: Cannot access 'x' before initialization`  
**Por qué pasa:** `let` está en la Temporal Dead Zone hasta que el motor ejecuta su línea de declaración.  
**Solución:** Siempre declarar antes de usar.

---

## Bug 3: var fuera de scope de bloque
**Código que lo produce:**
```js
if (true) {
  var mensaje = "hola";
}
console.log(mensaje); // "hola" — no da error, pero debería estar encapsulado
```
**Por qué es un problema:** `var` ignora el block scope. El valor "se escapa" del bloque.  
**Solución:** Usar `let` o `const` que sí respetan el bloque.

---

## Bug 4: Confundir mutación con reasignación en const + objeto
**Código que lo produce:**
```js
const user = { nombre: "Ana" };
user.nombre = "Luis"; // esto funciona
user = { nombre: "Pedro" }; // esto lanza TypeError
```
**Por qué pasa:** `const` protege la referencia (el puntero al objeto), no el contenido.  
**Concepto clave:** mutación ≠ reasignación.

---
