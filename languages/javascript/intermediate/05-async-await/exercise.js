// 05 · Async/Await — exercise.js

// Helpers de simulación
const delay = (ms) => new Promise(r => setTimeout(r, ms));
const simAPI = (data, ms=200, fail=false) =>
  delay(ms).then(() => { if(fail) throw new Error("API error"); return data; });

// PARTE 1: Reescribe esta cadena de .then() usando async/await
function obtenerPerfilThen(userId) {
  return simAPI({ id: userId, nombre: "Ana" })
    .then(user => simAPI({ userId: user.id, posts: 12 }))
    .then(stats => ({ ...stats, cargado: true }));
}
// Reescríbela:
async function obtenerPerfil(userId) {
  const user = await simAPI({ id: userId, nombre: "Ana" });
  const stats = await simAPI({ userId: user.id, posts: 12 });
  return { ...stats, cargado: true };
}

obtenerPerfil(1).then(console.log);

// PARTE 2: Manejo de errores con try/catch
// Escribe cargarDatos(id) que:
// - haga fetch simulado (puede fallar si id < 0)
// - si falla, retorna { error: true, mensaje: err.message }
// - si ok, retorna los datos con { exito: true, ...datos }
async function cargarDatos(id) {
  try {
    const datos = await simAPI({ id, info: "ok" }, 200, id < 0);
    return { exito: true, ...datos };
  } catch (err) {
    return { error: true, mensaje: err.message };
  }
}
// Prueba con id positivo y negativo
cargarDatos(1).then(console.log);
cargarDatos(-1).then(console.log);



// PARTE 3: Secuencial vs Paralelo
// Tienes 3 llamadas API que tardan 300ms cada una
const apiA = () => simAPI({ servicio: "A" }, 300);
const apiB = () => simAPI({ servicio: "B" }, 300);
const apiC = () => simAPI({ servicio: "C" }, 300);

// 3a: Llama las 3 de forma SECUENCIAL y mide el tiempo total
async function secuencial() {
  console.time("secuencial");
  const a = await apiA();
  const b = await apiB();
  const c = await apiC();
  console.timeEnd("secuencial"); // ~900ms
  return [a, b, c];
}
secuencial().then(console.log);

// 3b: Llama las 3 de forma PARALELA y mide el tiempo total
async function paralela() {
  console.time("paralela");
  const [a, b, c] = await Promise.all([apiA(), apiB(), apiC()]);
  console.timeEnd("paralela"); // ~300ms
  return [a, b, c];
}
paralela().then(console.log);
// Corre ambas y compara tiempos con console.time/console.timeEnd

// PARTE 4: await en loop — la forma correcta
// Dado un array de IDs, obtén todos los usuarios en PARALELO
const ids = [1, 2, 3, 4, 5];
async function obtenerTodosLosUsuarios(ids) {
  return Promise.all(ids.map(id => simAPI({ id, nombre: `User${id}` })));
}
obtenerTodosLosUsuarios(ids).then(console.log);


// PARTE 5: retry con async/await
// Escribe intentarN(fn, intentos) que reintente fn hasta N veces si falla
// Si todos los intentos fallan, lanza el último error
async function intentarN(fn, intentos = 3) {
  let ultimoError;
  for (let i = 0; i < intentos; i++) {
    try {
      return await fn();
    } catch (err) {
      ultimoError = err;
      console.log(`Intento ${i + 1} fallido: ${err.message}`);
    }
  }
  throw ultimoError;
}

// Prueba: esta función falla las primeras 2 veces
let _llamadas = 0;
const flakyAPI = () => simAPI("ok", 100, ++_llamadas < 3);
intentarN(flakyAPI).then(r => console.log("Resultado:", r));


// BONUS: async IIFE
// Usa una async IIFE para cargar configuración y luego ejecutar una función principal
(async () => {
  console.log("Cargando configuración...");
  const config = await simAPI({ env: "production", version: "1.0" }, 500);
  console.log("Configuración cargada:", config);

  console.log("Obteniendo perfil de usuario...");
  const perfil = await obtenerPerfil(42);
  console.log("Perfil obtenido:", perfil);
})();
