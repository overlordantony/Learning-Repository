// 05 · Bucles — exercise.js

// ── PARTE 1: for clásico ──────────────────
// Imprime los números del 1 al 10
// Imprime solo los pares del 1 al 20 (usa continue)

for (let i = 1; i <= 10; i++) {
    console.log(i);
}
for (let i = 1; i <= 20; i++) {
    if (i % 2 !== 0) continue; // Salta los números impares
    console.log(i);
}

// ── PARTE 2: while ────────────────────────
// Simula un dado (Math.random): tira hasta sacar un 6, cuenta los intentos

let intentos = 0;
let dado;
while (dado !== 6) {
    dado = Math.floor(Math.random() * 6) + 1; // Genera un número entre 1 y 6
    intentos++;
}
console.log('Sacaste un 6 después de %d intentos.', intentos);

// ── PARTE 3: for...of ─────────────────────
// Dado este array, calcula la suma total usando for...of

const precios = [120, 45, 200, 89, 30];
let suma = 0;
for (const precio of precios) {
    suma += precio;
}
console.log('La suma total es:', suma);

// ── PARTE 4: for...in ─────────────────────
// Dado este objeto, imprime cada propiedad en formato "clave: valor"

const persona = { nombre: "Ana", edad: 28, ciudad: "Cali", activo: true };
for (const clave in persona) {
    console.log(`${clave}: ${persona[clave]}`);
}

// ── PARTE 5: Break ────────────────────────
// Encuentra el primer número divisible entre 7 en el rango 1-100 usando break

for (let i = 1; i <= 100; i++) {
    if (i % 7 === 0) {
        console.log('El primer número divisible entre 7 es:', i);
        break; // Detiene el bucle después de encontrar el primer número
    }
}

// ── BONUS ─────────────────────────────────
// Escribe un bucle que genere la tabla de multiplicar del 1 al 10 (bucle dentro de bucle)
for (let i = 1; i <= 10; i++) {
    console.log(`Tabla del ${i}:`);
    for (let j = 1; j <= 10; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
    console.log(''); // Línea en blanco para separar tablas
}
