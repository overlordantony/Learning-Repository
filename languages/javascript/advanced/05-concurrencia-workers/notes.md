# 05 · Concurrencia y Web Workers

## El problema del main thread
JS es single-threaded. Todo el código de UI, eventos y lógica corre en el mismo hilo.
Una tarea pesada (parsear 500MB de JSON, procesar imágenes) bloquea todo.

---

## Web Workers
Hilo separado real. Se comunica con el main thread por mensajes.
No tiene acceso a DOM, window, ni el scope del main thread.

```js
// worker.js
self.addEventListener("message", (e) => {
  const resultado = calcularPesado(e.data);
  self.postMessage(resultado);
});

// main.js
const worker = new Worker("worker.js");
worker.postMessage({ datos: [...] });
worker.addEventListener("message", (e) => {
  console.log("resultado:", e.data);
});
worker.addEventListener("error", (e) => console.error(e));
```

## Inline Worker (sin archivo separado)
```js
const codigo = `
  self.onmessage = (e) => {
    const resultado = e.data.reduce((a,b)=>a+b,0);
    self.postMessage(resultado);
  };
`;
const blob = new Blob([codigo], { type:"application/javascript" });
const worker = new Worker(URL.createObjectURL(blob));
```

## Transferable Objects
Para enviar datos grandes sin copiarlos (zero-copy transfer).
```js
const buffer = new ArrayBuffer(1024 * 1024); // 1MB
worker.postMessage(buffer, [buffer]); // transfiere propiedad
// buffer ya no es accesible en el main thread después del transfer
```

## SharedArrayBuffer + Atomics
Memoria compartida entre threads. Requiere headers COOP/COEP.
```js
// Crear memoria compartida
const sab = new SharedArrayBuffer(4); // 4 bytes
const view = new Int32Array(sab);

// En el worker: Atomics para operaciones atómicas thread-safe
Atomics.add(view, 0, 1);      // atomic increment
Atomics.load(view, 0);        // atomic read
Atomics.wait(view, 0, 0);     // espera hasta que view[0] !== 0
Atomics.notify(view, 0, 1);   // despierta un thread esperando
```

## Worker Pool
Para reutilizar workers sin crearlos por cada tarea.
```js
class WorkerPool {
  #workers = [];
  #cola = [];
  constructor(tamano, scriptUrl) {
    for (let i=0; i<tamano; i++) this.#workers.push({ w: new Worker(scriptUrl), libre: true });
  }
  ejecutar(datos) {
    return new Promise((resolve, reject) => {
      const libre = this.#workers.find(w => w.libre);
      if (libre) this.#despachar(libre, datos, resolve, reject);
      else this.#cola.push({ datos, resolve, reject });
    });
  }
  #despachar(worker, datos, resolve, reject) {
    worker.libre = false;
    worker.w.onmessage = (e) => {
      resolve(e.data);
      worker.libre = true;
      if (this.#cola.length) {
        const { datos:d, resolve:r, reject:rj } = this.#cola.shift();
        this.#despachar(worker, d, r, rj);
      }
    };
    worker.w.onerror = (e) => { reject(e); worker.libre = true; };
    worker.w.postMessage(datos);
  }
}
```

## Service Workers (mención)
Worker especial que intercepta requests de red. Base de las PWAs.
Maneja caché offline, push notifications, background sync.

## Referencias
- MDN Web Workers: https://developer.mozilla.org/es/docs/Web/API/Web_Workers_API
- MDN SharedArrayBuffer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
