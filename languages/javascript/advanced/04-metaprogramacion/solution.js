// 04 · Metaprogramación — solution.js

// PARTE 1
const _ID = Symbol("pluginId");
let _nextId = 1;
const crearPlugin = (nombre, inicializar) => {
  const plugin = { nombre, inicializar };
  Object.defineProperty(plugin, _ID, { value: _nextId++, enumerable: false });
  return plugin;
};

// PARTE 2
class Matriz {
  constructor(filas, cols, datos=[]) {
    this.filas=filas; this.cols=cols;
    this.datos=datos.length?datos:Array(filas*cols).fill(0);
  }
  get(f,c) { return this.datos[f*this.cols+c]; }
  set(f,c,v) { this.datos[f*this.cols+c]=v; return this; }
  [Symbol.iterator]() {
    let f=0, c=0;
    const self=this;
    return {
      next() {
        if (f >= self.filas) return { done:true, value:undefined };
        const celda = { fila:f, col:c, valor:self.get(f,c) };
        c++; if (c>=self.cols) { c=0; f++; }
        return { value:celda, done:false };
      }
    };
  }
}

// PARTE 3
class Fraccion {
  constructor(num,den) {
    if (den===0) throw new RangeError("Den=0");
    const mcd = Fraccion.#mcd(Math.abs(num),Math.abs(den));
    this.num=num/mcd; this.den=den/mcd;
  }
  static #mcd(a,b) { return b===0?a:Fraccion.#mcd(b,a%b); }
  [Symbol.toPrimitive](hint) {
    if (hint==="string") return `${this.num}/${this.den}`;
    return this.num/this.den; // "number" y "default"
  }
  get [Symbol.toStringTag]() { return "Fraccion"; } // getter, no método
}

// PARTE 4
function sql(strings, ...values) {
  let query = strings[0];
  const params = [];
  values.forEach((val,i) => {
    params.push(val);
    query += `$${params.length}${strings[i+1]}`;
  });
  return { query, params };
}

// PARTE 5
const NumeroPositivo = {
  [Symbol.hasInstance](valor) {
    return typeof valor === "number" && Number.isFinite(valor) && valor > 0;
  }
};

// BONUS
function html(strings, ...values) {
  const escape = str => String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#x27;");
  return strings.reduce((acc,str,i) =>
    acc + (i>0 ? escape(values[i-1]) : "") + str
  );
}
