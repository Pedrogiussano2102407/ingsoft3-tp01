import { describe, it, expect } from "vitest";
import { getStatusBadgeColor } from "./utils";
import type { ItemStatus } from "./types";

describe("getStatusBadgeColor", () => {
  it.each([
    ["Available", "green"],
    ["Maintenance", "orange"],
    ["Loaned", "pink"],
    ["Reserved", "violet"],
  ] as [ItemStatus, string][])(
    "el estado %s se muestra con el color %s",
    (estado, color) => {
      expect(getStatusBadgeColor(estado)).toBe(color);
    }
  );

  it("un estado desconocido cae en el color por defecto (violet)", () => {
    expect(getStatusBadgeColor("Roto" as ItemStatus)).toBe("violet");
  });
});