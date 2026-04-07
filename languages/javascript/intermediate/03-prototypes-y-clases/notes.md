# 03 · Prototypes y Clases

## Prototype chain
Todo objeto en JS tiene un prototipo interno ([[Prototype]]).
Cuando accedes a una propiedad, JS la busca en el objeto, luego en su prototipo, y así hacia arriba.

```js
const arr = [1,2,3];
arr.map // → Array.prototype.map
// arr → Array.prototype → Object.prototype → null
```

## Funciones constructoras (pre-ES6)
```js
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}
Persona.prototype.saludar = function() {
  return `Hola, soy ${this.nombre}`;
};
const ana = new Persona("Ana", 28);
ana.saludar(); // "Hola, soy Ana"
```

## ES6 Classes — azúcar sintáctico sobre prototypes
```js
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  saludar() { return `Hola, soy ${this.nombre}`; }

  // Método estático — pertenece a la clase, no a la instancia
  static crear(nombre, edad) { return new Persona(nombre, edad); }
}
```

## Herencia con extends
```js
class Empleado extends Persona {
  constructor(nombre, edad, cargo) {
    super(nombre, edad); // llama al constructor padre ANTES de usar this
    this.cargo = cargo;
  }
  saludar() {
    return `${super.saludar()}, trabajo como ${this.cargo}`;
  }
}
```

## Private fields (ES2022) — # prefix
```js
class CuentaBancaria {
  #saldo = 0; // verdaderamente privado — no accesible desde afuera

  depositar(n) { this.#saldo += n; }
  get saldo() { return this.#saldo; }
}
const cuenta = new CuentaBancaria();
cuenta.depositar(100);
cuenta.#saldo; // SyntaxError
```

## instanceof y prototype chain
```js
ana instanceof Persona   // true
ana instanceof Object    // true (todo objeto hereda de Object)
```

## hasOwnProperty vs in
```js
ana.hasOwnProperty("nombre") // true — propiedad propia
ana.hasOwnProperty("saludar") // false — está en el prototipo
"saludar" in ana              // true — busca en toda la cadena
```

## Mixins — componer sin herencia
```js
const Serializable = (Base) => class extends Base {
  serialize() { return JSON.stringify(this); }
};
class Punto { constructor(x,y){ this.x=x; this.y=y; } }
class PuntoSerial extends Serializable(Punto) {}
new PuntoSerial(1,2).serialize(); // '{"x":1,"y":2}'
```

## Referencias
- MDN Classes: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes
- MDN Prototype: https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/Object_prototypes
