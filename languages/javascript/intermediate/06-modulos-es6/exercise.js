// 06 · Módulos ES6 — exercise.js
// Crea los archivos en src/ según las instrucciones de cada parte

// PARTE 1: Named exports en src/math.js
// Exporta: suma(a,b), resta(a,b), multiplica(a,b), divide(a,b), PI
// divide debe lanzar Error si b === 0

// PARTE 2: Default export en src/logger.js
// Exporta por defecto un objeto con métodos: info(msg), warn(msg), error(msg)
// Cada uno imprime con prefijo: [INFO], [WARN], [ERROR] y timestamp


// PARTE 3: Named exports en src/formatters.js
// Exporta: formatPrecio(n, moneda="COP"), formatFecha(date), truncar(str, max=50)


// PARTE 4: Barril en src/index.js
// Re-exporta todo desde math.js y formatters.js
// Re-exporta el default de logger.js como { log }


// PARTE 5: Usar los módulos aquí
// Importa desde src/index.js (el barril)
// Prueba cada función importada
// validar ruta index.js, debe ser './src/index.js' o '../src/index.js' dependiendo de tu estructura de carpetas

import { suma, resta, multiplica, divide, PI, formatPrecio, formatFecha, truncar, log } from './src/index.js';

console.log('PI:', PI);
console.log('Suma:', suma(5, 3));
console.log('Resta:', resta(5, 3));
console.log('Multiplica:', multiplica(5, 3));
try {
  console.log('Divide:', divide(5, 0));
} catch (e) {
  log.error(e.message);
}

console.log('Precio:', formatPrecio(1234.56));
console.log('Fecha:', formatFecha(new Date()));
console.log('Truncar:', truncar('Este es un texto muy largo que debería ser truncado', 20));

// PARTE 6: Dynamic import
// Escribe cargarModulo(nombre) que importe dinámicamente src/{nombre}.js
// Si el módulo no existe, retorna null (captura el error)
async function cargarModulo(nombre) {
  // TU CÓDIGO AQUÍ
}
