# 10 · Proyecto de Integración — Ejercicio

El proyecto base está en los archivos de esta carpeta.
Tu trabajo es extenderlo con las siguientes funcionalidades:

## Tareas pendientes

### 1. Completar el PersistencePlugin
Crea `plugins/PersistencePlugin.js` que:
- Escucha eventos del bus (tarea:creada, tarea:actualizada, tarea:eliminada)
- Serializa el estado a JSON y lo guarda (simular con una variable en memoria)
- Expone un método `restaurar()` que reconstruye el repo desde el estado guardado

### 2. Agregar el método `estadisticas()` al TaskService
Retorna: total, por estado (pendiente/en_progreso/completada), por prioridad, top 3 tags

### 3. Implementar paginación en el listado
El método `listar()` ya soporta `pagina` y `porPagina`.
Crea una función helper `paginar(service, filtros, tamPagina)` que
retorne un generator que yield páginas de resultados.

### 4. Agregar validación con Proxy al crear tareas
Envuelve el objeto de datos antes de pasarlo al repositorio con un Proxy
que loguee cada acceso a propiedades durante la creación.

### 5. Escribir 5 tests adicionales
Agrega tests en `tests/taskService.test.js` que cubran:
- Búsqueda de texto
- Paginación (3 items, porPagina=2 → 2 páginas)
- Emisión de eventos al crear/eliminar
- Cache: segunda llamada idéntica no llama al repo
- Sanitización: título con HTML se sanitiza
