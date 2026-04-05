# 02 · Tipos de datos — Bugs & Errores comunes

## Bug 1: typeof null === "object"
**Por qué pasa:** Es un bug histórico de JS desde 1995 que nunca se corrigió por compatibilidad.  
**Cómo detectar null correctamente:**
```js
valor === null  // única forma confiable
```

## Bug 2: Coerción con + vs otros operadores
**Trampa:** `+` con un string concatena, los demás operadores (`-`, `*`, `/`) convierten a número.
```js
"5" + 3  // "53"  ← concatena
"5" - 3  // 2     ← convierte
```
**Solución:** Convertir explícitamente con `Number()` antes de operar.

## Bug 3: isNaN() vs Number.isNaN()
```js
isNaN("hola")         // true  — convierte "hola" a NaN primero, luego chequea
Number.isNaN("hola")  // false — "hola" no ES NaN, es un string
```
**Regla:** Usar siempre `Number.isNaN()` para mayor precisión.

## Bug 4: [] == false es true
```js
[] == false  // true
```
JS convierte `[]` a `""`, luego a `0`, y `false` también a `0`. Por eso son iguales con `==`.  
**Solución:** Usar siempre `===`.

## Notas personales
_Espacio para anotar tus propios bugs mientras resuelves el ejercicio._
