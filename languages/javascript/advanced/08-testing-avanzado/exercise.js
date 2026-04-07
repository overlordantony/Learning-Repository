// 08 · Testing Avanzado — exercise.js
// Implementamos un mini framework de testing desde cero
// para entender los conceptos sin depender de Jest/Vitest

// ── Mini Test Framework ───────────────────────────────────────
const resultados = { pasados:0, fallados:0, errores:[] };

function describe(nombre, fn) {
  console.log(`\n📦 ${nombre}`);
  fn();
}

async function it(nombre, fn) {
  try {
    await fn();
    resultados.pasados++;
    console.log(`  ✅ ${nombre}`);
  } catch(err) {
    resultados.fallados++;
    resultados.errores.push({ nombre, error:err.message });
    console.log(`  ❌ ${nombre}`);
    console.log(`     ${err.message}`);
  }
}

const expect = (valor) => ({
  toBe: (esperado) => {
    if (valor !== esperado) throw new Error(`Esperaba ${JSON.stringify(esperado)}, recibí ${JSON.stringify(valor)}`);
  },
  toEqual: (esperado) => {
    if (JSON.stringify(valor) !== JSON.stringify(esperado))
      throw new Error(`Esperaba ${JSON.stringify(esperado)}, recibí ${JSON.stringify(valor)}`);
  },
  toThrow: (mensaje) => {
    // TU CÓDIGO AQUÍ — para funciones que deben lanzar error
  },
  rejects: {
    toThrow: async (mensaje) => {
      // TU CÓDIGO AQUÍ — para promises que deben rechazar
    }
  },
  toBeTruthy: () => { if (!valor) throw new Error(`Esperaba truthy, recibí ${valor}`); },
  toBeFalsy:  () => { if (valor)  throw new Error(`Esperaba falsy, recibí ${valor}`); },
  toContain:  (item) => {
    if (!valor.includes(item)) throw new Error(`${JSON.stringify(valor)} no contiene ${JSON.stringify(item)}`);
  },
  toHaveLength: (n) => {
    if (valor.length!==n) throw new Error(`Longitud ${valor.length}, esperaba ${n}`);
  }
});

// ── Utilidad spy ──────────────────────────────────────────────
function spy(fn = ()=>{}) {
  const llamadas = [];
  const wrapper = (...args) => { llamadas.push({ args, ts:Date.now() }); return fn(...args); };
  wrapper.llamadas = llamadas;
  wrapper.vecesLlamada = () => llamadas.length;
  wrapper.llamadaCon = (...args) => llamadas.some(l=>JSON.stringify(l.args)===JSON.stringify(args));
  return wrapper;
}


// ── Código a testear ──────────────────────────────────────────

class Calculadora {
  sumar(a,b) { return a+b; }
  restar(a,b) { return a-b; }
  dividir(a,b) {
    if (b===0) throw new Error("División por cero");
    return a/b;
  }
  async calcularRemoto(operacion, a, b) {
    // simula llamada async
    await new Promise(r=>setTimeout(r,10));
    if (operacion==="suma") return a+b;
    throw new Error(`Operación desconocida: ${operacion}`);
  }
}

class CarritoService {
  constructor(repo, descuentos) {
    this.repo = repo;
    this.descuentos = descuentos;
  }
  async agregar(userId, productoId, cantidad=1) {
    const producto = await this.repo.getProducto(productoId);
    if (!producto) throw new Error(`Producto ${productoId} no encontrado`);
    const carrito = await this.repo.getCarrito(userId) ?? { userId, items:[] };
    const existente = carrito.items.find(i=>i.productoId===productoId);
    if (existente) existente.cantidad += cantidad;
    else carrito.items.push({ productoId, cantidad, precio:producto.precio });
    return this.repo.guardarCarrito(carrito);
  }
  calcularTotal(carrito, codigoDescuento=null) {
    const subtotal = carrito.items.reduce((a,i)=>a+(i.precio*i.cantidad),0);
    const pct = codigoDescuento ? this.descuentos[codigoDescuento] ?? 0 : 0;
    return subtotal * (1-pct);
  }
}


// ── Tests ─────────────────────────────────────────────────────

// PARTE 1: Tests de Calculadora
describe("Calculadora", () => {
  const calc = new Calculadora();

  // TU CÓDIGO: escribe al menos 6 tests cubriendo:
  // - sumar: casos normales, negativos, decimales
  // - restar
  // - dividir: caso normal + error por cero
  // - calcularRemoto: async happy path + error
});


// PARTE 2: Tests de CarritoService con mocks
describe("CarritoService", () => {
  // Crea mocks para repo y descuentos
  // TU CÓDIGO: tests para:
  // - agregar producto nuevo al carrito
  // - agregar producto existente (incrementa cantidad)
  // - agregar producto que no existe (debe lanzar error)
  // - calcularTotal sin descuento
  // - calcularTotal con descuento válido
  // - calcularTotal con descuento inválido (0%)
});


// PARTE 3: Property-based testing manual
describe("Property-based: sort", () => {
  // Propiedad 1: ordenar es idempotente (sort(sort(x)) === sort(x))
  // Propiedad 2: la longitud se preserva
  // Propiedad 3: todos los elementos originales están en el resultado
  // Genera 50 arrays aleatorios y verifica cada propiedad
  // TU CÓDIGO AQUÍ
});


// ── Reporte final ─────────────────────────────────────────────
setTimeout(() => {
  console.log(`\n📊 Resultado: ${resultados.pasados} pasados, ${resultados.fallados} fallados`);
  if (resultados.errores.length)
    resultados.errores.forEach(e => console.log(`   ❌ ${e.nombre}: ${e.error}`));
}, 500);
