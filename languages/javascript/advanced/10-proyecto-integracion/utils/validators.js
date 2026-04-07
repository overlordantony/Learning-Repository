// utils/validators.js
export class ValidationError extends Error {
  constructor(campo, mensaje) { super(mensaje); this.name="ValidationError"; this.campo=campo; }
}
export class TaskNotFoundError extends Error {
  constructor(id) { super(`Tarea '${id}' no encontrada`); this.name="TaskNotFoundError"; }
}
const PRIORIDADES = new Set(["alta","media","baja"]);
const ESTADOS     = new Set(["pendiente","en_progreso","completada"]);

export function sanitizarTexto(str="") {
  return String(str).replace(/</g,"&lt;").replace(/>/g,"&gt;").trim();
}
export function validarTarea({ titulo, descripcion="", prioridad="media", tags=[] }) {
  const errores = {};
  const t = sanitizarTexto(titulo);
  if (!t || t.length < 3) errores.titulo="Mínimo 3 caracteres";
  if (!PRIORIDADES.has(prioridad)) errores.prioridad="Debe ser alta, media o baja";
  if (!Array.isArray(tags)) errores.tags="Debe ser un array";
  if (Object.keys(errores).length) {
    const [campo, msg] = Object.entries(errores)[0];
    throw new ValidationError(campo, msg);
  }
  return { titulo:t, descripcion:sanitizarTexto(descripcion), prioridad, tags:tags.map(sanitizarTexto) };
}
export function validarTransicion(estadoActual, estadoNuevo) {
  const transiciones = { pendiente:["en_progreso"], en_progreso:["completada","pendiente"], completada:[] };
  if (!ESTADOS.has(estadoNuevo)) throw new ValidationError("estado","Estado inválido");
  if (!transiciones[estadoActual].includes(estadoNuevo))
    throw new ValidationError("estado",`No se puede ir de '${estadoActual}' a '${estadoNuevo}'`);
}
