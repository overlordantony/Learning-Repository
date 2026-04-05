# 10 · DOM Básico — Bugs & Errores comunes

## Bug 1: querySelector retorna null
```js
const el = document.querySelector("#no-existe");
el.textContent = "hola"; // TypeError: Cannot set properties of null
```
Siempre verificar: `if (el) el.textContent = "hola";`
O asegurarse de que el script corre DESPUÉS de que el HTML existe
(poner el script al final del body, o usar DOMContentLoaded).

## Bug 2: Script corre antes del DOM
```js
// En el <head> sin defer:
const btn = document.querySelector("#btn"); // null — el elemento no existe aún
```
Soluciones:
- Poner el `<script>` antes de `</body>`
- Usar `<script defer>`
- Envolver en `document.addEventListener("DOMContentLoaded", () => { ... })`

## Bug 3: innerHTML y XSS
```js
el.innerHTML = inputUsuario; // PELIGROSO si el input viene del usuario
// Un input malicioso: <script>robarCookies()</script>
// Usar textContent para texto plano
```

## Bug 4: Agregar listener dentro de un loop sin delegation
```js
items.forEach(item => {
  item.addEventListener("click", handler); // un listener por elemento
});
// Con event delegation: un solo listener en el padre
```

## Bug 5: removeEventListener requiere la misma referencia
```js
el.addEventListener("click", () => console.log("click")); // función anónima
el.removeEventListener("click", () => console.log("click")); // NO funciona
// Las funciones anónimas son objetos diferentes cada vez
// Solución: guardar la referencia
const handler = () => console.log("click");
el.addEventListener("click", handler);
el.removeEventListener("click", handler); // ahora sí
```

## Notas personales
