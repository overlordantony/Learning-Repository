// core/EventBus.js
export class EventBus {
  #listeners = new Map();
  #wildcards = [];
  on(event, fn) {
    if (event==="*") { this.#wildcards.push(fn); return ()=>this.#wildcards.splice(this.#wildcards.indexOf(fn),1); }
    if (!this.#listeners.has(event)) this.#listeners.set(event,[]);
    this.#listeners.get(event).push(fn);
    return () => this.#listeners.set(event,(this.#listeners.get(event)??[]).filter(f=>f!==fn));
  }
  emit(event, data) {
    (this.#listeners.get(event)??[]).forEach(fn=>fn(data));
    this.#wildcards.forEach(fn=>fn(event,data));
  }
}
export const bus = new EventBus();
