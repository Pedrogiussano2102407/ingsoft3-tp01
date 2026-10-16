const Item = require("./item");

// Un item válido de base. Cada test cambia solo el campo que le interesa.
const itemValido = {
  name: "Martillo",
  description: "Martillo de acero",
  status: "Available",
  stock: 5,
  price: 10,
  category: "507f1f77bcf86cd799439011",
};

describe("Item: validación del modelo", () => {
  it("un item con todos los campos válidos no tiene errores", () => {
    // Act
    const error = new Item(itemValido).validateSync();

    // Assert
    expect(error).toBeUndefined();
  });

  it.each([
    ["stock negativo", { stock: -1 }, "stock"],
    ["precio negativo", { price: -0.01 }, "price"],
    ["status fuera de los permitidos", { status: "Roto" }, "status"],
    ["nombre de 2 caracteres", { name: "ab" }, "name"],
    ["nombre de 101 caracteres", { name: "a".repeat(101) }, "name"],
  ])("rechaza %s", (_caso, cambio, campo) => {
    // Arrange
    const itemInvalido = { ...itemValido, ...cambio };

    // Act
    const error = new Item(itemInvalido).validateSync();

    // Assert
    expect(error).toBeDefined();
    expect(error.errors[campo]).toBeDefined();
  });

  it("acepta stock 0 (borde permitido)", () => {
    const error = new Item({ ...itemValido, stock: 0 }).validateSync();
    expect(error).toBeUndefined();
  });

  it("acepta un nombre de exactamente 3 caracteres (borde permitido)", () => {
    const error = new Item({ ...itemValido, name: "abc" }).validateSync();
    expect(error).toBeUndefined();
  });
});