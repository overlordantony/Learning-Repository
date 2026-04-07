// utils/idGenerator.js
function* _idGen(prefijo="task") {
  let n=1;
  while(true) yield `${prefijo}-${String(n++).padStart(4,"0")}`;
}
const gen = _idGen();
export const nextId = () => gen.next().value;
