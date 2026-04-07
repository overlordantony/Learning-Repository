// 08 · Testing Avanzado — solution.js (fragmento de los tests)
// El framework y el código a testear son iguales al exercise.js

// PARTE 1: Tests Calculadora
describe("Calculadora", () => {
  const calc = new Calculadora();

  it("suma dos positivos", () => expect(calc.sumar(3,4)).toBe(7));
  it("suma negativos",     () => expect(calc.sumar(-5,-3)).toBe(-8));
  it("suma con decimal",   () => expect(calc.sumar(0.1,0.2)).toBe(0.30000000000000004)); // IEEE 754
  it("resta básica",       () => expect(calc.restar(10,3)).toBe(7));
  it("divide normalmente", () => expect(calc.dividir(10,2)).toBe(5));
  it("lanza error al dividir por cero", () => {
    try { calc.dividir(5,0); throw new Error("Debía lanzar"); }
    catch(e) { expect(e.message).toBe("División por cero"); }
  });
  it("calcularRemoto suma async", async () => {
    const resultado = await calc.calcularRemoto("suma",3,4);
    expect(resultado).toBe(7);
  });
  it("calcularRemoto lanza en operación desconocida", async () => {
    try { await calc.calcularRemoto("raiz",4,0); throw new Error("Debía lanzar"); }
    catch(e) { expect(e.message).toContain("desconocida"); }
  });
});

// PARTE 2: Tests CarritoService
describe("CarritoService", () => {
  const crearMocks = () => {
    const productos = { 1:{id:1,nombre:"Laptop",precio:2500000}, 2:{id:2,nombre:"Mouse",precio:80000} };
    const carritos = {};
    const repo = {
      getProducto: spy(async id => productos[id] ?? null),
      getCarrito:  spy(async uid => carritos[uid] ?? null),
      guardarCarrito: spy(async c => { carritos[c.userId]=c; return c; })
    };
    const descuentos = { PROMO10: 0.10, BLACK: 0.30 };
    return { repo, descuentos };
  };

  it("agrega producto nuevo al carrito", async () => {
    const { repo, descuentos } = crearMocks();
    const svc = new CarritoService(repo, descuentos);
    const carrito = await svc.agregar(1, 1);
    expect(carrito.items).toHaveLength(1);
    expect(carrito.items[0].productoId).toBe(1);
  });

  it("lanza error si producto no existe", async () => {
    const { repo, descuentos } = crearMocks();
    const svc = new CarritoService(repo, descuentos);
    try { await svc.agregar(1, 999); throw new Error("Debía lanzar"); }
    catch(e) { expect(e.message).toContain("999"); }
  });

  it("calcula total con descuento válido", () => {
    const { repo, descuentos } = crearMocks();
    const svc = new CarritoService(repo, descuentos);
    const carrito = { userId:1, items:[{productoId:1,cantidad:1,precio:100}] };
    expect(svc.calcularTotal(carrito,"PROMO10")).toBe(90);
  });

  it("ignora código de descuento inválido", () => {
    const { repo, descuentos } = crearMocks();
    const svc = new CarritoService(repo, descuentos);
    const carrito = { userId:1, items:[{productoId:1,cantidad:1,precio:100}] };
    expect(svc.calcularTotal(carrito,"INVALIDO")).toBe(100);
  });
});

// PARTE 3: Property-based
describe("Property-based: sort", () => {
  const randomArr = () => Array.from({length:Math.random()*20|0+1},()=>Math.random()*100|0);

  it("sort es idempotente (50 casos)", () => {
    for (let i=0;i<50;i++) {
      const arr=randomArr();
      const s1=JSON.stringify([...arr].sort((a,b)=>a-b));
      const s2=JSON.stringify([...arr].sort((a,b)=>a-b).sort((a,b)=>a-b));
      expect(s1).toBe(s2);
    }
  });

  it("preserva longitud (50 casos)", () => {
    for (let i=0;i<50;i++) {
      const arr=randomArr();
      expect([...arr].sort((a,b)=>a-b).length).toBe(arr.length);
    }
  });
});
