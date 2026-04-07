// core/TaskService.js
import { validarTarea, validarTransicion } from "../utils/validators.js";
import { LRUCache } from "../utils/cache.js";

const debounce = (fn,ms) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; };

export class TaskService {
  #repo; #bus; #cache;
  constructor(repo, bus) {
    this.#repo=repo; this.#bus=bus;
    this.#cache=new LRUCache(100);
    // Invalidar cache cuando hay cambios
    bus.on("tarea:creada",  ()=>this.#cache.invalidar("listar"));
    bus.on("tarea:actualizada",()=>this.#cache.invalidar("listar"));
    bus.on("tarea:eliminada",  ()=>this.#cache.invalidar("listar"));
  }
  async crear(datos) {
    const validados=validarTarea(datos);
    const tarea=await this.#repo.crear(validados);
    this.#bus.emit("tarea:creada", tarea);
    return tarea;
  }
  async obtener(id) { return this.#repo.obtenerPorId(id); }
  async cambiarEstado(id, nuevoEstado) {
    const tarea=await this.#repo.obtenerPorId(id);
    validarTransicion(tarea.estado, nuevoEstado);
    const actualizada=await this.#repo.actualizar(id,{estado:nuevoEstado});
    this.#bus.emit("tarea:actualizada", actualizada);
    return actualizada;
  }
  async eliminar(id) {
    await this.#repo.obtenerPorId(id); // verifica que existe
    await this.#repo.eliminar(id);
    this.#bus.emit("tarea:eliminada", { id });
  }
  async listar(filtros={}) {
    const key=`listar:${JSON.stringify(filtros)}`;
    const cached=this.#cache.get(key);
    if (cached) return cached;
    const resultado=await this.#repo.listar(filtros);
    this.#cache.set(key,resultado);
    return resultado;
  }
  buscarConDebounce = debounce(async (query, callback) => {
    const resultado=await this.listar({ busqueda:query });
    callback(resultado);
  }, 300);
}
