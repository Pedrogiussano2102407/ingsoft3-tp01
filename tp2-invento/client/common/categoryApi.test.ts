import { describe, it, expect, vi } from "vitest";
import { deleteCategoryRequest } from "./categoryApi";
import { ERROR } from "./utils";

const BACKEND = "http://localhost:3001";
const comoFetch = (f: unknown) => f as typeof fetch;

describe("deleteCategoryRequest", () => {
  it.each([
    ["clave vacía", ""],
    ["clave nula (cancelaron el prompt)", null],
    ["clave de 2 caracteres", "ab"],
  ] as [string, string | null][])(
    "rechaza %s sin llamar al backend",
    async (_caso, clave) => {
      const fetchFalso = vi.fn();

      const resultado = await deleteCategoryRequest(
        BACKEND, "cat1", clave, comoFetch(fetchFalso)
      );

      expect(resultado).toEqual({ ok: false, message: "Invalid admin password" });
      expect(fetchFalso).not.toHaveBeenCalled();
    }
  );

  it("clave válida: hace POST a la URL correcta con la clave en el body", async () => {
    const fetchFalso = vi.fn().mockResolvedValue({ ok: true, statusText: "OK" });

    const resultado = await deleteCategoryRequest(
      BACKEND, "cat1", "secreta", comoFetch(fetchFalso)
    );

    expect(resultado).toEqual({ ok: true });
    expect(fetchFalso).toHaveBeenCalledTimes(1);
    expect(fetchFalso).toHaveBeenCalledWith(
      "http://localhost:3001/category/cat1/delete",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ password: "secreta" }),
      })
    );
  });

  it("el backend responde con error: devuelve su statusText", async () => {
    const fetchFalso = vi.fn().mockResolvedValue({ ok: false, statusText: "Forbidden" });

    const resultado = await deleteCategoryRequest(
      BACKEND, "cat1", "secreta", comoFetch(fetchFalso)
    );

    expect(resultado).toEqual({ ok: false, message: "Forbidden" });
  });

  it("no hay conexión con el backend: devuelve el mensaje de conexión", async () => {
    const fetchFalso = vi.fn().mockRejectedValue(new Error("network"));

    const resultado = await deleteCategoryRequest(
      BACKEND, "cat1", "secreta", comoFetch(fetchFalso)
    );

    expect(resultado).toEqual({ ok: false, message: ERROR.SERVER_CONNECTION });
  });
});