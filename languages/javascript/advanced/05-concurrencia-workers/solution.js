// 05 · Concurrencia y Workers — solution.js

// PARTE 1
class FakeWorker {
  constructor(fn) {
    this._fn = fn;
    this.onmessage = null;
    this.onerror = null;
    this._terminado = false;
  }
  postMessage(data) {
    if (this._terminado) return;
    setTimeout(() => {
      try {
        const resultado = this._fn(data);
        if (this.onmessage) this.onmessage({ data: resultado });
      } catch(err) {
        if (this.onerror) this.onerror(err);
      }
    }, 0);
  }
  terminate() { this._terminado = true; }
}

// PARTE 2
async function ejecutarEnWorker(fn, datos) {
  return new Promise((resolve, reject) => {
    // En Node: usamos FakeWorker. En browser real: usaríamos Blob + Worker.
    const worker = new FakeWorker(fn);
    worker.onmessage = (e) => resolve(e.data);
    worker.onerror = (e) => reject(e);
    worker.postMessage(datos);
  });
}

// PARTE 3
class WorkerPool {
  constructor(tamano, fn) {
    this._workers = Array.from({length:tamano}, () => ({
      worker: new FakeWorker(fn),
      libre: true
    }));
    this._cola = [];
  }
  ejecutar(datos) {
    return new Promise((resolve, reject) => {
      const libre = this._workers.find(w => w.libre);
      if (libre) this._despachar(libre, datos, resolve, reject);
      else this._cola.push({ datos, resolve, reject });
    });
  }
  _despachar(slot, datos, resolve, reject) {
    slot.libre = false;
    slot.worker.onmessage = (e) => {
      resolve(e.data);
      slot.libre = true;
      if (this._cola.length > 0) {
        const { datos:d, resolve:r, reject:rj } = this._cola.shift();
        this._despachar(slot, d, r, rj);
      }
    };
    slot.worker.onerror = (e) => { reject(e); slot.libre = true; };
    slot.worker.postMessage(datos);
  }
  terminar() { this._workers.forEach(s => s.worker.terminate()); }
}

// PARTE 5: Diseño producer-consumer
/*
ARQUITECTURA:
main.js:
  1. Crear WorkerPool(4, procesarTarea)
  2. Generar 1000 tareas con IDs únicos
  3. Enviar todas al pool → pool las encola internamente
  4. Cada worker.onmessage actualiza el contador de completadas
  5. (completadas / 1000) * 100 = progreso
  6. Renderizar progress bar en requestAnimationFrame para no bloquear UI

worker.js:
  self.onmessage = ({ data }) => {
    const resultado = procesarTarea(data);
    self.postMessage({ id: data.id, resultado });
  };

main.js (con progreso):
  let completadas = 0;
  const promesas = tareas.map(t => pool.ejecutar(t).then(r => {
    completadas++;
    actualizarProgressBar(completadas / tareas.length * 100);
    return r;
  }));
  await Promise.all(promesas);
*/
