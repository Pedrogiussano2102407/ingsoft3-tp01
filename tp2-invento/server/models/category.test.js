const Category = require("./category");

const categoriaValida = {
  name: "Herramientas",
  description: "Herramientas manuales",
};

describe("Category: validación del modelo", () => {
  it("una categoría con todos los campos válidos no tiene errores", () => {
    const error = new Category(categoriaValida).validateSync();

    expect(error).toBeUndefined();
  });

  it.each([
    ["nombre de 2 caracteres", { name: "ab" }, "name"],
    ["nombre de 101 caracteres", { name: "a".repeat(101) }, "name"],
    ["descripción de 101 caracteres", { description: "a".repeat(101) }, "description"],
    ["descripción ausente", { description: undefined }, "description"],
  ])("rechaza %s", (_caso, cambio, campo) => {
    const categoriaInvalida = { ...categoriaValida, ...cambio };

    const error = new Category(categoriaInvalida).validateSync();

    expect(error).toBeDefined();
    expect(error.errors[campo]).toBeDefined();
  });

  it("acepta un nombre de exactamente 3 caracteres (borde permitido)", () => {
    const error = new Category({ ...categoriaValida, name: "abc" }).validateSync();

    expect(error).toBeUndefined();
  });

  it("acepta un nombre de exactamente 100 caracteres (borde permitido)", () => {
    const error = new Category({ ...categoriaValida, name: "a".repeat(100) }).validateSync();

    expect(error).toBeUndefined();
  });

  it("la url virtual se arma con el id de la categoría", () => {
    const categoria = new Category({
      ...categoriaValida,
      _id: "507f1f77bcf86cd799439011",
    });

    expect(categoria.url).toBe("/category/507f1f77bcf86cd799439011");
  });
});