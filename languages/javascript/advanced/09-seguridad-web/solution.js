// 09 · Seguridad Web — solution.js

// PARTE 1
function sanitizarHTML(str) {
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#x27;")
    .replace(/\//g,"&#x2F;");
}
function sanitizarURL(url) {
  try {
    const parsed = new URL(url);
    return ["http:","https:"].includes(parsed.protocol) ? url : null;
  } catch { return null; }
}

// PARTE 2
const CLAVES_PELIGROSAS = new Set(["__proto__","constructor","prototype"]);
function esSeguro(obj) {
  if (typeof obj !== "object" || obj === null) return true;
  for (const key of Object.keys(obj)) {
    if (CLAVES_PELIGROSAS.has(key)) return false;
    if (!esSeguro(obj[key])) return false;
  }
  return true;
}
function parsearSeguro(jsonStr) {
  const obj = JSON.parse(jsonStr);
  if (!esSeguro(obj)) throw new Error("Prototype pollution detectada");
  return obj;
}

// PARTE 3
const csrfManager = {
  _tokens: new Map(),
  generarToken(sessionId) {
    const token = crypto.getRandomValues
      ? Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b=>b.toString(16).padStart(2,"0")).join("")
      : Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    this._tokens.set(sessionId, { token, expira: Date.now() + 30*60*1000 });
    return token;
  },
  validarToken(sessionId, token) {
    const entry = this._tokens.get(sessionId);
    if (!entry) return false;
    if (Date.now() > entry.expira) { this._tokens.delete(sessionId); return false; }
    return entry.token === token;
  }
};

// PARTE 4
function evaluarExpresion(expr) {
  if (!/^[\d\s+\-*/.()]+$/.test(expr)) throw new Error("Expresión no permitida");
  // Parser recursivo descendente seguro (sin eval)
  let pos = 0;
  const str = expr.replace(/\s/g,"");
  const siguiente = () => str[pos];
  const consumir = () => str[pos++];

  function numero() {
    let n="";
    while(/[\d.]/.test(siguiente())) n+=consumir();
    return parseFloat(n);
  }
  function factor() {
    if (siguiente()==="(") { consumir(); const v=expresion(); consumir(); return v; }
    return numero();
  }
  function termino() {
    let v=factor();
    while(["*","/"].includes(siguiente())) {
      const op=consumir(); const r=factor();
      v = op==="*"?v*r:v/r;
    }
    return v;
  }
  function expresion() {
    let v=termino();
    while(["+","-"].includes(siguiente())) {
      const op=consumir(); const r=termino();
      v = op==="+"?v+r:v-r;
    }
    return v;
  }
  return expresion();
}

// PARTE 5
function validarFormulario({ nombre="", email="", url="", comentario="" }) {
  const errores = {};
  const sanitizado = {};
  if (!/^[\p{L}\s]{2,50}$/u.test(nombre)) errores.nombre="Solo letras y espacios, 2-50 chars";
  else sanitizado.nombre = nombre.trim();
  if (!/.+@.+\..+/.test(email)) errores.email="Email inválido";
  else sanitizado.email = email.toLowerCase().trim();
  const urlSan = url ? sanitizarURL(url) : "";
  if (url && !urlSan) errores.url="URL debe ser http/https";
  else sanitizado.url = urlSan ?? "";
  if (comentario.length > 500) errores.comentario="Máximo 500 caracteres";
  else sanitizado.comentario = sanitizarHTML(comentario.trim());
  return { valido:Object.keys(errores).length===0, datos:sanitizado, errores };
}

// BONUS
function crearRateLimiter(max, ventanaMs) {
  const peticiones = new Map();
  return function check(clientId) {
    const ahora = Date.now();
    const hist = (peticiones.get(clientId) ?? []).filter(t=>ahora-t<ventanaMs);
    if (hist.length >= max) throw new Error(`Rate limit: máximo ${max} req/${ventanaMs}ms`);
    hist.push(ahora);
    peticiones.set(clientId, hist);
    return true;
  };
}
