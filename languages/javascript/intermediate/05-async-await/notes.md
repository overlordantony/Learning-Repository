# 05 · Async/Await

## ¿Qué es async/await?
Azúcar sintáctico sobre Promises. Permite escribir código asíncrono
con apariencia síncrona, sin anidar .then().

```js
async function obtenerDatos() {
  const res = await fetch("/api/data");
  const data = await res.json();
  return data; // la función retorna una Promise<data>
}
```

## Reglas clave
- `async` convierte la función en una que siempre retorna una Promise.
- `await` solo puede usarse dentro de una función `async`.
- `await` pausa la ejecución de ESA función, no del hilo completo.

## Manejo de errores
```js
// try/catch
async function cargar(id) {
  try {
    const res = await fetch(`/api/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error:", err.message);
    return null;
  }
}

// Con .catch() en la llamada
const datos = await cargar(1).catch(err => null);
```

## Secuencial vs paralelo

### Secuencial (una espera a la otra — más lento)
```js
const a = await fetchA(); // espera
const b = await fetchB(); // luego espera
// tiempo total: timeA + timeB
```

### Paralelo (ambas corren a la vez — más rápido)
```js
const [a, b] = await Promise.all([fetchA(), fetchB()]);
// tiempo total: max(timeA, timeB)
```

### Error común: await en loop
```js
// MAL — secuencial (espera cada una)
for (const id of ids) {
  const dato = await fetchDato(id);
}

// BIEN — paralelo
const datos = await Promise.all(ids.map(id => fetchDato(id)));
```

## Top-level await (ES2022)
En módulos ES6, puedes usar await en el nivel raíz sin async:
```js
// solo en módulos (.mjs o type="module")
const config = await fetch("/config").then(r => r.json());
```

## async IIFE
Para usar await fuera de módulos en entornos más viejos:
```js
(async () => {
  const datos = await obtenerDatos();
  console.log(datos);
})();
```

## Referencias
- MDN async/await: https://developer.mozilla.org/es/docs/Learn/JavaScript/Asynchronous/Promises
