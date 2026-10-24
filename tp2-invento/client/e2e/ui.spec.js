import { test, expect } from "@playwright/test";

// Navegador real contra el front de QA. La api se usa solo para preparar y limpiar datos.
const API = process.env.API_BASE_URL;
const ADMIN_KEY = process.env.ADMIN_KEY;

const unico = (prefijo) => `${prefijo}-${Date.now()}`;
const creadas = [];

async function listar(request) {
  const r = await request.get(`${API}/categories`);
  expect(r.status()).toBe(200);
  return r.json();
}

test.beforeAll(() => {
  if (!API || !ADMIN_KEY) throw new Error("Faltan API_BASE_URL o ADMIN_KEY");
});

// Cada prueba limpia lo que creo, pase o falle (si ya la borro la prueba, no hay nada que hacer).
test.afterEach(async ({ request }) => {
  const nombres = [...creadas];
  creadas.length = 0;
  const todas = await listar(request);
  for (const c of todas.filter((c) => nombres.includes(c.name))) {
    const r = await request.post(`${API}/category/${c._id}/delete`, { data: { password: ADMIN_KEY } });
    expect(r.status()).toBe(200);
  }
  const quedan = (await listar(request)).filter((c) => nombres.includes(c.name));
  expect(quedan).toHaveLength(0);
});

test("crear una categoria desde el formulario la muestra en la lista", async ({ page }) => {
  const nombre = unico("e2e");
  creadas.push(nombre);

  await page.goto("/edit/category");
  await page.getByLabel("Name").fill(nombre);
  await page.getByLabel("Description").fill("creada por la prueba e2e");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page).toHaveURL(/\/categories/);
  await expect(page.getByRole("row").filter({ hasText: nombre })).toBeVisible();
  // borrarla desde la tabla y comprobar que la fila desaparece
  page.once("dialog", (dialogo) => dialogo.accept(ADMIN_KEY));
  const filaCreada = page.getByRole("row").filter({ hasText: nombre });
  await filaCreada.getByRole("button", { name: "Delete" }).click();
  await expect(filaCreada).toHaveCount(0);
});

test("un nombre de 2 caracteres muestra el error y no crea nada", async ({ page, request }) => {
  const antes = await (await request.get(`${API}/categories/total`)).json();

  await page.goto("/edit/category");
  await page.getByLabel("Name").fill("ab");
  await page.getByLabel("Description").fill("descripcion valida");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Name must have at least 3 characters")).toBeVisible();
  await expect(page).toHaveURL(/\/edit\/category/);

  const despues = await (await request.get(`${API}/categories/total`)).json();
  expect(despues).toBe(antes);
});

test("borrar desde la tabla pide la clave y quita la fila", async ({ page, request }) => {
  const nombre = unico("del");
  creadas.push(nombre); // por si la prueba falla antes de borrar

  const alta = await request.post(`${API}/category/create`, {
    data: { name: nombre, description: "para borrar desde la UI" },
  });
  expect(alta.status()).toBe(200);

  page.once("dialog", (dialogo) => dialogo.accept(ADMIN_KEY));
  await page.goto("/categories");

  const fila = page.getByRole("row").filter({ hasText: nombre });
  await expect(fila).toBeVisible();
  await fila.getByRole("button", { name: "Delete" }).click();
  await expect(fila).toHaveCount(0);
});