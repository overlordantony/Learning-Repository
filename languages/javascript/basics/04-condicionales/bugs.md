# 04 · Condicionales — Bugs & Errores comunes

## Bug 1: Olvidar break en switch
```js
switch(x) {
  case 1: console.log("uno"); // sin break — cae al siguiente
  case 2: console.log("dos"); // esto también se ejecuta si x === 1
}
```

## Bug 2: TypeError con optional chaining ausente
```js
const user = null;
user.nombre;       // TypeError: Cannot read properties of null
user?.nombre;      // undefined — seguro
```

## Bug 3: if anidado en vez de guard clause
Los ifs muy anidados ("pirámide de la perdición") son difíciles de leer y mantener.
Preferir guard clauses que salgan temprano con return/throw.

## Notas personales
