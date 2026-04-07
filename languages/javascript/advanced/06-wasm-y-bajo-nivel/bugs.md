# 06 · WebAssembly y Bajo Nivel — Bugs

## Bug 1: Endianness — asumir big-endian en sistemas x86
x86 es little-endian. Al leer/escribir con DataView, siempre especificar el endianness.
```js
dv.setInt32(0, valor, true);  // true = little-endian
dv.setInt32(0, valor, false); // false = big-endian (network byte order)
```

## Bug 2: TypedArray fuera de los límites del buffer
```js
const buf = new ArrayBuffer(8);
const arr = new Int32Array(buf); // 2 elementos (8/4)
arr[5] = 99; // silencioso — no lanza error, pero tampoco escribe nada
```

## Bug 3: Detached ArrayBuffer después de transfer
```js
worker.postMessage(buffer, [buffer]);
// buffer ahora está detached — cualquier acceso lanza TypeError
buffer.byteLength; // TypeError: Cannot perform %TypedArray%.prototype.set on a detached ArrayBuffer
```

## Bug 4: TextDecoder/TextEncoder necesario para strings en buffers
```js
// No hacer:
String.fromCharCode(...new Uint8Array(buffer)); // rompe con multibyte chars
// Usar:
new TextDecoder("utf-8").decode(buffer);
```

## Notas personales
