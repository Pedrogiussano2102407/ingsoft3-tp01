const { category_create_post } = require("./categoryController");
const Category = require("../models/category");

// Doble de Category: se puede usar con "new" y tiene find().
jest.mock("../models/category", () => {
  const Category = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(undefined),
  }));
  Category.find = jest.fn();
  return Category;
});

const query = (resultado) => ({ exec: jest.fn().mockResolvedValue(resultado) });
const crearRes = () => ({ writeHead: jest.fn(), send: jest.fn() });

// category_create_post es un arreglo: [validador, validador, ..., controlador]
const validadores = category_create_post.slice(0, -1);
const controlador = category_create_post[category_create_post.length - 1];

const ejecutar = async (body, res) => {
  const req = { body };
  for (const validador of validadores) {
    await validador.run(req);
  }
  await controlador(req, res, jest.fn());
};

describe("category_create_post", () => {
  beforeEach(() => jest.clearAllMocks());

  it.each([
    ["nombre de 2 caracteres", { name: "ab", description: "Descripcion valida" }],
    ["nombre vacío", { name: "", description: "Descripcion valida" }],
    ["descripción de 2 caracteres", { name: "Herramientas", description: "ab" }],
  ])("rechaza %s con 400 y no crea nada", async (_caso, body) => {
    const res = crearRes();

    await ejecutar(body, res);

    expect(res.writeHead).toHaveBeenCalledWith(400, expect.any(String));
    expect(Category).not.toHaveBeenCalled();
  });

  it("datos válidos y nombre libre: crea la categoría y responde success", async () => {
    Category.find.mockReturnValue(query([]));
    const res = crearRes();

    await ejecutar({ name: "Herramientas", description: "Descripcion valida" }, res);

    expect(Category).toHaveBeenCalledWith({
      name: "Herramientas",
      description: "Descripcion valida",
    });
    expect(res.send).toHaveBeenCalledWith("success");
  });

  it("nombre que ya existe: responde 403 y no crea otra categoría", async () => {
    Category.find.mockReturnValue(query([{ name: "Herramientas" }]));
    const res = crearRes();

    await ejecutar({ name: "Herramientas", description: "Descripcion valida" }, res);

    expect(res.writeHead.mock.calls[0][0]).toBe(403);
    expect(Category).not.toHaveBeenCalled();
  });
});