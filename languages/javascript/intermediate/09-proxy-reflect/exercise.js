// 09 · Proxy y Reflect — exercise.js

// PARTE 1: Proxy con validación
// Crea crearPersona(nombre, edad) que retorna un Proxy que:
// - valida que nombre sea string no vacío al asignar
// - valida que edad sea número entre 0 y 120
// - lanza TypeError si la validación falla
function crearPersona(nombre, edad) {
  // TU CÓDIGO AQUÍ
}
const p = crearPersona("Ana", 28);
p.nombre = "Luis";   // ok
p.edad = 200;        // TypeError


// PARTE 2: Proxy observable
// Implementa observar(obj, callback) donde callback(prop, valorAntes, valorDespues)
// se llama cada vez que cambia una propiedad
function observar(obj, callback) {
  // TU CÓDIGO AQUÍ
}
const state = observar({ x: 0, y: 0 }, (prop, antes, despues) => {
  console.log(`${prop}: ${antes} → ${despues}`);
});
state.x = 5;  // "x: 0 → 5"
state.y = 10; // "y: 0 → 10"
state.x = 5;  // no debe notificar (mismo valor)


// PARTE 3: Proxy con acceso seguro (deep get)
// Crea accesoSeguro(obj) que retorna un proxy donde
// acceder a propiedades anidadas que no existen retorna undefined (no TypeError)
// obj.a.b.c.d → undefined en vez de crash
function accesoSeguro(obj) {
  // TU CÓDIGO AQUÍ — pista: el getter puede retornar otro accesoSeguro
}
const config = accesoSeguro({ db: { host: "localhost" } });
console.log(config.db.host);       // "localhost"
console.log(config.db.port);       // undefined
console.log(config.redis?.url);    // undefined (sin error)


// PARTE 4: Proxy para logging de accesos
// Implementa logger(obj, nombre) que loguea cada lectura y escritura
function logger(obj, nombre="obj") {
  // TU CÓDIGO AQUÍ
}
const api = logger({ baseUrl: "https://api.test.com", timeout: 3000 }, "api");
api.baseUrl;       // [GET] api.baseUrl → "https://api.test.com"
api.timeout = 5000; // [SET] api.timeout 3000 → 5000


// BONUS
// Crea un Proxy que implemente "propiedades privadas por convención"
// Si una prop empieza con _, lanzar Error al acceder desde afuera
