import { test, expect } from "@playwright/test";

// Contra la api REAL de QA (sin navegador y sin dobles). La URL y la clave llegan por entorno.
const API = process.env.API_BASE_URL;
const ADMIN_KEY = process.env.ADMIN_KEY;

const unico = (prefijo) => `${prefijo}-${Date.now()}`;
const creadas = [];

async function listar(request) {
  const r = await request.get(`${API}/categories`);
  expect(r.status()).toBe(200);
  return r.json();
}

async function borrar(request, id) {
  return request.post(`${API}/category/${id}/delete`, { data: { password: ADMIN_KEY } });
}

test.beforeAll(() => {
  if (!API || !ADMIN_KEY) throw new Error("Faltan API_BASE_URL o ADMIN_KEY");
});

// Cada prueba limpia lo que creó, pase o falle.
test.afterEach(async ({ request }) => {
  const nombres = [...creadas];
  creadas.length = 0;
  const todas = await listar(request);
  for (const c of todas.filter((c) => nombres.includes(c.name))) {
    const r = await borrar(request, c._id);
    expect(r.status()).toBe(200);
  }
  const quedan = (await listar(request)).filter((c) => nombres.includes(c.name));
  expect(quedan).toHaveLength(0);
});

test("alta, lectura y baja de una categoria contra la base real", async ({ request }) => {
  const nombre = unico("api");
  creadas.push(nombre);

  const alta = await request.post(`${API}/category/create`, {
    data: { name: nombre, description: "descripcion de prueba" },
  });
  expect(alta.status()).toBe(200);

  const creada = (await listar(request)).find((c) => c.name === nombre);
  expect(creada).toBeTruthy();
  expect(creada.description).toBe("descripcion de prueba");

  const baja = await borrar(request, creada._id);
  expect(baja.status()).toBe(200);
  expect((await listar(request)).some((c) => c.name === nombre)).toBe(false);
});

test("rechaza un nombre de 2 caracteres con 400 y no crea nada", async ({ request }) => {
  const antes = await (await request.get(`${API}/categories/total`)).json();

  const r = await request.post(`${API}/category/create`, {
    data: { name: "ab", description: "descripcion valida" },
  });
  expect(r.status()).toBe(400);

  const despues = await (await request.get(`${API}/categories/total`)).json();
  expect(despues).toBe(antes);
});

test("rechaza un nombre repetido con 403 y deja una sola categoria", async ({ request }) => {
  const nombre = unico("dup");
  creadas.push(nombre);
  const datos = { name: nombre, description: "descripcion de prueba" };

  expect((await request.post(`${API}/category/create`, { data: datos })).status()).toBe(200);
  const segunda = await request.post(`${API}/category/create`, { data: datos });
  expect(segunda.status()).toBe(403);

  const iguales = (await listar(request)).filter((c) => c.name === nombre);
  expect(iguales).toHaveLength(1);
});