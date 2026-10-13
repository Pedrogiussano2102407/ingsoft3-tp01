import type { Item } from "./types";

// Nivel de stock de un item, para mostrar un aviso en la interfaz.
export function stockLevel(item: Pick<Item, "stock" | "status">): string {
  if (item.status === "Loaned" || item.status === "Reserved") {
    return "no-disponible";
  }
  if (item.stock <= 0) {
    return "agotado";
  }
  if (item.stock < 5) {
    return "bajo";
  }
  if (item.stock < 20) {
    return "normal";
  }
  return "alto";
}