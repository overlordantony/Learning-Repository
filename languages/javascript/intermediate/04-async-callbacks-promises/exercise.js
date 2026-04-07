// 04 · Async: Callbacks y Promises — exercise.js

// PARTE 1: Event loop — predice el orden de salida
console.log("A");
setTimeout(() => console.log("B"), 0); 
Promise.resolve().then(() => console.log("C"));
console.log("D");
// ¿Qué se imprime y en qué orden? Escribe tu predicción como comentario antes de correr.
// PREDICCIÓN: A, D, C, B

// PARTE 2: Promisificar
// Convierte esta función con callback al estilo Promise
function obtenerUsuarioCB(id, callback) {
  setTimeout(() => {
    if (id <= 0) callback(new Error("ID inválido"), null);
    else callback(null, { id, nombre: "Usuario " + id, email: `user${id}@test.com` });
  }, 300);
}

function obtenerUsuarioP(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("ID inválido"));
      else resolve({ id, nombre: "Usuario " + id, email: `user${id}@test.com` });
    }, 300);
  });

}

obtenerUsuarioP(1).then(u => console.log(u)).catch(e => console.error(e.message));

// PARTE 3: Encadenar promesas
// Simula este flujo con promesas encadenadas (sin async/await):
// 1. obtenerUsuario(id)
// 2. Con el usuario, obtenerPostsDeUsuario(userId)
// 3. Con los posts, obtenerComentariosDelPrimerPost(postId)
// 4. Imprimir el resultado final
// Usa las funciones simuladas de abajo

const simularAPI = (datos, delay = 200, fallar = false) =>
  new Promise((resolve, reject) =>
    setTimeout(() => fallar ? reject(new Error("Error de red")) : resolve(datos), delay)
  );

const apiUsuario = (id) => simularAPI({ id, nombre: "Ana" });
const apiPosts   = (uid) => simularAPI([{ id: 10, titulo: "Post 1" }, { id: 11, titulo: "Post 2" }]);
const apiComents = (pid) => simularAPI([{ texto: "Gran post!" }, { texto: "Interesante" }]);

// (solo .then/.catch, sin async/await)
apiUsuario(1)
  .then(user => {
    console.log("Usuario:", user);
    return apiPosts(user.id);
  })
  .then(posts => {
    console.log("Posts:", posts);
    return apiComents(posts[0].id);
  })
  .then(comentarios => {
    console.log("Comentarios:", comentarios);
  })
  .catch(err => {
    console.error("Error:", err.message);
  });


// PARTE 4: Promise.all vs Promise.allSettled
// Tienes 3 llamadas API: una falla. 
// Primero usa Promise.all y observa qué pasa.
// Luego usa Promise.allSettled y maneja cada resultado individualmente.

const llamada1 = simularAPI({ servicio: "usuarios", ok: true });
const llamada2 = simularAPI(null, 200, true); // esta falla
const llamada3 = simularAPI({ servicio: "productos", ok: true });

// Promise.all — falla todo si una falla
Promise.all([llamada1, llamada2, llamada3])
  .then(resultados => {
    console.log("Resultados con Promise.all:", resultados);
  })
  .catch(error => {
    console.error("Error con Promise.all:", error.message);
  }); 

// Promise.allSettled — maneja cada resultado
Promise.allSettled([
  simularAPI({ servicio: "usuarios", ok: true }),
  simularAPI(null, 200, true), // esta falla
  simularAPI({ servicio: "productos", ok: true })
]).then(results => {
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Llamada ${index + 1} exitosa:`, result.value);
    } else {
      console.error(`Llamada ${index + 1} fallida:`, result.reason.message);
    }
  });
});


// BONUS: timeout con Promise.race
// Escribe conTimeout(promise, ms) que rechaza si la promise tarda más de ms
function conTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout de ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}
