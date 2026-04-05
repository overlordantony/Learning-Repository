// 08 · Objetos — exercise.js

// ── PARTE 1: Crear y acceder ──────────────
// Crea un objeto producto con: nombre, precio, stock, categoria, activo
// Accede a cada propiedad de ambas formas (punto y corchetes)
const producto = {
  nombre: "Smartphone",
  precio: 1500000,
  stock: 10,
  categoria: "Electrónica",
  activo: true
};
// acceso con punto
console.log(producto.nombre);
console.log(producto.precio);
console.log(producto.stock);
console.log(producto.categoria);
console.log(producto.activo);

// acceso con corchetes
console.log(producto["nombre"]);
console.log(producto["precio"]);
console.log(producto["stock"]);
console.log(producto["categoria"]);
console.log(producto["activo"]);

// ── PARTE 2: Destructuring ────────────────
// Dado este objeto, extrae nombre y precio con destructuring
// Renombra precio como costo
// Dale valor por defecto "sin descripción" a descripcion
const articulo = { nombre: "Laptop", precio: 2500000, stock: 5 };
const { nombre, precio: costo } = articulo;
const { descripcion = "sin descripción" } = articulo;
console.log(nombre); // Laptop
console.log(costo); // 2500000
console.log(descripcion); // sin descripción  

// ── PARTE 3: Spread ───────────────────────
// Crea una copia del artículo y agrégale descuento: 10
// Crea una versión actualizada con stock: 0 (sin mutar el original)
const articuloConDescuento = { ...articulo, descuento: 10 };
const articuloSinStock = { ...articulo, stock: 0 };
console.log(articuloConDescuento); // { nombre: 'Laptop', precio: 2500000, stock: 5, descuento: 10 }
console.log(articuloSinStock); // { nombre: 'Laptop', precio: 2500000, stock: 0 }
console.log(articulo); // { nombre: 'Laptop', precio: 2500000, stock: 5 }

// ── PARTE 4: Object.keys / values / entries ─
// Dado este objeto de configuración, itera sus entries e imprímelos
const config = { host: "localhost", port: 3000, debug: true, version: "1.0" };
for (const [clave, valor] of Object.entries(config)) {
  console.log(`${clave}: ${valor}`);
}

// ── PARTE 5: Objetos anidados ─────────────
// Accede a ciudad con destructuring anidado
// Accede de forma segura a una propiedad que puede no existir
const usuario = {
  nombre: "Luis",
  contacto: { email: "luis@mail.com", telefono: null },
  direccion: { ciudad: "Cali", barrio: "Granada" }
};
const { direccion: { ciudad } } = usuario;
const telefono = usuario.contacto?.telefono ?? "No tiene teléfono";
console.log(ciudad); // Cali
console.log(telefono); // No tiene teléfono 

// ── BONUS ─────────────────────────────────
// Escribe fusionar(obj1, obj2) que combine dos objetos
// Si hay claves iguales, el obj2 tiene prioridad
// No mutar ninguno de los dos originales
function fusionar(obj1, obj2) {
  return { ...obj1, ...obj2 };
}
const objA = { a: 1, b: 2 };
const objB = { b: 3, c: 4 };
const resultado = fusionar(objA, objB);
console.log(resultado); // { a: 1, b: 3, c: 4 }
console.log(objA); // { a: 1, b: 2 }
console.log(objB); // { b: 3, c: 4 }  
