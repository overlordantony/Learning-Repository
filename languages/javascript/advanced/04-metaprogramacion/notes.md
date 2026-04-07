# 04 · Metaprogramación

## ¿Qué es metaprogramación?
Código que inspecciona, modifica o genera otro código en tiempo de ejecución.
En JS: Symbol, Proxy/Reflect (ya visto), tagged templates, descriptores de propiedad.

---

## Symbol — identificadores únicos
```js
const ID = Symbol("id");       // descripción opcional, solo para debug
Symbol("id") === Symbol("id"); // false — siempre único

// Usar como clave no colisionable
const obj = { [ID]: 123, nombre: "Ana" };
obj[ID];          // 123
Object.keys(obj); // ["nombre"] — Symbol no aparece
```

### Well-known Symbols — hooks del lenguaje
```js
Symbol.iterator    // hace el objeto iterable
Symbol.toPrimitive // controla la conversión a primitivo
Symbol.toStringTag // controla Object.prototype.toString
Symbol.hasInstance // controla instanceof
Symbol.species     // controla qué constructor usan métodos como map()
```

---

## Symbol.iterator custom
```js
class Rango {
  constructor(inicio, fin) { this.inicio=inicio; this.fin=fin; }
  [Symbol.iterator]() {
    let current = this.inicio;
    const fin = this.fin;
    return { next() {
      return current<=fin ? {value:current++,done:false} : {value:undefined,done:true};
    }};
  }
}
[...new Rango(1,5)]; // [1,2,3,4,5]
```

## Symbol.toPrimitive
```js
class Dinero {
  constructor(cantidad, moneda) { this.cantidad=cantidad; this.moneda=moneda; }
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.cantidad;
    if (hint === "string") return `${this.cantidad} ${this.moneda}`;
    return this.cantidad; // "default"
  }
}
const precio = new Dinero(150000, "COP");
+precio;         // 150000 (hint: "number")
`${precio}`;     // "150000 COP" (hint: "string")
precio + 10000;  // 160000 (hint: "default")
```

## Symbol.toStringTag
```js
class MiClase {
  get [Symbol.toStringTag]() { return "MiClase"; }
}
Object.prototype.toString.call(new MiClase()); // "[object MiClase]"
```

---

## Tagged Template Literals
Una función que procesa un template literal.
```js
function html(strings, ...values) {
  return strings.reduce((resultado, str, i) => {
    const val = values[i-1];
    const escaped = String(val ?? "").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    return resultado + escaped + str;
  });
}
const user = "<script>alert('xss')</script>";
html`<p>Hola, ${user}</p>`; // <p>Hola, &lt;script&gt;alert('xss')&lt;/script&gt;</p>
```

---

## Property descriptors avanzados
```js
// Propiedad calculada no enumerable
Object.defineProperty(Array.prototype, "last", {
  get() { return this[this.length-1]; },
  enumerable: false,
  configurable: true
});
[1,2,3].last; // 3
```

---

## Referencias
- MDN Symbol: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Symbol
- MDN Tagged Templates: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
