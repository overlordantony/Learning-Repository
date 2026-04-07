# 02 · Memory y Performance

## Garbage Collector en JS
JS usa GC automático (principalmente mark-and-sweep).
Un objeto es elegible para GC cuando ya no hay referencias alcanzables a él.

## Memory leaks comunes

### 1. Event listeners no removidos
```js
function setup() {
  const btn = document.getElementById("btn");
  const datos = new Array(10000).fill("datos");
  btn.addEventListener("click", () => console.log(datos)); // closure retiene datos
  // si no se remueve, datos nunca se libera aunque setup() termine
}
// Solución: guardar ref y remover
const handler = () => console.log(datos);
btn.addEventListener("click", handler);
// Al limpiar:
btn.removeEventListener("click", handler);
```

### 2. Timers no limpiados
```js
const id = setInterval(() => { procesarDatos(datos); }, 1000);
// Si no se llama clearInterval(id), datos vive para siempre
```

### 3. Closures que retienen objetos grandes
```js
function crearHandler(elemento) {
  const datos = obtenerDatosGrandes(); // 10MB
  return function() { return datos.length; }; // datos queda vivo
}
```

### 4. Objetos en caché sin límite
```js
const cache = {};
// Sin límite de tamaño, crece indefinidamente
cache[key] = datos;
```

## WeakRef y FinalizationRegistry
Para referencias "débiles" que no impiden el GC.
```js
const ref = new WeakRef(objeto);
const obj = ref.deref(); // null si ya fue recolectado

const registry = new FinalizationRegistry((key) => {
  cache.delete(key); // limpiar cuando el objeto es recolectado
});
registry.register(objeto, cacheKey);
```

## WeakMap y WeakSet
Las claves (WeakMap) o valores (WeakSet) son referencias débiles.
Útil para asociar datos a objetos sin impedir que sean recolectados.
```js
const metadatos = new WeakMap();
metadatos.set(dom_element, { vistas: 0 });
// Cuando el elemento DOM se elimina, el metadato también desaparece
```

## Profiling en DevTools
1. Memory tab → Heap snapshot → compara antes/después de una acción
2. Performance tab → Record → busca long tasks y GC pauses
3. `console.memory` (Chrome) → heapUsed, heapTotal

## Optimizaciones comunes

### Debounce y Throttle
```js
// Debounce: espera N ms después de la última llamada
const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

// Throttle: máximo una llamada cada N ms
const throttle = (fn, ms) => {
  let ultimo = 0;
  return (...args) => {
    const ahora = Date.now();
    if (ahora - ultimo >= ms) { ultimo = ahora; fn(...args); }
  };
};
```

### DocumentFragment para batch DOM
```js
const frag = document.createDocumentFragment();
items.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  frag.appendChild(li);
});
lista.appendChild(frag); // un solo reflow
```

## Referencias
- MDN Memory Management: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management
