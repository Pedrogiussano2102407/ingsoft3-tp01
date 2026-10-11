const { item_delete_post } = require("./itemController");
const Item = require("../models/item");

// Doble de los modelos: ningún test toca Mongo.
jest.mock("../models/item", () => ({
  findById: jest.fn(),
  findByIdAndRemove: jest.fn(),
}));
jest.mock("../models/category", () => ({
  findById: jest.fn(),
}));

const query = (resultado) => ({ exec: jest.fn().mockResolvedValue(resultado) });
const crearRes = () => ({ writeHead: jest.fn(), send: jest.fn() });
const crearReq = (password) => ({ params: { id: "item1" }, body: { password } });

describe("item_delete_post", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.ADMIN_KEY = "clave-correcta";
  });

  it("clave de admin incorrecta: responde 403 sin consultar la base", async () => {
    const res = crearRes();

    await item_delete_post(crearReq("clave-mala"), res, jest.fn());

    expect(res.writeHead).toHaveBeenCalledWith(403, "Permission denied");
    expect(Item.findById).not.toHaveBeenCalled();
  });

  it("item existente y clave correcta: lo borra y responde success", async () => {
    Item.findById.mockReturnValue(query({ _id: "item1" }));
    const res = crearRes();

    await item_delete_post(crearReq("clave-correcta"), res, jest.fn());

    expect(Item.findByIdAndRemove).toHaveBeenCalledWith("item1");
    expect(res.send).toHaveBeenCalledWith("success");
  });

  it("item inexistente: responde 404 y NO intenta borrar", async () => {
    Item.findById.mockReturnValue(query(null));
    const res = crearRes();

    await item_delete_post(crearReq("clave-correcta"), res, jest.fn());

    expect(res.writeHead).toHaveBeenCalledWith(404, "Item does not exist");
    expect(Item.findByIdAndRemove).not.toHaveBeenCalled();
  });
});