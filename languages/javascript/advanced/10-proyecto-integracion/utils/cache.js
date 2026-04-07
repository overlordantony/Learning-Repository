// utils/cache.js
export class LRUCache {
  #cap; #cache;
  constructor(cap=50) { this.#cap=cap; this.#cache=new Map(); }
  get(key) {
    if (!this.#cache.has(key)) return undefined;
    const v=this.#cache.get(key); this.#cache.delete(key); this.#cache.set(key,v);
    return v;
  }
  set(key,value) {
    if (this.#cache.has(key)) this.#cache.delete(key);
    else if (this.#cache.size>=this.#cap) this.#cache.delete(this.#cache.keys().next().value);
    this.#cache.set(key,value);
  }
  invalidar(patron) { for(const k of this.#cache.keys()) if(k.includes(patron)) this.#cache.delete(k); }
}
