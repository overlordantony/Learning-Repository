# 10 · DOM Básico

## ¿Qué es el DOM?
Document Object Model — representación en árbol del HTML de una página.
JS puede leer y modificar este árbol en tiempo real.

---

## Seleccionar elementos

```js
// Un solo elemento (el primero que coincida)
document.querySelector(".clase")
document.querySelector("#id")
document.querySelector("p")
document.getElementById("mi-id")      // más rápido, solo por id

// Múltiples elementos (retornan NodeList o HTMLCollection)
document.querySelectorAll(".items")   // NodeList estática
document.getElementsByClassName("clase") // HTMLCollection viva
```

### querySelector vs getElementById
Usar `querySelector` por consistencia. `getElementById` es marginalmente más rápido.

---

## Leer y modificar contenido

```js
el.textContent        // texto plano (sin HTML)
el.innerHTML          // contenido HTML (cuidado con XSS)
el.textContent = "nuevo texto"
el.innerHTML = "<strong>bold</strong>"
```

---

## Atributos y clases

```js
el.getAttribute("href")
el.setAttribute("href", "https://...")
el.removeAttribute("disabled")

el.classList.add("activo")
el.classList.remove("activo")
el.classList.toggle("activo")
el.classList.contains("activo")  // boolean
```

---

## Estilos

```js
el.style.color = "red";
el.style.fontSize = "16px";    // camelCase, no kebab-case
// Preferir manipular clases en vez de estilos inline
```

---

## Crear y eliminar elementos

```js
const div = document.createElement("div");
div.textContent = "nuevo elemento";
div.classList.add("card");

// Insertar
padre.appendChild(hijo);             // al final
padre.insertBefore(nuevo, referencia); // antes de referencia
padre.prepend(hijo);                 // al inicio
padre.append(hijo);                  // al final (acepta strings también)
referencia.after(nuevo);             // después del elemento
referencia.before(nuevo);            // antes del elemento

// Eliminar
el.remove();                         // elimina el elemento mismo
padre.removeChild(hijo);             // elimina hijo del padre
```

---

## Eventos

```js
el.addEventListener("click", function(event) {
  console.log(event.target); // el elemento que disparó el evento
});

// Remover listener (necesitas referencia a la función)
function handler(e) { ... }
el.addEventListener("click", handler);
el.removeEventListener("click", handler);
```

### Eventos comunes
```
click, dblclick
mouseover, mouseout, mousemove
keydown, keyup, keypress
submit, change, input, focus, blur
DOMContentLoaded, load
```

### Event delegation
En vez de agregar listener a cada hijo, agrega uno al padre y usa `event.target`.
```js
lista.addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("clickeaste:", e.target.textContent);
  }
});
```

### Prevenir comportamiento por defecto
```js
form.addEventListener("submit", (e) => {
  e.preventDefault(); // evita que el form recargue la página
});
```

---

## Referencias
- MDN DOM: https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model
- MDN Events: https://developer.mozilla.org/es/docs/Web/Events
