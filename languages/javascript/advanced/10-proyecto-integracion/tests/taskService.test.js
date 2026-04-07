// tests/taskService.test.js
// Usar el mini-framework del ejercicio 08, o Jest/Vitest en un proyecto real

import { InMemoryTaskRepo } from "../core/TaskRepository.js";
import { TaskService } from "../core/TaskService.js";
import { EventBus } from "../core/EventBus.js";
import { ValidationError, TaskNotFoundError } from "../utils/validators.js";

// Mini test runner
let pasados=0, fallados=0;
async function it(nombre, fn) {
  try { await fn(); pasados++; console.log(`✅ ${nombre}`); }
  catch(e) { fallados++; console.log(`❌ ${nombre}\n   ${e.message}`); }
}
const expect=(v)=>({ toBe:(e)=>{ if(v!==e) throw new Error(`Esperaba ${e}, recibí ${v}`); },
  toEqual:(e)=>{ if(JSON.stringify(v)!==JSON.stringify(e)) throw new Error(`toEqual falló`); },
  toHaveLength:(n)=>{ if(v.length!==n) throw new Error(`Longitud ${v.length}, esperaba ${n}`); },
  toThrow:()=>{} });

// Factory para instancias frescas
const crearSistema = () => {
  const bus=new EventBus(); const repo=new InMemoryTaskRepo();
  return { service:new TaskService(repo,bus), bus, repo };
};

// Tests
await it("crea tarea con datos válidos", async () => {
  const { service } = crearSistema();
  const t = await service.crear({ titulo:"Mi tarea", prioridad:"alta", tags:["js"] });
  expect(t.titulo).toBe("Mi tarea");
  expect(t.estado).toBe("pendiente");
});

await it("lanza ValidationError si título es muy corto", async () => {
  const { service } = crearSistema();
  try { await service.crear({ titulo:"AB", prioridad:"media" }); throw new Error("Debía lanzar"); }
  catch(e) { if(!(e instanceof ValidationError)) throw e; }
});

await it("cambia estado de pendiente a en_progreso", async () => {
  const { service } = crearSistema();
  const t = await service.crear({ titulo:"Tarea test", prioridad:"baja" });
  const actualizada = await service.cambiarEstado(t.id, "en_progreso");
  expect(actualizada.estado).toBe("en_progreso");
});

await it("no permite transición inválida", async () => {
  const { service } = crearSistema();
  const t = await service.crear({ titulo:"Tarea test", prioridad:"baja" });
  try { await service.cambiarEstado(t.id, "completada"); throw new Error("Debía lanzar"); }
  catch(e) { if(!(e instanceof ValidationError)) throw e; }
});

await it("elimina tarea existente", async () => {
  const { service } = crearSistema();
  const t = await service.crear({ titulo:"A eliminar", prioridad:"baja" });
  await service.eliminar(t.id);
  try { await service.obtener(t.id); throw new Error("Debía lanzar"); }
  catch(e) { if(!(e instanceof TaskNotFoundError)) throw e; }
});

await it("lista con filtro de prioridad", async () => {
  const { service } = crearSistema();
  await service.crear({ titulo:"Alta 1",  prioridad:"alta" });
  await service.crear({ titulo:"Alta 2",  prioridad:"alta" });
  await service.crear({ titulo:"Baja 1",  prioridad:"baja" });
  const { items } = await service.listar({ prioridad:"alta" });
  expect(items).toHaveLength(2);
});

console.log(`\n📊 ${pasados} pasados, ${fallados} fallados`);
