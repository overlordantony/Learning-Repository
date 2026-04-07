// 06 · WebAssembly y Bajo Nivel — solution.js

// PARTE 1
function explorarBuffer() {
  const buffer = new ArrayBuffer(16);
  const int32 = new Int32Array(buffer);
  const uint8 = new Uint8Array(buffer);
  int32[0] = 0xDEADBEEF;
  // En little-endian (x86): EF BE AD DE
  console.log("uint8[0..3]:", uint8[0].toString(16), uint8[1].toString(16),
    uint8[2].toString(16), uint8[3].toString(16));

  const dv = new DataView(buffer);
  dv.setFloat64(8, 42.5, true); // little-endian
  console.log("float64 en offset 8:", dv.getFloat64(8, true)); // 42.5
}

// PARTE 2
function parsearEncabezado(buffer) {
  const dv = new DataView(buffer);
  const magic = dv.getUint32(0, false);
  if (magic !== 0x4A534558) throw new Error("Magic number inválido");
  const version = dv.getUint32(4, false);
  const timestamp = dv.getFloat64(8, true);
  const lonNombre = dv.getUint32(16, false);
  const nombreBytes = new Uint8Array(buffer, 20, lonNombre);
  const nombre = new TextDecoder().decode(nombreBytes);
  return { magic: magic.toString(16), version, timestamp: new Date(timestamp), nombre };
}

// PARTE 3 — en el exercise está la implementación simulada

// PARTE 4
function aplicarGrises(imageData) {
  const resultado = new Uint8ClampedArray(imageData.length);
  for (let i=0; i<imageData.length; i+=4) {
    const r=imageData[i], g=imageData[i+1], b=imageData[i+2], a=imageData[i+3];
    const lum = Math.round(0.299*r + 0.587*g + 0.114*b);
    resultado[i]=lum; resultado[i+1]=lum; resultado[i+2]=lum; resultado[i+3]=a;
  }
  return resultado;
}

// PARTE 5
class RingBuffer {
  constructor(capacidad) {
    this._cap = capacidad;
    // [escritura, lectura, ...datos]
    this._sab = new SharedArrayBuffer((capacidad+2)*4);
    this._view = new Int32Array(this._sab);
    // view[0]=idx escritura, view[1]=idx lectura, view[2..]=datos
  }
  escribir(valor) {
    const w = Atomics.load(this._view,0);
    const r = Atomics.load(this._view,1);
    if ((w+1)%this._cap === r) return false; // lleno
    this._view[2+w] = valor;
    Atomics.store(this._view, 0, (w+1)%this._cap);
    return true;
  }
  leer() {
    const r = Atomics.load(this._view,1);
    const w = Atomics.load(this._view,0);
    if (r===w) return null; // vacío
    const valor = this._view[2+r];
    Atomics.store(this._view, 1, (r+1)%this._cap);
    return valor;
  }
  get tamaño() {
    const w=Atomics.load(this._view,0), r=Atomics.load(this._view,1);
    return (w-r+this._cap)%this._cap;
  }
}
