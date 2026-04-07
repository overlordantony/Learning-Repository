# 03 · Design Patterns — Bugs

## Bug 1: Observer sin unsubscribe → memory leak
```js
// Si agregas listeners y nunca los remueves, los callbacks retienen
// referencias a closures grandes → leak.
// Siempre retornar unsubscribe y llamarlo en cleanup.
```

## Bug 2: Singleton y módulos ES6
En módulos ES6 la instancia del módulo ya actúa como singleton.
Crear un patrón Singleton explícito encima puede ser redundante y confuso.
Preferir: exportar el objeto directamente desde el módulo.

## Bug 3: Command que no snapshottea estado correctamente
Si el command guarda referencia al estado en vez de una copia,
al deshacer puede encontrar un estado ya mutado.
Para objetos complejos, guardar una copia profunda: `structuredClone(estado)`.

## Bug 4: withCache y argumentos que son objetos
`JSON.stringify({a:1,b:2})` y `JSON.stringify({b:2,a:1})` dan strings diferentes.
Para cache robusto, normalizar el orden de las claves antes de serializar.

## Notas personales
