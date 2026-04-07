# 06 · Módulos ES6 — Bugs

## Bug 1: Importar default como named
```js
// logger.js: export default logger
import { logger } from "./logger.js"; // undefined — es default, no named
import logger from "./logger.js";     // correcto
```

## Bug 2: Extensión omitida en el browser
```js
import { suma } from "./math"; // error en browser — necesita .js
import { suma } from "./math.js"; // correcto
```

## Bug 3: Circular imports
Si A importa B y B importa A, puede haber valores undefined al inicializar.
Solución: extraer la dependencia compartida a un tercer módulo C.

## Bug 4: Módulo ejecutado múltiples veces
Los módulos ES6 se cachean — se ejecutan una sola vez.
Si necesitas múltiples instancias, exporta una factory function, no el estado directamente.

## Notas personales
