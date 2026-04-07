# 10 · Proyecto de Integración

## Objetivo
Construir una mini-app de gestión de tareas (Task Manager) que integre
los conceptos de los 9 ejercicios anteriores en un sistema cohesionado.

## Lo que se aplica aquí

| Concepto | Dónde |
|----------|-------|
| Event Loop / async | fetch de datos, operaciones async |
| Memory / Performance | debounce en búsqueda, LRU cache |
| Design Patterns | Observer (EventBus), Repository, Singleton (Config) |
| Metaprogramación | Symbol.iterator en TaskList, Proxy para validación |
| Módulos ES6 | arquitectura multi-archivo |
| Error Handling | errores custom, try/catch en toda la capa async |
| Iterators/Generators | generador de IDs, paginación |
| Arquitectura Modular | Container DI, Repository, Plugin System |
| Testing | tests unitarios del core con el mini-framework |
| Seguridad | sanitización de inputs, validación |

## Arquitectura del proyecto
```
task-manager/
├── core/
│   ├── Task.js           ← clase con validación (Proxy)
│   ├── TaskRepository.js ← InMemory + interfaz para swap
│   ├── TaskService.js    ← lógica de negocio
│   └── EventBus.js       ← comunicación entre módulos
├── plugins/
│   ├── LoggerPlugin.js
│   └── PersistencePlugin.js
├── utils/
│   ├── validators.js     ← sanitización y validación
│   ├── idGenerator.js    ← generator de IDs
│   └── cache.js          ← LRU cache
├── container.js          ← DI Container
├── app.js                ← punto de entrada
└── tests/
    └── taskService.test.js
```

## Requerimientos funcionales
1. Crear tareas con: título, descripción, prioridad (alta/media/baja), tags[]
2. Listar tareas con filtros: por estado, prioridad, tag, búsqueda de texto
3. Actualizar estado: pendiente → en_progreso → completada
4. Eliminar tareas
5. Paginación de resultados
6. Búsqueda con debounce
7. Cache de resultados de búsqueda (LRU)

## Requerimientos técnicos
- No frameworks, vanilla JS
- Async/await en toda la capa de datos
- Errores custom (TaskNotFoundError, ValidationError)
- EventBus para notificaciones de cambios
- Todos los inputs del usuario sanitizados
- Tests del TaskService con mocks
