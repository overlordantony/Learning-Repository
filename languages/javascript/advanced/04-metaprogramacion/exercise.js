// 04 · Metaprogramación — exercise.js

// PARTE 1: Symbol como clave privada no colisionable
// Crea un sistema de plugins donde cada plugin tiene un ID de Symbol único
// El ID no debe ser accesible desde Object.keys() ni JSON.stringify()
const crearPlugin = (nombre, inicializar) => {
  // TU CÓDIGO AQUÍ
};
const p1 = crearPlugin("auth", () => console.log("auth iniciado"));
const p2 = crearPlugin("cache", () => console.log("cache iniciado"));
console.log(Object.keys(p1)); // solo ["nombre"], no el Symbol ID


// PARTE 2: Symbol.iterator — clase Matriz iterable
// Implementa clase Matriz(filas, cols, datos=[]) que sea iterable
// Iterando debe retornar cada celda como { fila, col, valor }
class Matriz {
  constructor(filas, cols, datos=[]) {
    this.filas = filas; this.cols = cols;
    this.datos = datos.length ? datos : Array(filas*cols).fill(0);
  }
  get(f,c) { return this.datos[f*this.cols+c]; }
  set(f,c,v) { this.datos[f*this.cols+c] = v; return this; }
  [Symbol.iterator]() {
    // TU CÓDIGO AQUÍ
  }
}
const m = new Matriz(2,3,[1,2,3,4,5,6]);
for (const celda of m) console.log(celda); // {fila:0,col:0,valor:1} ... {fila:1,col:2,valor:6}


// PARTE 3: Symbol.toPrimitive para clase Fraccion
// Implementa Fraccion(numerador, denominador) que:
// - hint "number" → valor decimal
// - hint "string" → "3/4"
// - soporta suma con + (hint "default")
class Fraccion {
  constructor(num, den) {
    if (den === 0) throw new RangeError("Denominador no puede ser 0");
    const mcd = Fraccion.#mcd(Math.abs(num), Math.abs(den));
    this.num = num/mcd; this.den = den/mcd;
  }
  static #mcd(a,b) { return b===0 ? a : Fraccion.#mcd(b, a%b); }
  [Symbol.toPrimitive](hint) {
    // TU CÓDIGO AQUÍ
  }
  [Symbol.toStringTag]() { return "Fraccion"; } // pista: esto está mal — corrígelo
}
const f = new Fraccion(3,4);
console.log(+f);        // 0.75
console.log(`${f}`);    // "3/4"
console.log(f + 0.25);  // 1


// PARTE 4: Tagged template para SQL seguro
// Implementa sql`` que construye queries parametrizadas
// Los valores interpolados deben ir como parámetros, no concatenados
function sql(strings, ...values) {
  // Retorna { query: string con $1,$2..., params: [...valores] }
  // TU CÓDIGO AQUÍ
}
const userId = 42;
const nombre = "Ana'; DROP TABLE users; --";
const resultado = sql`SELECT * FROM users WHERE id=${userId} AND nombre=${nombre}`;
console.log(resultado.query);  // "SELECT * FROM users WHERE id=$1 AND nombre=$2"
console.log(resultado.params); // [42, "Ana'; DROP TABLE users; --"]


// PARTE 5: Symbol.hasInstance custom
// Crea un "tipo" NumeroPositivo que permite usar instanceof
const NumeroPositivo = {
  [Symbol.hasInstance](valor) {
    // TU CÓDIGO AQUÍ
  }
};
console.log(5 instanceof NumeroPositivo);   // true
console.log(-1 instanceof NumeroPositivo);  // false
console.log(0 instanceof NumeroPositivo);   // false


// BONUS: Tagged template para HTML con sanitización automática
function html(strings, ...values) {
  // Escapa todos los valores interpolados para prevenir XSS
  // TU CÓDIGO AQUÍ
}
const userInput = "<script>alert('xss')</script>";
console.log(html`<p>Hola ${userInput}</p>`);
// "<p>Hola &lt;script&gt;alert('xss')&lt;/script&gt;</p>"
