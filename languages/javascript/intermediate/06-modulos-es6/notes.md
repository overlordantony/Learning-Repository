# 06 · Módulos ES6

## ¿Por qué módulos?
Antes de ES6 no había sistema de módulos nativo. Se usaban IIFEs o CommonJS (require).
ES6 introduce import/export como parte del lenguaje.

## Named exports
```js
// math.js
export const PI = 3.14159;
export function suma(a, b) { return a + b; }
export class Vector { constructor(x,y){ this.x=x; this.y=y; } }
```

## Default export
Un módulo puede tener un solo export default.
```js
// logger.js
export default function log(msg) { console.log(`[LOG] ${msg}`); }
```

## Importar
```js
// Named — el nombre debe coincidir (o usar alias)
import { suma, PI } from "./math.js";
import { suma as add } from "./math.js"; // alias

// Default — cualquier nombre
import log from "./logger.js";
import miLog from "./logger.js"; // también válido

// Todo el módulo como namespace
import * as Math from "./math.js";
Math.suma(1,2);

// Mezcla default + named
import log, { PI } from "./combo.js";
```

## Re-exports
```js
// index.js — barril de exportaciones
export { suma, PI } from "./math.js";
export { default as log } from "./logger.js";
export * from "./utils.js";
```

## Dynamic import (import())
Carga módulos de forma lazy — útil para code splitting.
```js
async function cargarPlugin(nombre) {
  const modulo = await import(`./plugins/${nombre}.js`);
  modulo.default.init();
}
```

## Características de los módulos ES6
- **Strict mode** por defecto
- **Una sola ejecución**: el módulo se ejecuta una sola vez aunque se importe muchas veces
- **Live bindings**: los named exports son vistas vivas, no copias
- **Scoped**: las variables no se filtran al scope global

## Módulos en el browser
```html
<script type="module" src="main.js"></script>
<!-- Los módulos se difieren automáticamente (como defer) -->
```

## CommonJS vs ES Modules
| | CommonJS (Node) | ES Modules |
|---|---|---|
| Sintaxis | require/module.exports | import/export |
| Carga | Síncrona | Asíncrona |
| Análisis | Runtime | Estático (build time) |
| Tree shaking | No | Sí |

## Referencias
- MDN Modules: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules
