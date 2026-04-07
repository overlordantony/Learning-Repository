// 06 · WebAssembly y Bajo Nivel — exercise.js
// Este ejercicio se enfoca en TypedArrays y DataView (JS puro)
// y en entender cómo interactuar con módulos Wasm si estuvieran disponibles.

// PARTE 1: TypedArrays y múltiples vistas
// Dado un ArrayBuffer, crea vistas int32 y uint8 sobre el mismo buffer
// Escribe 0xDEADBEEF en int32[0] y lee los 4 bytes individuales desde uint8
function explorarBuffer() {
  const buffer = new ArrayBuffer(16);
  const int32 = new Int32Array(buffer);
  const uint8 = new Uint8Array(buffer);

  int32[0] = 0xDEADBEEF;
  // ¿Qué valores tienen uint8[0..3]? (depende de endianness)
  console.log("uint8[0..3]:", uint8[0], uint8[1], uint8[2], uint8[3]);

  // TU CÓDIGO: escribe 42 como float64 en offset 8 usando DataView
  const dv = new DataView(buffer);
  // TU CÓDIGO AQUÍ

  // Lee de vuelta y verifica
  // TU CÓDIGO AQUÍ
}
explorarBuffer();


// PARTE 2: Parser de formato binario custom
// Implementa parsearEncabezado(buffer) que lee este formato:
// Bytes 0-3:   magic number (debe ser 0x4A534558 = "JSEX" en ASCII)
// Bytes 4-7:   versión (uint32, big-endian)
// Bytes 8-15:  timestamp (float64, little-endian)
// Bytes 16-19: longitud del nombre (uint32)
// Bytes 20+:   nombre en UTF-8
function parsearEncabezado(buffer) {
  // TU CÓDIGO AQUÍ — usa DataView
}

function crearEncabezado(version, nombre) {
  const nombreBytes = new TextEncoder().encode(nombre);
  const buffer = new ArrayBuffer(20 + nombreBytes.length);
  const dv = new DataView(buffer);
  dv.setUint32(0, 0x4A534558, false);       // magic BE
  dv.setUint32(4, version, false);           // version BE
  dv.setFloat64(8, Date.now(), true);        // timestamp LE
  dv.setUint32(16, nombreBytes.length, false); // longitud BE
  new Uint8Array(buffer, 20).set(nombreBytes);
  return buffer;
}

const buf = crearEncabezado(2, "mi-modulo");
console.log(parsearEncabezado(buf));


// PARTE 3: Simulación de carga de módulo Wasm
// Implementa un mock de WebAssembly.instantiate que simula
// cargar un módulo con funciones exportadas: sumar, multiplicar, factorial
async function cargarModuloWasm() {
  // En un entorno real: const { instance } = await WebAssembly.instantiateStreaming(fetch("mod.wasm"), {});
  // Simulamos las exports del módulo:
  const exports = {
    sumar: (a,b) => a+b,
    multiplicar: (a,b) => a*b,
    factorial: (n) => n<=1?1:n*exports.factorial(n-1),
    memoria: new WebAssembly.Memory ? null : { buffer: new ArrayBuffer(64*1024) }
  };
  return { instance: { exports } };
}

cargarModuloWasm().then(({ instance }) => {
  console.log(instance.exports.sumar(3,4));      // 7
  console.log(instance.exports.factorial(10));   // 3628800
});


// PARTE 4: Procesamiento de imagen con TypedArrays
// Simula aplicar un filtro de escala de grises a datos de imagen
// imageData es un Uint8ClampedArray con formato [R,G,B,A, R,G,B,A, ...]
function aplicarGrises(imageData) {
  // Para cada pixel: luminancia = 0.299*R + 0.587*G + 0.114*B
  // TU CÓDIGO AQUÍ
}

// Datos simulados: 4 píxeles (rojo, verde, azul, blanco)
const pixeles = new Uint8ClampedArray([
  255,0,0,255,   // rojo
  0,255,0,255,   // verde
  0,0,255,255,   // azul
  255,255,255,255 // blanco
]);
const grises = aplicarGrises(pixeles);
console.log(grises); // cada pixel R=G=B=luminancia


// PARTE 5: Implementar un simple ring buffer con SharedArrayBuffer
// Ring buffer: estructura circular de tamaño fijo, producer escribe, consumer lee
class RingBuffer {
  constructor(capacidad) {
    // TU CÓDIGO AQUÍ — usa SharedArrayBuffer + Int32Array
    // índices de escritura y lectura en la memoria compartida
  }
  escribir(valor) { /* TU CÓDIGO AQUÍ */ }
  leer() { /* TU CÓDIGO AQUÍ — retorna null si vacío */ }
  get tamaño() { /* TU CÓDIGO AQUÍ */ }
}
