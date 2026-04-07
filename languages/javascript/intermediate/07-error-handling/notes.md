# 07 · Error Handling

## Tipos de errores nativos
```js
new Error("mensaje genérico")
new TypeError("tipo incorrecto")
new RangeError("fuera de rango")
new ReferenceError("variable no existe")
new SyntaxError("sintaxis inválida")
new URIError("URI malformada")
```

## try / catch / finally
```js
try {
  // código que puede fallar
} catch (err) {
  console.error(err.name);    // "TypeError"
  console.error(err.message); // descripción
  console.error(err.stack);   // stack trace
} finally {
  // siempre se ejecuta, con o sin error
  // ideal para cleanup: cerrar conexiones, liberar recursos
}
```

## Errores custom
```js
class ValidationError extends Error {
  constructor(campo, mensaje) {
    super(mensaje);
    this.name = "ValidationError";
    this.campo = campo;
  }
}

class NotFoundError extends Error {
  constructor(recurso, id) {
    super(`${recurso} con id ${id} no encontrado`);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

// Uso
try {
  throw new ValidationError("email", "Formato inválido");
} catch(err) {
  if (err instanceof ValidationError) {
    console.log(`Campo: ${err.campo}`);
  } else {
    throw err; // re-lanzar si no sabes manejarlo
  }
}
```

## Re-lanzar errores
Una buena práctica: captura solo los errores que puedes manejar.
```js
try {
  hacerAlgo();
} catch(err) {
  if (err instanceof NetworkError) {
    retry();
  } else {
    throw err; // re-lanzar el resto
  }
}
```

## Error handling en async/await
```js
// Opción 1: try/catch
async function cargar() {
  try {
    const data = await fetch("/api");
    return await data.json();
  } catch(err) {
    // captura errores de red Y de parseo
  }
}

// Opción 2: .catch() en la llamada
const data = await cargar().catch(err => defaultValue);

// Opción 3: helper "resultado o error" estilo Go
async function safe(fn) {
  try { return [null, await fn()]; }
  catch(err) { return [err, null]; }
}
const [err, data] = await safe(() => fetch("/api").then(r => r.json()));
```

## Error boundaries (concepto)
En frontends (React) y sistemas más complejos, los errores
se propagan hacia arriba hasta encontrar un manejador.
En Node.js: process.on("uncaughtException") / process.on("unhandledRejection").

## Referencias
- MDN Error: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Error
