// 09 · Proxy y Reflect — solution.js

// PARTE 1
function crearPersona(nombre, edad) {
  const obj = { nombre, edad };
  return new Proxy(obj, {
    set(target, prop, value) {
      if (prop === "nombre") {
        if (typeof value !== "string" || !value.trim())
          throw new TypeError("nombre debe ser un string no vacío");
      }
      if (prop === "edad") {
        if (typeof value !== "number" || value < 0 || value > 120)
          throw new TypeError("edad debe ser un número entre 0 y 120");
      }
      return Reflect.set(target, prop, value);
    }
  });
}

// PARTE 2
function observar(obj, callback) {
  return new Proxy(obj, {
    set(target, prop, value) {
      const old = target[prop];
      const result = Reflect.set(target, prop, value);
      if (old !== value) callback(prop, old, value);
      return result;
    }
  });
}

// PARTE 3
function accesoSeguro(obj) {
  if (obj === null || obj === undefined || typeof obj !== "object") return obj;
  return new Proxy(obj, {
    get(target, prop) {
      const val = Reflect.get(target, prop);
      return val !== undefined ? accesoSeguro(val) : undefined;
    }
  });
}

// PARTE 4
function logger(obj, nombre="obj") {
  return new Proxy(obj, {
    get(target, prop) {
      const val = Reflect.get(target, prop);
      console.log(`[GET] ${nombre}.${prop} → ${JSON.stringify(val)}`);
      return val;
    },
    set(target, prop, value) {
      console.log(`[SET] ${nombre}.${prop} ${JSON.stringify(target[prop])} → ${JSON.stringify(value)}`);
      return Reflect.set(target, prop, value);
    }
  });
}

// BONUS
function conPrivados(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      if (typeof prop === "string" && prop.startsWith("_"))
        throw new Error(`No puedes acceder a la propiedad privada: ${prop}`);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      if (typeof prop === "string" && prop.startsWith("_"))
        throw new Error(`No puedes escribir la propiedad privada: ${prop}`);
      return Reflect.set(target, prop, value);
    }
  });
}
