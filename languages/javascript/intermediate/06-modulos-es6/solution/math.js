// math.js
export const PI = 3.14159265358979;
export const suma = (a,b) => a + b;
export const resta = (a,b) => a - b;
export const multiplica = (a,b) => a * b;
export function divide(a,b) {
  if (b === 0) throw new Error("División por cero");
  return a / b;
}
