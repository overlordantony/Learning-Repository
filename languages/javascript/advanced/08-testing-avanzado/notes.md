# 08 · Testing Avanzado

## Pirámide de tests
```
         /E2E\         ← pocos, lentos, costosos
        /-----\
       /  Int  \       ← moderados
      /---------\
     /    Unit   \     ← muchos, rápidos, baratos
    /-------------\
```

## Unit testing — principios
- Una sola unidad de comportamiento por test
- Test debe ser: **rápido, aislado, repetible, auto-verificable, oportuno**
- Nombre del test: `describe("lo que hace") it("comportamiento esperado")`

## AAA Pattern
```js
it("calcula el total con descuento", () => {
  // Arrange — configurar
  const carrito = new Carrito();
  carrito.agregar({ precio: 100 });

  // Act — ejecutar
  const total = carrito.totalConDescuento(0.1);

  // Assert — verificar
  expect(total).toBe(90);
});
```

## Mocks, Stubs y Spies
- **Stub**: reemplaza una función con una versión controlada que retorna valores fijos
- **Mock**: stub que además verifica que fue llamado correctamente
- **Spy**: envuelve la función real y registra cómo fue llamada (sin reemplazarla)

```js
// Stub manual
const fetchStub = async () => ({ id:1, nombre:"Ana" });

// Mock manual
let llamadas = [];
const dbMock = {
  save: async (data) => { llamadas.push(data); return { id:1, ...data }; },
  _getLlamadas: () => llamadas,
  _reset: () => { llamadas = []; }
};

// Spy manual
function spy(fn) {
  const llamadas = [];
  const wrapper = (...args) => { llamadas.push(args); return fn(...args); };
  wrapper.llamadas = llamadas;
  return wrapper;
}
```

## Testing async
```js
// Con async/await
it("carga el usuario", async () => {
  const user = await userService.getById(1);
  expect(user.nombre).toBe("Ana");
});

// Verificar que se lanza un error
it("lanza error si id inválido", async () => {
  await expect(userService.getById(-1)).rejects.toThrow("ID inválido");
});
```

## Testing con dependencias inyectadas (facilita mocking)
```js
class UserService {
  constructor(repo, mailer) { this.repo=repo; this.mailer=mailer; }
  async registrar(datos) {
    const user = await this.repo.save(datos);
    await this.mailer.enviar(user.email, "Bienvenido");
    return user;
  }
}
// En el test:
const repoMock = { save: async (d) => ({ id:1,...d }) };
const mailerSpy = spy(async () => {});
const svc = new UserService(repoMock, mailerSpy);
```

## Property-based testing (concepto)
En vez de ejemplos específicos, generar inputs aleatorios para encontrar edge cases.
```js
// Propiedad: para cualquier array, ordenar dos veces da el mismo resultado
for (let i=0; i<100; i++) {
  const arr = Array.from({length:Math.random()*20|0}, ()=>Math.random()*100|0);
  expect(arr.sort()).toEqual(arr.sort());
}
```

## Test coverage
No es el objetivo en sí — 100% coverage no garantiza buena calidad.
Buscar coverage en: happy path, edge cases, error cases.

## Referencias
- Jest docs: https://jestjs.io/docs/getting-started
- Vitest docs: https://vitest.dev
