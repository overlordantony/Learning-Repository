// ─────────────────────────────────────────
// 04 · Condicionales — exercise.js
// ─────────────────────────────────────────

// ── PARTE 1: if/else ──────────────────────
// Escribe una función clasificarEdad(edad) que retorne:
// "menor" si < 18, "joven" si < 30, "adulto" si < 60, "mayor" en otro caso
function clasificarEdad(edad) {
  edad = Number(edad);  // Aseguramos que edad sea un número
  if (isNaN(edad) || edad < 0) {
    return "Edad no válida";
  } else if (edad < 18) {
    return "menor";
  } else if (edad < 30) {
    return "joven";
  } else if (edad < 60) {
    return "adulto";
  } else {
    return "mayor";
  }
}
console.log(clasificarEdad(15));  // "menor"
console.log(clasificarEdad(25));  // "joven"
console.log(clasificarEdad(45));  // "adulto"
console.log(clasificarEdad(70));  // "mayor"


// ── PARTE 2: switch ───────────────────────
// Escribe diaSemana(num) que reciba 1-7 y retorne el nombre del día.
// Los días 6 y 7 deben retornar "fin de semana" (fall-through).
function diaSemana(num) {
  switch (num) {
    case 1:
      return "lunes";
    case 2:
      return "martes";
    case 3:
      return "miércoles";
    case 4:
      return "jueves";
    case 5:
      return "viernes";
    case 6:
    case 7:
      return "fin de semana";
    default:
      return "Número no válido";
  }
}
console.log(diaSemana(1));  // "lunes"
console.log(diaSemana(5));  // "viernes"
console.log(diaSemana(6));  // "fin de semana"
console.log(diaSemana(7));  // "fin de semana"
console.log(diaSemana(8));  // "Número no válido"


// ── PARTE 3: Optional chaining ────────────
// Dado este objeto, accede a ciudad sin que tire error si alguna propiedad no existe
const usuario = { nombre: "Ana", direccion: { ciudad: "Cali" } };
const usuarioSinDir = { nombre: "Luis" };

console.log(usuario.direccion?.ciudad);  // "Cali"
console.log(usuarioSinDir.direccion?.ciudad);  // undefined


// ── PARTE 4: Guard clauses ────────────────
// Reescribe esta función usando guard clauses en vez de ifs anidados
function procesarPedido(pedido) {
  if (pedido) {
    if (pedido.items && pedido.items.length > 0) {
      if (pedido.usuario) {
        console.log("Pedido válido:", pedido);
        return true;
      }
    }
  }
  return false;
}

function procesarPedidoV2(pedido) {
  if (!pedido) return false;
  if (!pedido.items || pedido.items.length === 0) return false;
  if (!pedido.usuario) return false;

  console.log("Pedido válido:", pedido);
  return true;
}
console.log(procesarPedidoV2({ items: ["item1"], usuario: "Ana" }));  // true
console.log(procesarPedidoV2({ items: [], usuario: "Ana" }));  // false
console.log(procesarPedidoV2({ usuario: "Ana" }));  // false
console.log(procesarPedidoV2(null));  // false
