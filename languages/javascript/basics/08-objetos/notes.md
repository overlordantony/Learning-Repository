# 08 · Objetos

## Creación
```js
const obj = { clave: "valor", numero: 42 };
```

## Acceso a propiedades
```js
obj.clave          // notación de punto
obj["clave"]       // notación de corchetes (útil con keys dinámicas)
const key = "clave";
obj[key]           // acceso dinámico
```

## Métodos en objetos
```js
const persona = {
  nombre: "Ana",
  saludar() {  // shorthand method
    return `Hola, soy ${this.nombre}`;
  }
};
```

## Destructuring
```js
const { nombre, edad } = persona;
const { nombre: n, edad: e } = persona; // renombrar
const { nombre, ciudad = "Cali" } = persona; // valor por defecto
```

## Spread en objetos
```js
const copia = { ...obj };
const extendido = { ...obj, nuevo: "valor" };
const actualizado = { ...persona, edad: 30 }; // sobrescribe edad
```

## Métodos estáticos de Object
```js
Object.keys(obj)     // array de claves
Object.values(obj)   // array de valores
Object.entries(obj)  // array de [clave, valor]
Object.assign(dest, src)  // copia propiedades
Object.freeze(obj)   // hace el objeto inmutable
```

## Objetos anidados
```js
const empresa = {
  nombre: "ACME",
  direccion: {
    ciudad: "Cali",
    pais: "Colombia"
  }
};
const { direccion: { ciudad } } = empresa; // destructuring anidado
```

## Propiedad shorthand
```js
const nombre = "Ana";
const edad = 28;
const persona = { nombre, edad }; // equivale a { nombre: nombre, edad: edad }
```

## Computed properties
```js
const key = "dinamico";
const obj = { [key]: "valor" }; // { dinamico: "valor" }
```

## Referencias
- MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object
