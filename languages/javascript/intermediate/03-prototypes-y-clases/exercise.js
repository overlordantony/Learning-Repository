// 03 · Prototypes y Clases — exercise.js

// PARTE 1: Función constructora (estilo pre-ES6)
// Crea Figura(color) con prototype.describir() que retorne "Figura de color {color}"
// Instancia dos figuras y verifica que comparten el método en el prototipo
function Figura(color) {
  this.color = color;
}

Figura.prototype.describir = function() {
  return `Figura de color ${this.color}`;
};

const figura1 = new Figura("rojo");
const figura2 = new Figura("azul");

console.log(figura1.describir()); // "Figura de color rojo"
console.log(figura2.describir()); // "Figura de color azul"
console.log(figura1.describir === figura2.describir); // true

// PARTE 2: Clase básica con static
// Crea clase Producto con: nombre, precio, stock
// Método: aplicarDescuento(pct) — modifica el precio
// Getter: disponible → true si stock > 0
// Static: crearDesdeObjeto({nombre, precio, stock}) → instancia
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  aplicarDescuento(pct) {
    this.precio -= this.precio * (pct / 100);
  }

  get disponible() {
    return this.stock > 0;
  }

  static crearDesdeObjeto({ nombre, precio, stock }) {
    return new Producto(nombre, precio, stock);
  }
}

const productoData = { nombre: "Camiseta", precio: 20, stock: 5 };
const producto = Producto.crearDesdeObjeto(productoData);
console.log(producto); // Producto { nombre: 'Camiseta', precio: 20, stock: 5 }
console.log(producto.disponible); // true
producto.aplicarDescuento(10);
console.log(producto.precio); // 18

// PARTE 3: Herencia con extends
// Crea clase Animal con: nombre, sonido, hablar()
// Crea Perro extends Animal con: raza, fetch() — y sobreescribe hablar()
// Crea Gato extends Animal con: indoor (bool), sobreescribe hablar()
class Animal {
    constructor(nombre, sonido) {
        this.nombre = nombre;
        this.sonido = sonido;
    }

    hablar() {
        return `${this.nombre} dice ${this.sonido}`;
    }
}

class Perro extends Animal {
    constructor(nombre, sonido, raza) {
        super(nombre, sonido);
        this.raza = raza;
    }

    hablar() {
        return `${this.nombre} el perro dice ${this.sonido}`;
    }

    fetch() {
        return `${this.nombre} está trayendo la pelota.`;
    }
}

class Gato extends Animal {
    constructor(nombre, sonido, indoor) {
        super(nombre, sonido);
        this.indoor = indoor;
    }

    hablar() {
        return `${this.nombre} el gato dice ${this.sonido}`;
    }
}

const perro = new Perro("Rex", "guau", "Labrador");
console.log(perro.hablar()); // "Rex el perro dice guau"
console.log(perro.fetch());   // "Rex está trayendo la pelota."

const gato = new Gato("Miau", "miau", true);
console.log(gato.hablar()); // "Miau el gato dice miau" 

// PARTE 4: Private fields
// Crea clase Token con:
// #valor privado (string random al crear)
// #usos privado (contador)
// get valor() — solo si #usos < 3, luego retorna null y loguea "expirado"
// get usosRestantes()
class Token {
    #valor;
    #usos;

    constructor() {
        this.#valor = Math.random().toString(36).substring(2, 15);
        this.#usos = 0;
    }

    get valor() {
        if (this.#usos < 3) {
            this.#usos++;
            return this.#valor;
        } else {
            console.log("expirado");
            return null;
        }
    }

    get usosRestantes() {
        return Math.max(0, 3 - this.#usos);
    }
}

const token = new Token();
console.log(token.valor);        // muestra el valor
console.log(token.valor);        // muestra el valor
console.log(token.valor);        // muestra el valor
console.log(token.valor);        // null — expirado
console.log(token.usosRestantes); // 0

// PARTE 5: Mixin
// Crea mixin Timestampable que agregue: creadoEn, actualizadoEn, tocar()
// Aplícalo a una clase Tarea(titulo, descripcion)
const Timestampable = Base => class extends Base {
    constructor(...args) {
        super(...args);
        this.creadoEn = new Date();
        this.actualizadoEn = new Date();
    }

    tocar() {
        this.actualizadoEn = new Date();
    }
};

class Tarea extends Timestampable(Object) {
    constructor(titulo, descripcion) {
        super();
        this.titulo = titulo;
        this.descripcion = descripcion;
    }
}

const tarea = new Tarea("Aprender JS", "Estudiar prototipos y clases");
console.log(tarea.creadoEn); // fecha de creación
console.log(tarea.actualizadoEn); // fecha de creación
tarea.tocar();
console.log(tarea.actualizadoEn); // fecha actualizada


// BONUS
// ¿Cuál es la diferencia entre:
// ana.hasOwnProperty("nombre") y "nombre" in ana?
// Escribe un ejemplo que muestre la diferencia.
const ana = { nombre: "Ana" };
console.log(ana.hasOwnProperty("nombre")); // true
console.log("nombre" in ana); // true

console.log(ana.hasOwnProperty("toString")); // false
console.log("toString" in ana); // true (heredado del prototipo)