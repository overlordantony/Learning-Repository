// main.js
import { suma, divide, PI, formatPrecio, formatFecha, truncar, log } from "./index.js";

log.info("App iniciada");
console.log(suma(3,4));
console.log(divide(10,2));
try { divide(5,0); } catch(e) { log.error(e.message); }
console.log(formatPrecio(150000));
console.log(formatFecha());
console.log(truncar("Este es un texto muy largo que debe ser truncado a 30 caracteres", 30));
