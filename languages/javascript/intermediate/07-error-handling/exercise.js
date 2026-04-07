// 07 · Error Handling — exercise.js

// PARTE 1: Errores custom
// Crea tres clases de error:
// - ValidationError(campo, mensaje) — para validación de datos
// - NotFoundError(recurso, id)     — para recursos no encontrados
// - AuthError(accion)              — para problemas de autorización
// Todas deben tener: name correcto, message útil, propiedades específicas
// TU CÓDIGO AQUÍ


// PARTE 2: Validador con errores custom
// Escribe validarUsuario(datos) que lanza ValidationError si:
// - nombre falta o es muy corto (< 2 chars)
// - email no tiene @
// - edad no es número o está fuera de [0, 120]
// Si todo ok, retorna { valido: true, datos }
function validarUsuario(datos) {
  // TU CÓDIGO AQUÍ
}

const casos = [
  { nombre: "Ana", email: "ana@test.com", edad: 28 },
  { nombre: "X", email: "ana@test.com", edad: 28 },
  { nombre: "Luis", email: "invalido", edad: 28 },
  { nombre: "Pedro", email: "p@test.com", edad: 200 },
];
casos.forEach(c => {
  try { console.log(validarUsuario(c)); }
  catch(e) { console.log(`${e.name} [${e.campo}]: ${e.message}`); }
});


// PARTE 3: Re-lanzar selectivamente
// Escribe procesarPedido(pedido) que:
// - lanza ValidationError si el pedido no tiene items
// - lanza NotFoundError si algún item no existe en el catálogo
// - lanza cualquier otro error que reciba sin capturarlo
const catalogo = ["laptop","mouse","teclado","monitor"];
function procesarPedido(pedido) {
  // TU CÓDIGO AQUÍ
}


// PARTE 4: Helper safe() para async/await estilo Go
// Implementa safe(fn) que retorna [error, resultado]
async function safe(fn) {
  // TU CÓDIGO AQUÍ
}

const delay = (ms) => new Promise(r => setTimeout(r, ms));
const apiFallida = () => delay(100).then(() => { throw new Error("fallo de red"); });
const apiOk = () => delay(100).then(() => ({ datos: "ok" }));

(async () => {
  const [err1, data1] = await safe(apiOk);
  console.log(err1, data1); // null, { datos: "ok" }

  const [err2, data2] = await safe(apiFallida);
  console.log(err2?.message, data2); // "fallo de red", null
})();


// BONUS
// Escribe un wrapper reintentar(fn, n, delay) que reintente fn hasta n veces
// con espera de delay ms entre intentos, y solo si el error es NetworkError
