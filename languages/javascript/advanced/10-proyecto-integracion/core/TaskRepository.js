// core/TaskRepository.js
import { TaskNotFoundError } from "../utils/validators.js";
import { nextId } from "../utils/idGenerator.js";

export class InMemoryTaskRepo {
  #tareas = new Map();

  async crear(datos) {
    const tarea = { id:nextId(), ...datos, estado:"pendiente", creadoEn:new Date(), actualizadoEn:new Date() };
    this.#tareas.set(tarea.id, tarea);
    return { ...tarea };
  }
  async obtenerPorId(id) {
    const t=this.#tareas.get(id);
    if (!t) throw new TaskNotFoundError(id);
    return { ...t };
  }
  async actualizar(id, cambios) {
    const t=this.#tareas.get(id);
    if (!t) throw new TaskNotFoundError(id);
    const actualizada = { ...t, ...cambios, actualizadoEn:new Date() };
    this.#tareas.set(id, actualizada);
    return { ...actualizada };
  }
  async eliminar(id) {
    if (!this.#tareas.has(id)) throw new TaskNotFoundError(id);
    this.#tareas.delete(id);
  }
  async listar({ estado, prioridad, tag, busqueda, pagina=1, porPagina=10 }={}) {
    let items=[...this.#tareas.values()];
    if (estado) items=items.filter(t=>t.estado===estado);
    if (prioridad) items=items.filter(t=>t.prioridad===prioridad);
    if (tag) items=items.filter(t=>t.tags.includes(tag));
    if (busqueda) {
      const q=busqueda.toLowerCase();
      items=items.filter(t=>t.titulo.toLowerCase().includes(q)||t.descripcion.toLowerCase().includes(q));
    }
    const total=items.length;
    const paginadas=items.slice((pagina-1)*porPagina, pagina*porPagina);
    return { items:paginadas.map(t=>({...t})), total, pagina, porPagina, totalPaginas:Math.ceil(total/porPagina) };
  }
  // Symbol.iterator sobre todas las tareas
  [Symbol.iterator]() { return this.#tareas.values(); }
}
