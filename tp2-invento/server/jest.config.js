module.exports = {
  // Se mide TODO el JS salvo lo que se saca acá (Exclude, no Include):
  collectCoverageFrom: [
    "**/*.js",
    "!node_modules/**",
    "!coverage/**",
    "!jest.config.js",
    "!**/*.test.js",    // los tests no se miden a sí mismos
    "!bin/**",          // arranque del servidor (bin/www)
    "!app.js",          // arranque y cableado de Express, sin reglas de negocio
    "!routes/**",       // cableado URL -> controlador, sin lógica
    "!populatedb.js",   // script de carga de datos, no es parte de la app
  ],
  coverageReporters: ["text", "lcov", "json-summary"],
  // El umbral: si el total de líneas queda por debajo, Jest termina con error.
  coverageThreshold: {
    global: { lines: 65 },
  },
};