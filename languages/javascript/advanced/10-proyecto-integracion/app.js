// app.js — punto de entrada
import { InMemoryTaskRepo } from "./core/TaskRepository.js";
import { TaskService } from "./core/TaskService.js";
import { bus } from "./core/EventBus.js";
import { LoggerPlugin } from "./plugins/LoggerPlugin.js";

// Instalar plugins
LoggerPlugin.install(bus);

// Composición de dependencias
const repo = new InMemoryTaskRepo();
const service = new TaskService(repo, bus);

// Demo
async function main() {
  const t1 = await service.crear({ titulo:"Aprender Wasm", prioridad:"alta", tags:["js","wasm"] });
  const t2 = await service.crear({ titulo:"Revisar PRs",   prioridad:"media", tags:["trabajo"] });
  const t3 = await service.crear({ titulo:"Escribir tests",prioridad:"alta", tags:["js","testing"] });

  console.log("\n--- Listar todas ---");
  const todas = await service.listar();
  todas.items.forEach(t=>console.log(` [${t.estado}] ${t.titulo} (${t.prioridad})`));

  console.log("\n--- Cambiar estado ---");
  await service.cambiarEstado(t1.id, "en_progreso");
  await service.cambiarEstado(t1.id, "completada");

  console.log("\n--- Filtrar por prioridad alta ---");
  const altas = await service.listar({ prioridad:"alta" });
  altas.items.forEach(t=>console.log(` ${t.titulo} [${t.estado}]`));

  console.log("\n--- Iterar con for...of ---");
  for (const tarea of repo) {
    console.log(` ${tarea.id}: ${tarea.titulo}`);
  }
}
main().catch(console.error);
