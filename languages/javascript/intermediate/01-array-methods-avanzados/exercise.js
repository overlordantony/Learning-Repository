// 01 · Array Methods Avanzados — exercise.js

const ordenes = [
  { id:1, cliente:"Ana",   productos:["laptop","mouse"],        total:2580000, estado:"entregado" },
  { id:2, cliente:"Luis",  productos:["teclado"],               total:150000,  estado:"pendiente" },
  { id:3, cliente:"Ana",   productos:["monitor","auriculares"], total:1400000, estado:"entregado" },
  { id:4, cliente:"Pedro", productos:["silla"],                 total:450000,  estado:"cancelado" },
  { id:5, cliente:"Luis",  productos:["laptop"],                total:2500000, estado:"pendiente" },
  { id:6, cliente:"Pedro", productos:["escritorio","silla"],    total:1250000, estado:"entregado" },
];

// PARTE 1: flatMap
// Obtén un array plano con TODOS los productos de TODAS las órdenes
let productos = ordenes.flatMap((orden) => orden.productos);
console.log(productos); 

// PARTE 2: reduce para agrupar
// Agrupa las órdenes por cliente → { Ana: [...], Luis: [...], Pedro: [...] }
let ordenesPorCliente = ordenes.reduce((acc, orden) => {
  if (!acc[orden.cliente]) {
    acc[orden.cliente] = [];
  }
  acc[orden.cliente].push(orden);
  return acc;
}, {});
console.log(ordenesPorCliente);

// PARTE 3: reduce para contar
// Cuenta órdenes por estado → { entregado:3, pendiente:2, cancelado:1 }
let conteoPorEstado = ordenes.reduce((acc, orden) => {
  acc[orden.estado] = (acc[orden.estado] || 0) + 1;
  return acc;
}, {});
console.log(conteoPorEstado);

// PARTE 4: sort multicriterio
// Ordena: primero por estado (alfabético), desempate por total DESC
// Sin mutar el original
let ordenesOrdenadas = [...ordenes].sort((a, b) => {
  if (a.estado === b.estado) {
    return b.total - a.total; // total DESC
  }
  return a.estado.localeCompare(b.estado); // estado ASC
});
console.log(ordenesOrdenadas);

// PARTE 5: Array.from como generador de rango
// rango(inicio, fin, paso=1) → [inicio, inicio+paso, ...]
function rango(inicio, fin, paso = 1) {
  return Array.from({ length: Math.ceil((fin - inicio) / paso) }, (_, i) => inicio + i * paso);
}
console.log(rango(0,10,2)); // [0,2,4,6,8]
console.log(rango(1,6));    // [1,2,3,4,5]

// PARTE 6: Pipeline en una sola pasada con reduce
// Filtra entregadas + extrae {cliente, total} — sin map ni filter separados
let resumenEntregas = ordenes.reduce((acc, orden) => {
  if (orden.estado === "entregado") {
    acc.push({ cliente: orden.cliente, total: orden.total });
  }
  return acc;
}, []);
console.log(resumenEntregas);

// BONUS: encuentra el producto más vendido
let productoMasVendido = ordenes.flatMap(orden => orden.productos)
  .reduce((acc, producto) => {
    // Validar que el producto no fue cancelado
    let orden = ordenes.find(o => o.productos.includes(producto));
    if (orden && orden.estado !== "cancelado") {
      acc[producto] = (acc[producto] || 0) + 1;
    }
    return acc;
  }, {});
let maxVentas = Math.max(...Object.values(productoMasVendido));
let productosTop = Object.keys(productoMasVendido).filter(p => productoMasVendido[p] === maxVentas);
console.log(productosTop); // Productos más vendidos