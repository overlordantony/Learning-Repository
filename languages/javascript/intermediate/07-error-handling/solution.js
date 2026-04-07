// 07 · Error Handling — solution.js

// PARTE 1
class ValidationError extends Error {
  constructor(campo, mensaje) {
    super(mensaje);
    this.name = "ValidationError";
    this.campo = campo;
  }
}
class NotFoundError extends Error {
  constructor(recurso, id) {
    super(`${recurso} '${id}' no encontrado`);
    this.name = "NotFoundError";
    this.recurso = recurso;
    this.id = id;
    this.statusCode = 404;
  }
}
class AuthError extends Error {
  constructor(accion) {
    super(`No autorizado para: ${accion}`);
    this.name = "AuthError";
    this.accion = accion;
    this.statusCode = 403;
  }
}

// PARTE 2
function validarUsuario({ nombre, email, edad } = {}) {
  if (!nombre || nombre.length < 2)
    throw new ValidationError("nombre", "Debe tener al menos 2 caracteres");
  if (!email || !email.includes("@"))
    throw new ValidationError("email", "Formato de email inválido");
  if (typeof edad !== "number" || edad < 0 || edad > 120)
    throw new ValidationError("edad", "Edad debe ser un número entre 0 y 120");
  return { valido: true, datos: { nombre, email, edad } };
}

// PARTE 3
const catalogo = ["laptop","mouse","teclado","monitor"];
function procesarPedido(pedido) {
  if (!pedido?.items?.length)
    throw new ValidationError("items","El pedido debe tener al menos un item");
  for (const item of pedido.items) {
    if (!catalogo.includes(item))
      throw new NotFoundError("Producto", item);
  }
  return { procesado: true, pedido };
}

try { procesarPedido({ items: ["laptop","auriculares"] }); }
catch(err) {
  if (err instanceof NotFoundError) console.log(`No encontrado: ${err.id}`);
  else if (err instanceof ValidationError) console.log(`Validación: ${err.message}`);
  else throw err;
}

// PARTE 4
async function safe(fn) {
  try { return [null, await fn()]; }
  catch(err) { return [err, null]; }
}

// BONUS
class NetworkError extends Error { constructor(m){ super(m); this.name="NetworkError"; } }
async function reintentar(fn, n=3, ms=500) {
  for (let i=0; i<n; i++) {
    try { return await fn(); }
    catch(err) {
      if (!(err instanceof NetworkError) || i === n-1) throw err;
      await new Promise(r => setTimeout(r, ms));
    }
  }
}
