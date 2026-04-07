// 05 · Concurrencia y Workers — exercise.js
// Nota: Los Web Workers necesitan contexto de browser o Worker-compatible de Node.
// Los ejercicios 1-3 simulan el patrón; el 4-5 son para browser real.

// PARTE 1: Simular comunicación Worker con EventEmitter
// Implementa FakeWorker que simula postMessage/onmessage
// con setTimeout para asincronía, sin un archivo separado
class FakeWorker {
  constructor(fn) {
    // fn es la función que corre "en el worker"
    // TU CÓDIGO AQUÍ
    // Debe exponer: postMessage(data), onmessage, onerror, terminate()
  }
}
const workerSuma = new FakeWorker((data) => {
  return data.reduce((a, b) => a + b, 0);
});
workerSuma.onmessage = (e) => console.log("Resultado:", e.data);
workerSuma.postMessage([1, 2, 3, 4, 5]); // Resultado: 15


// PARTE 2: Offload de tarea pesada
// Implementa ejecutarEnWorker(fn, datos) que:
// - serializa la función como string
// - crea un inline Worker con Blob (en browser) o FakeWorker (en Node)
// - retorna una Promise con el resultado
async function ejecutarEnWorker(fn, datos) {
  // TU CÓDIGO AQUÍ
}

// Función pesada (simula trabajo CPU-intensivo)
const calcularPrimos = (limite) => {
  const primos = [];
  for (let n=2; n<=limite; n++) {
    if (Array.from({length:n-2},(_,i)=>i+2).every(i=>n%i!==0)) primos.push(n);
  }
  return primos;
};
// ejecutarEnWorker(calcularPrimos, 100).then(primos => console.log(primos.length));


// PARTE 3: Worker Pool
// Implementa WorkerPool(tamano, fn) donde fn es la función del worker
// Pool debe: gestionar N workers, encolar tareas cuando todos están ocupados
class WorkerPool {
  constructor(tamano, fn) {
    // TU CÓDIGO AQUÍ
  }
  ejecutar(datos) {
    // retorna Promise con el resultado
    // TU CÓDIGO AQUÍ
  }
  terminar() {
    // limpia todos los workers
    // TU CÓDIGO AQUÍ
  }
}

const pool = new WorkerPool(3, (n) => n * n);
Promise.all([1,2,3,4,5,6].map(n => pool.ejecutar(n)))
  .then(resultados => { console.log(resultados); pool.terminar(); });


// PARTE 4: Transferable Objects (para browser)
// Escribe código que transfiera un ArrayBuffer grande al worker sin copiarlo
// Mide el tiempo con y sin transfer para comparar
/*
const buffer = new ArrayBuffer(50 * 1024 * 1024); // 50MB
console.time("con transfer");
worker.postMessage(buffer, [buffer]); // zero-copy
console.timeEnd("con transfer");

const buffer2 = new ArrayBuffer(50 * 1024 * 1024);
console.time("sin transfer");
worker.postMessage(buffer2); // copia el buffer
console.timeEnd("sin transfer");
*/


// PARTE 5: Arquitectura producer-consumer con Worker
// Diseña (en comentarios o pseudocódigo) cómo implementarías:
// - Main thread: genera 1000 tareas y las manda al pool
// - 4 Workers: procesan tareas en paralelo
// - Main thread: recibe resultados conforme llegan (no espera todos)
// - Progress bar: muestra % completado en tiempo real
// Escribe el diseño como comentario detallado y luego implementa lo que puedas
