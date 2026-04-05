// ─────────────────────────────────────────
// 01 · Variables — exercise.js
// Completa cada sección según las instrucciones.
// ─────────────────────────────────────────

// ── PARTE 1: Declaración básica ──────────
// Declara tres variables:
// - una constante con tu nombre
// - una con let para tu edad (la cambiarás luego)
// - intenta usar var y observa la diferencia de comportamiento

const NOMBRE = "Overlord";
let edad = 31;
var ciudad = "Cali";
console.log("Nombre: %s, Edad: %d, Ciudad: %s", NOMBRE, edad, ciudad);

// ── PARTE 2: Reasignación ─────────────────
// Cambia el valor de la variable de edad a edad + 1
// Intenta reasignar la constante y observa el error

edad = edad + 2;
console.log("Edad actualizada: %d", edad);
//NOMBRE = "Otro"; // Esto lanza un error porque no puedes reasignar una constante


// ── PARTE 3: Block scope ──────────────────
// Declara una variable con let dentro de un bloque {}
// Intenta accederla fuera del bloque

{
  let dentroDelBloque = "solo existo aquí";
  console.log(dentroDelBloque);
}
//console.log(dentroDelBloque); // Esto lanza un error porque dentroDelBloque solo existe dentro del bloque donde fue declarada


// ── PARTE 4: Hoisting con var ─────────────
// Intenta usar una variable var ANTES de declararla
// Luego haz lo mismo con let

console.log(conVar);
var conVar = "declarada después";

//console.log(conLet);
//let conLet = "también declarada después"; // Esto lanza un error porque con let no puedes acceder antes de declararla


// ── PARTE 5: Objeto con const ─────────────
// Declara un objeto const con propiedades: nombre, edad, activo
// Modifica una de sus propiedades
// Intenta reasignar el objeto completo
// ¿Cuál lanza error y cuál no?

const user = { nombre: "Ana", edad: 25, activo: true };
user.activo = false; // Esto no lanza error, mutamos el objeto
console.log(user);
//user = { nombre: "Luis" }; // Esto lanza error porque no puedes reasignar una constante


// ── BONUS ─────────────────────────────────
// ¿Cuántas veces puedes redeclarar una variable let en el mismo scope?
// Pruébalo y anota el resultado.

let x = 1;
//let x = 2; // Esto lanza un error porque no puedes redeclarar con let en el mismo scope