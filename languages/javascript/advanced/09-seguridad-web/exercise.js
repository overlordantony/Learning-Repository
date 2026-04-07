// 09 · Seguridad Web — exercise.js

// PARTE 1: Sanitización HTML
// Implementa sanitizarHTML(str) que escape los caracteres peligrosos
// Luego implementa sanitizarURL(url) que valide que sea http/https
function sanitizarHTML(str) {
  // TU CÓDIGO AQUÍ
}
function sanitizarURL(url) {
  // retorna la URL si es válida (http/https), null si no
  // previene javascript: URLs
  // TU CÓDIGO AQUÍ
}

console.log(sanitizarHTML('<script>alert("xss")</script>'));
// &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;
console.log(sanitizarURL("https://google.com"));    // "https://google.com"
console.log(sanitizarURL("javascript:alert(1)"));   // null
console.log(sanitizarURL("data:text/html,..."));     // null


// PARTE 2: Detectar prototype pollution
// Implementa esSeguro(obj) que detecta si un objeto contiene __proto__, constructor,
// o prototype como claves (indicio de prototype pollution attempt)
function esSeguro(obj) {
  // TU CÓDIGO AQUÍ — recursivo para objetos anidados
}
console.log(esSeguro({ nombre:"Ana", edad:28 }));                 // true
console.log(esSeguro({ "__proto__": { isAdmin:true } }));          // false
console.log(esSeguro({ datos: { "constructor": { evil:true } } })); // false

// Implementa parsearSeguro(jsonStr) que parsea JSON pero bloquea prototype pollution
function parsearSeguro(jsonStr) {
  // TU CÓDIGO AQUÍ
}
parsearSeguro('{"__proto__":{"isAdmin":true}}'); // lanza Error o retorna null


// PARTE 3: CSRF token simple
// Implementa un generador/validador de CSRF tokens
const csrfManager = {
  _tokens: new Map(),
  generarToken(sessionId) {
    // TU CÓDIGO AQUÍ — genera token random, lo asocia a sessionId, expira en 30min
  },
  validarToken(sessionId, token) {
    // TU CÓDIGO AQUÍ — retorna true si válido y no expirado, false si no
  }
};

const token = csrfManager.generarToken("session_abc");
console.log(csrfManager.validarToken("session_abc", token));   // true
console.log(csrfManager.validarToken("session_abc", "fake"));  // false
console.log(csrfManager.validarToken("otra_session", token));  // false


// PARTE 4: eval seguro para expresiones matemáticas
// Implementa evaluarExpresion(expr) que evalúe expresiones matemáticas simples
// SIN usar eval() o Function()
// Solo permite: números, +,-,*,/,(),espacios
function evaluarExpresion(expr) {
  // TU CÓDIGO AQUÍ — validar con regex antes de cualquier evaluación
  // Si contiene algo que no sea números y operadores matemáticos: lanzar Error
}
console.log(evaluarExpresion("2 + 3 * 4"));    // 14
console.log(evaluarExpresion("(10 - 2) / 4")); // 2
try { evaluarExpresion("alert('xss')"); } catch(e) { console.log("Bloqueado:", e.message); }
try { evaluarExpresion("__proto__");    } catch(e) { console.log("Bloqueado:", e.message); }


// PARTE 5: Validar y sanitizar un formulario completo
// Implementa validarFormulario({ nombre, email, url, comentario }) que:
// - nombre: solo letras, espacios y acentos (no HTML)
// - email: formato válido
// - url: http/https o vacío
// - comentario: sanitizar HTML, max 500 chars
function validarFormulario(datos) {
  // TU CÓDIGO AQUÍ — retorna { valido:bool, datos:sanitizados, errores:{campo:mensaje} }
}


// BONUS: Rate limiter en memoria
// Implementa rateLimiter(maxPeticiones, ventanaMs) que retorna un middleware
// que lanza Error si un clientId supera el límite en la ventana de tiempo
function crearRateLimiter(max, ventanaMs) {
  // TU CÓDIGO AQUÍ
}
