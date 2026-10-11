const mockSave = jest.fn();

const { item_create_post } = require("./itemController");
const Category = require("../models/category");

// Doble de Item: se usa con "new" y su save() lo controlamos desde acá.
jest.mock("../models/item", () =>
  jest.fn().mockImplementation(() => ({ save: mockSave }))
);
jest.mock("../models/category", () => ({ findById: jest.fn() }));

const query = (resultado) => ({ exec: jest.fn().mockResolvedValue(resultado) });
const crearRes = () => ({ writeHead: jest.fn(), send: jest.fn() });

const bodyValido = {
  name: "Martillo",
  description: "Martillo de acero",
  status: "Available",
  stock: 5,
  price: 10,
  category: "cat1",
};

// item_create_post es un arreglo: [validador, validador, controlador]
const validadores = item_create_post.slice(0, -1);
const controlador = item_create_post[item_create_post.length - 1];

const ejecutar = async (body, res) => {
  const req = { body };
  for (const validador of validadores) {
    await validador.run(req);
  }
    await controlador(req, res, (err) => {
    if (err) throw err;
  });
};

describe("item_create_post", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSave.mockResolvedValue(undefined);
    Category.findById.mockReturnValue(query({ _id: "cat1" }));
  });

  it.each([
    ["nombre de 2 caracteres", { name: "ab" }],
    ["descripción de 2 caracteres", { description: "ab" }],
    ["nombre vacío", { name: "" }],
  ])("rechaza %s con 400 y no guarda nada", async (_caso, cambio) => {
    const res = crearRes();

    await ejecutar({ ...bodyValido, ...cambio }, res);

    expect(res.writeHead).toHaveBeenCalledWith(400, expect.any(String));
    expect(mockSave).not.toHaveBeenCalled();
  });

  it("datos válidos y categoría existente: guarda el item y responde success", async () => {
    const res = crearRes();

    await ejecutar(bodyValido, res);

    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith("success");
  });

  it("categoría inexistente: responde 400 'Invalid category' y no guarda", async () => {
    Category.findById.mockReturnValue(query(null));
    const res = crearRes();

    await ejecutar(bodyValido, res);

    expect(res.writeHead).toHaveBeenCalledWith(400, "Invalid category");
    expect(mockSave).not.toHaveBeenCalled();
  });
});