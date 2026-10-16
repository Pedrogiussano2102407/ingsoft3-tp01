import { ERROR } from "./utils";

export type DeleteResult = { ok: true } | { ok: false; message: string };

// El fetch se recibe por parámetro: en la app es el real, en los tests es un doble.
export async function deleteCategoryRequest(
  backendURL: string,
  categoryId: string,
  password: string | null,
  fetchFn: typeof fetch = fetch
): Promise<DeleteResult> {
  if (!password || password.length < 3) {
    return { ok: false, message: "Invalid admin password" };
  }

  try {
    const response = await fetchFn(
      `${backendURL}/category/${categoryId}/delete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );
    if (response.ok) {
      return { ok: true };
    }
    return { ok: false, message: response.statusText };
  } catch (error) {
    return { ok: false, message: ERROR.SERVER_CONNECTION };
  }
}