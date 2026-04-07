# 06 · WebAssembly y Bajo Nivel

## ¿Qué es WebAssembly (Wasm)?
Formato binario que corre en el browser a velocidad casi nativa.
No reemplaza JS — se complementan. JS llama a Wasm, Wasm puede llamar a JS.

## Casos de uso reales
- Procesamiento de imágenes/video (ffmpeg.wasm)
- Motores de juego (Unity, Unreal)
- Criptografía y hashing
- Parsers y compiladores
- Simulaciones físicas

## Flujo básico
```
C/C++/Rust/Go → compilador → .wasm → cargado en browser con JS
```

## Cargar un módulo Wasm desde JS
```js
const response = await fetch("modulo.wasm");
const buffer = await response.arrayBuffer();
const { instance } = await WebAssembly.instantiate(buffer, importObject);
// importObject: funciones JS que el módulo Wasm puede llamar

instance.exports.sumar(3, 4); // llama función exportada desde Wasm
```

## WebAssembly.instantiateStreaming (más eficiente)
```js
const { instance } = await WebAssembly.instantiateStreaming(
  fetch("modulo.wasm"),
  importObject
);
```

## Memoria compartida JS ↔ Wasm
Wasm tiene su propia memoria lineal (ArrayBuffer).
```js
const memory = new WebAssembly.Memory({ initial: 1 }); // 1 página = 64KB
const view = new Uint8Array(memory.buffer);
// Wasm escribe en memory.buffer, JS lo lee desde view
```

## TypedArrays — JS de bajo nivel
Sin Wasm, los TypedArrays ya permiten trabajar con memoria de forma eficiente.
```js
// Vistas sobre el mismo buffer — útil para parsear formatos binarios
const buffer = new ArrayBuffer(16);
const int32  = new Int32Array(buffer);   // 4 ints de 32 bits
const uint8  = new Uint8Array(buffer);   // 16 bytes individuales
const float64 = new Float64Array(buffer); // 2 doubles

// Manipular bytes directamente
const dataView = new DataView(buffer);
dataView.setInt32(0, 0xDEADBEEF, true); // little-endian
dataView.getInt32(0, true); // 0xDEADBEEF
```

## Wat (WebAssembly Text Format) — Wasm legible por humanos
```wat
(module
  (func $sumar (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add)
  (export "sumar" (func $sumar)))
```

## SIMD — operaciones vectoriales
WebAssembly SIMD permite operar sobre múltiples valores a la vez.
Útil para procesamiento de imágenes, machine learning en el browser.

## Referencias
- MDN WebAssembly: https://developer.mozilla.org/es/docs/WebAssembly
- WebAssembly.studio: https://webassembly.studio
- wat2wasm online: https://webassembly.github.io/wabt/demo/wat2wasm/
