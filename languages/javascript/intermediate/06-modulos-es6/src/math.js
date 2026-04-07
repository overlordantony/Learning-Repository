// Exporta: suma(a,b), resta(a,b), multiplica(a,b), divide(a,b), PI
// divide debe lanzar Error si b === 0
export const PI = 3.14159;
export const suma = (a, b) => a + b;
export const resta = (a, b) => a - b;
export const multiplica = (a, b) => a * b;
export const divide = (a, b) => {
  if (b === 0) {
    throw new Error("No se puede dividir por cero");
  }
  return a / b;
};