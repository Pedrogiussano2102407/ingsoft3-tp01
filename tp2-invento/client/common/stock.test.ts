import { describe, it, expect } from "vitest";
import type { Item } from "./types";
import { stockLevel } from "./stock";

// Arma un item minimo para stockLevel (solo usa stock y status).
const make = (stock: number, status = "Available") => ({
  stock,
  status: status as Item["status"],
});

describe("stockLevel", () => {
  it.each([
    ["Loaned con stock", 10, "Loaned", "no-disponible"],
    ["Reserved con stock", 10, "Reserved", "no-disponible"],
    ["Loaned gana aunque el stock sea 0", 0, "Loaned", "no-disponible"],
  ])("%s", (_nombre, stock, status, esperado) => {
    expect(stockLevel(make(stock, status))).toBe(esperado);
  });

  it.each([
    [0, "agotado"],
    [-3, "agotado"],
    [1, "bajo"],
    [4, "bajo"],
    [5, "normal"],
    [19, "normal"],
    [20, "alto"],
    [150, "alto"],
  ])("stock %i devuelve %s", (stock, esperado) => {
    expect(stockLevel(make(stock))).toBe(esperado);
  });
});