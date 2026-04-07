# 08 · Testing Avanzado — Bugs

## Bug 1: Test que depende del orden de ejecución
```js
// MAL: estado compartido entre tests
let carrito;
it("agrega item", () => { carrito.agregar(x); });
it("calcula total", () => { expect(carrito.total()).toBe(x); }); // depende del anterior
// BIEN: setup fresco en cada test (beforeEach o creación local)
```

## Bug 2: Mock que no refleja la interfaz real
Si el mock tiene métodos que no existen en el real, los tests pasan pero la integración falla.
Tipar las interfaces o usar TypeScript ayuda a detectarlo antes.

## Bug 3: No testear casos límite
```js
// Solo testear el happy path no es suficiente
dividir(10,2); // happy path
// También testear:
dividir(0,5);  // cero en numerador
dividir(5,0);  // error
dividir(Number.MAX_SAFE_INTEGER, 1); // overflow
```

## Bug 4: Assertions que nunca se ejecutan en async
```js
it("lanza error", async () => {
  await accionQueFalla(); // si no lanza, el test pasa silenciosamente
  // Agregar: expect.assertions(1) al inicio para asegurar que algo se verificó
});
```

## Notas personales
