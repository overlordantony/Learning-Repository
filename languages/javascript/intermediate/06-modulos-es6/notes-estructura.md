# 06 · Estructura de archivos del ejercicio

Este ejercicio usa múltiples archivos para simular un sistema modular real.
Puedes correrlo en Node con `node --experimental-vm-modules` o en el browser con `type="module"`.

```
06-modulos-es6/
├── src/
│   ├── math.js         ← named exports de utilidades matemáticas
│   ├── formatters.js   ← named exports de formateo
│   ├── logger.js       ← default export de logger
│   └── index.js        ← barril de re-exports
├── exercise.js         ← importa y usa los módulos
└── solution/           ← implementación completa
    ├── math.js
    ├── formatters.js
    ├── logger.js
    ├── index.js
    └── main.js
```
