# 03 · Prototypes y Clases — Bugs

## Bug 1: Olvidar super() antes de usar this en el constructor hijo
```js
class Hijo extends Padre {
  constructor(x) {
    this.x = x;    // ReferenceError: Must call super before accessing 'this'
    super();
  }
}
```
super() SIEMPRE antes de acceder a this.

## Bug 2: Arrow function como método de clase pierde this
```js
class Obj {
  valor = 42;
  getValor = () => this.valor; // OK — arrow captura this léxico
  getValorMal() { return this.valor; } // puede perder this si se extrae
}
const { getValorMal } = new Obj();
getValorMal(); // undefined o error — this ya no es la instancia
```

## Bug 3: Métodos en el constructor en vez del prototipo
```js
// MAL: cada instancia crea su propia función
function Persona(n) {
  this.saludar = function() { return n; }; // nueva función por instancia
}
// BIEN: compartida en el prototipo
Persona.prototype.saludar = function() { return this.nombre; };
```

## Notas personales
