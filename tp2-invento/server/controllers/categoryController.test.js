const { category_delete_post, category_detail } = require("./categoryController");
const Category = require("../models/category");
const Item = require("../models/item");

// Reemplazamos los modelos por dobles: ningún test toca Mongo.
jest.mock("../models/category", () => ({
  findById: jest.fn(),
  findByIdAndRemove: jest.fn(),
}));
jest.mock("../models/item", () => ({
  find: jest.fn(),
}));

// Doble de la query de Mongoose: findById(...) devuelve un objeto con .exec()
const query = (resultado) => ({ exec: jest.fn().mockResolvedValue(resultado) });

const crearRes = () => ({ writeHead: jest.fn(), send: jest.fn() });
const crearReq = (password) => ({ params: { id: "cat1" }, body: { password } });

describe("category_delete_post", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.ADMIN_KEY = "clave-correcta";
  });

  it("clave de admin incorrecta: responde 403 sin consultar la base", async () => {
    const res = crearRes();

    await category_delete_post(crearReq("clave-mala"), res, jest.fn());

    expect(res.writeHead).toHaveBeenCalledWith(403, "Permission denied");
    expect(Category.findById).not.toHaveBeenCalled();
  });

  it("categoría que tiene items: responde 403 y NO la borra", async () => {
    Category.findById.mockReturnValue(query({ _id: "cat1" }));
    Item.find.mockReturnValue(query([{ name: "Martillo" }]));
    const res = crearRes();

    await category_delete_post(crearReq("clave-correcta"), res, jest.fn());

    expect(res.writeHead.mock.calls[0][0]).toBe(403);
    expect(res.writeHead.mock.calls[0][1]).toContain("Martillo");
    expect(Category.findByIdAndRemove).not.toHaveBeenCalled();
  });

  it("categoría inexistente: responde 404", async () => {
    Category.findById.mockReturnValue(query(null));
    Item.find.mockReturnValue(query([]));
    const res = crearRes();

    await category_delete_post(crearReq("clave-correcta"), res, jest.fn());

    expect(res.writeHead.mock.calls[0][0]).toBe(404);
    expect(Category.findByIdAndRemove).not.toHaveBeenCalled();
  });

  it("categoría existente y sin items: la borra y responde success", async () => {
    Category.findById.mockReturnValue(query({ _id: "cat1" }));
    Item.find.mockReturnValue(query([]));
    const res = crearRes();

    await category_delete_post(crearReq("clave-correcta"), res, jest.fn());

    expect(Category.findByIdAndRemove).toHaveBeenCalledTimes(1);
    expect(Category.findByIdAndRemove).toHaveBeenCalledWith("cat1");
    expect(res.send).toHaveBeenCalledWith("success");
  });
});
describe("category_detail", () => {
  beforeEach(() => jest.clearAllMocks());

  it("categoría inexistente: redirige a /categories y no responde también con json", async () => {
    Category.findById.mockReturnValue(query(null));
    const res = { redirect: jest.fn(), json: jest.fn() };

    await category_detail({ params: { id: "no-existe" } }, res, jest.fn());

    expect(res.redirect).toHaveBeenCalledWith("/categories");
    expect(res.json).not.toHaveBeenCalled();
  });
});