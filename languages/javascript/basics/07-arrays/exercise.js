// 07 · Arrays — exercise.js

const productos = [
  { nombre: "Laptop", precio: 2500000, categoria: "tech" },
  { nombre: "Mouse", precio: 80000, categoria: "tech" },
  { nombre: "Silla", precio: 450000, categoria: "muebles" },
  { nombre: "Teclado", precio: 150000, categoria: "tech" },
  { nombre: "Escritorio", precio: 800000, categoria: "muebles" },
  { nombre: "Monitor", precio: 1200000, categoria: "tech" },
];

// ── PARTE 1: Métodos básicos ──────────────
// Agrega un nuevo producto al final
// Elimina el primero
// ¿Cuántos productos quedan?
productos.push({ nombre: "Auriculares", precio: 200000, categoria: "tech" });
productos.shift();
console.log(productos.length);

// ── PARTE 2: filter ───────────────────────
// Filtra solo los de categoría "tech"
const techProducts = productos.filter(producto => producto.categoria === "tech");
console.log(techProducts);

// ── PARTE 3: map ──────────────────────────
// Crea un nuevo array con solo los nombres de los productos
// Crea otro con los precios con 10% de descuento
const nombres = productos.map(producto => producto.nombre);
const preciosDescuento = productos.map(producto => ({
  ...producto,
  precio: producto.precio * 0.9
}));
console.log(nombres);
console.log(preciosDescuento);

// ── PARTE 4: reduce ───────────────────────
// Calcula el precio total de todos los productos
const precioTotal = productos.reduce((total, producto) => total + producto.precio, 0);
console.log(precioTotal);

// ── PARTE 5: Encadenar métodos ────────────
// En UNA sola expresión encadenada:
// - filtra los de "tech"
// - ordena por precio ascendente
// - retorna solo los nombres
const nombresTechOrdenados = productos
  .filter(producto => producto.categoria === "tech")
  .sort((a, b) => a.precio - b.precio)
  .map(producto => producto.nombre);
console.log(nombresTechOrdenados);

// ── PARTE 6: Destructuring + spread ───────
// Extrae el primer y último producto con destructuring
// Crea una copia del array sin el primer elemento usando spread
const [primerProducto, ...restoProductos] = productos;
const copiaSinPrimero = [...restoProductos];
console.log(primerProducto);
console.log(copiaSinPrimero);

// ── BONUS ─────────────────────────────────
// Escribe agruparPorCategoria(arr) que retorne un objeto:
// { tech: [...], muebles: [...] }
function agruparPorCategoria(arr) {
  return arr.reduce((acc, producto) => {
    const { categoria } = producto;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(producto);
    return acc;
  }, {});
}
const productosAgrupados = agruparPorCategoria(productos);
console.log(productosAgrupados);
