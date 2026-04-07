# 07 · Error Handling — Bugs

## Bug 1: Capturar todos los errores sin re-lanzar
```js
try { hacerTodo(); }
catch(e) { console.error(e); } // traga errores inesperados en silencio
// Solo capturar lo que puedes manejar. Re-lanzar el resto.
```

## Bug 2: Perder el stack trace al re-lanzar
```js
catch(err) { throw new Error("algo falló"); } // nuevo error, stack trace perdido
catch(err) { throw err; }                      // conserva el stack original
```

## Bug 3: finally con return sobrescribe el valor del try
```js
function ejemplo() {
  try { return "try"; }
  finally { return "finally"; } // "finally" — sobrescribe el return del try
}
```

## Bug 4: instanceof falla entre realms
Si un Error viene de un iframe o worker diferente, instanceof puede dar false.
Usar err.name === "ValidationError" como alternativa.

## Notas personales
