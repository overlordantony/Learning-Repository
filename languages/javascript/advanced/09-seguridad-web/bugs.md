# 09 · Seguridad Web — Bugs

## Bug 1: Usar indexOf para detectar XSS
```js
// MAL — bypaseable con encoding, capitalización, etc.
if (input.indexOf("<script>") !== -1) rechazar(input);
// BIEN — sanitizar siempre, no intentar detectar el payload
elemento.textContent = input; // o sanitizar con DOMPurify
```

## Bug 2: Confiar en validación del cliente
```js
// La validación del cliente (browser) es solo UX
// SIEMPRE re-validar en el servidor
// Un atacante puede enviar requests directamente sin pasar por el form
```

## Bug 3: Tokens CSRF en localStorage
```js
// MAL — accesible por XSS
localStorage.setItem("csrf", token);
// BIEN — en cookie httpOnly o en el DOM (doble submit cookie pattern)
```

## Bug 4: Regex de validación que no ancla inicio y fin
```js
// MAL — pasa: "  <script>valid@email.com</script>"
/\w+@\w+\.\w+/.test(input)
// BIEN — anclar con ^ y $
/^\w+@\w+\.\w+$/.test(input)
```

## Notas personales
