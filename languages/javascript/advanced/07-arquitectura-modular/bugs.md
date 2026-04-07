# 07 · Arquitectura Modular — Bugs

## Bug 1: Event Bus con typos en nombre de eventos
```js
bus.emit("usuario:logim", data); // typo — nadie lo recibe, falla silencioso
// Solución: definir constantes para los nombres de eventos
export const EVENTOS = { LOGIN:"usuario:login", LOGOUT:"usuario:logout" };
bus.emit(EVENTOS.LOGIN, data);
```

## Bug 2: DI circular
Si A depende de B y B depende de A, el Container lanza stack overflow al resolver.
Solución: inyectar como factory (() => container.resolve("B")) en vez de valor directo.

## Bug 3: Repository que retorna referencias mutables
```js
async findAll() { return this.#datos; } // expone el array interno
// Siempre retornar copias: return [...this.#datos]
```

## Bug 4: Plugin que modifica internos de la app
Un plugin no debería tener acceso al estado interno de la app.
La API que se le pasa al plugin (app) debe ser una fachada limitada.

## Notas personales
