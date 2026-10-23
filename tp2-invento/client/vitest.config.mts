import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    // e2e/ tiene pruebas de Playwright: Vitest no debe levantarlas (las corre su propio job)
    exclude: [...configDefaults.exclude, "e2e/**"],
    coverage: {
      provider: "v8",
      // json-summary es el archivo que el pipeline lee para armar el resumen
      reporter: ["text", "html", "lcov", "json-summary"],
      // Qué ENTRA en la cuenta: la lógica pura del cliente.
      include: ["common/**/*.{ts,tsx}"],
      // Qué se saca: los tests, y types.ts (solo tipos, no genera código ejecutable).
      exclude: ["**/*.test.ts", "common/types.ts"],
      thresholds: { lines: 90, branches: 90 },
    },
  },
});