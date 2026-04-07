# 09 · Seguridad Web

## XSS — Cross-Site Scripting
Inyectar código malicioso en una página que otros usuarios ven.

### Tipos
- **Stored XSS**: el payload se guarda en la DB y se sirve a todos
- **Reflected XSS**: el payload va en la URL y se refleja en la respuesta
- **DOM XSS**: el payload manipula el DOM directamente desde JS (sin pasar por servidor)

### Prevención
```js
// MAL — innerHTML con datos no sanitizados
elemento.innerHTML = datosDelUsuario;

// BIEN — textContent para texto plano
elemento.textContent = datosDelUsuario;

// BIEN — si necesitas HTML, sanitizar primero
function sanitizar(str) {
  return str
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#x27;");
}
elemento.innerHTML = sanitizar(datosDelUsuario);

// MEJOR — usar DOMPurify en producción
elemento.innerHTML = DOMPurify.sanitize(datosDelUsuario);
```

---

## CSP — Content Security Policy
Header HTTP que define qué recursos puede cargar la página.
```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.trusted.com
```
Previene XSS incluso si hay una vulnerabilidad — los scripts inyectados no corren.

---

## CSRF — Cross-Site Request Forgery
Un sitio malicioso hace que el browser del usuario envíe requests a tu sitio.
```html
<!-- En el sitio malicioso: -->
<img src="https://tusite.com/api/transferir?monto=1000&a=hacker">
```

### Prevención
- **SameSite cookies**: `Set-Cookie: session=xxx; SameSite=Strict`
- **CSRF token**: token único por sesión que debe incluirse en requests mutantes
- **Verificar Origin/Referer** headers

---

## eval() y Function() — peligrosos
```js
eval(inputDelUsuario);             // NUNCA
new Function("return " + input)(); // NUNCA
setTimeout(inputDelUsuario, 0);    // NUNCA — acepta string como código

// Alternativas seguras:
JSON.parse(jsonString);            // para datos JSON
// Usar un parser dedicado para expresiones matemáticas, etc.
```

---

## Prototype Pollution
Contaminar Object.prototype con propiedades maliciosas.
```js
// Input malicioso:
JSON.parse('{"__proto__":{"isAdmin":true}}');
// Si se hace: Object.assign(target, malintencionado)
// Todos los objetos ahora tienen isAdmin:true

// Prevención:
const obj = Object.create(null); // sin prototype
JSON.parse(input, (key,val) => key==="__proto__" ? undefined : val); // sanitizar
```

---

## Gestión segura de datos sensibles
```js
// MAL — datos en localStorage (accesible por cualquier JS en la página)
localStorage.setItem("token", jwtToken);

// MEJOR — httpOnly cookie (no accesible desde JS)
// Configurado desde el servidor: Set-Cookie: token=xxx; HttpOnly; Secure; SameSite=Strict

// MAL — loguear datos sensibles
console.log("Login:", { username, password }); // password en logs

// MAL — token en URL
fetch(`/api?token=${secretToken}`); // queda en logs de servidor y browser history
```

---

## subresource integrity (SRI)
Verificar que los scripts externos no fueron modificados.
```html
<script src="https://cdn.example.com/lib.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous"></script>
```

## Referencias
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- MDN Security: https://developer.mozilla.org/en-US/docs/Web/Security
