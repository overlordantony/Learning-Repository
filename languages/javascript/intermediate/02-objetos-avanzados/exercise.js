// 02 · Objetos Avanzados — exercise.js

// PARTE 1: Getters y Setters
// Crea un objeto "temperatura" con:
// - propiedad interna _celsius
// - getter/setter para celsius (setter valida que no baje de -273.15)
// - getter fahrenheit (calculado: celsius * 9/5 + 32)
// - getter kelvin (calculado: celsius + 273.15)
const temperatura = {
  _celsius: 20,
  get celsius() { return this._celsius; },
  set celsius(v) {
    if (v < -273.15) throw new RangeError("Por debajo del cero absoluto");
    this._celsius = v;
  },
  get fahrenheit() { return this._celsius * 9/5 + 32; },
  get kelvin() { return this._celsius + 273.15; }
};
temperatura.celsius = 50;
console.log(temperatura.fahrenheit); // 212
console.log(temperatura.kelvin);     // 373.15

// PARTE 2: Object.defineProperty
// Crea un objeto "config" y agrega una propiedad "version"
// que sea: no writable, no enumerable, y con valor "1.0.0"
// Verifica que no aparece en Object.keys() y que no se puede sobreescribir
const config = {};
Object.defineProperty(config, "version", {
  value: "1.0.0",
  writable: false,
  enumerable: false,
  configurable: false
});
console.log(Object.keys(config));  // [] — no aparece
config.version = "2.0.0";         // silencioso (no strict)
console.log(config.version);      // "1.0.0"

// PARTE 3: Object.create() para herencia simple
// Crea un objeto base "vehiculo" con: { marca, modelo, describir() }
// Crea "auto" y "moto" heredando de vehiculo, cada uno con propiedades extra
const vehiculo = {
  describir() { return `${this.marca} ${this.modelo}`; }
};
const auto = Object.create(vehiculo);
auto.marca = "Toyota"; auto.modelo = "Corolla"; auto.puertas = 4;

const moto = Object.create(vehiculo);
moto.marca = "Honda"; moto.modelo = "CB500"; moto.cilindrada = 500;

console.log(auto.describir());  // "Toyota Corolla"
console.log(moto.describir());  // "Honda CB500"

// PARTE 4: freeze vs seal
// Crea un objeto de configuración congelado
// Intenta modificar una propiedad existente
// Intenta agregar una propiedad nueva
// Haz lo mismo con seal — ¿cuál diferencia notas?
const congelado = Object.freeze({ host: "localhost", port: 3000 });
congelado.port = 8080;    // ignorado
congelado.debug = true;   // ignorado
console.log(congelado);   // { host:"localhost", port:3000 }

const sellado = Object.seal({ host: "localhost", port: 3000 });
sellado.port = 8080;      // permitido
sellado.debug = true;     // ignorado
console.log(sellado);     // { host:"localhost", port:8080 }

// PARTE 5: Computed properties + símbolo privado
// Crea una función crearEntidad(tipo) que genere un objeto con:
// - propiedad dinámica: `es${tipo}` → true (ej: esUsuario, esProducto)
// - un Symbol interno como ID único no enumerable
const ID = Symbol("id");
let _nextId = 1;
function crearEntidad(tipo) {
  const capitalized = tipo.charAt(0).toUpperCase() + tipo.slice(1);
  const entidad = { [`es${capitalized}`]: true };
  Object.defineProperty(entidad, ID, { value: _nextId++, enumerable: false });
  return entidad;
}
const usuario = crearEntidad("usuario");
const producto = crearEntidad("producto");
console.log(usuario);   // { esUsuario: true }
console.log(producto);  // { esProducto: true }

// BONUS
// Implementa un objeto "pila" (stack) con getters: tamaño, estaVacia
// y métodos: apilar(val), desapilar() — sin exponer el array interno directamente
function crearPila() {
  const _datos = [];
  return {
    apilar(val) { _datos.push(val); },
    desapilar() { return _datos.pop(); },
    get tamaño() { return _datos.length; },
    get estaVacia() { return _datos.length === 0; }
  };
}
const pila = crearPila();
pila.apilar(1);
pila.apilar(2);
console.log(pila.tamaño);     // 2
console.log(pila.estaVacia); // false
console.log(pila.desapilar()); // 2
console.log(pila.tamaño);     // 1
