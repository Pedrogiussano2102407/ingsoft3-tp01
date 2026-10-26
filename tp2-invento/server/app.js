require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const Sentry = require("@sentry/node");
const indexRouter = require("./routes/index");

const app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_STRING);
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Contrato "estoy viva" para el monitor externo (TP9)
app.get("/health", (req, res) => {
  const dbOk = mongoose.connection.readyState === 1;
  res.status(dbOk ? 200 : 503).json({ status: dbOk ? "ok" : "db-down" });
});

// TEMPORAL (TP9): error de prueba para Sentry. Se saca al cerrar el practico.
app.get("/debug-sentry", () => {
  throw new Error("Error de prueba de Sentry (TP9)");
});

app.use("/", indexRouter);

// Sentry captura los errores no manejados de las rutas de arriba
Sentry.setupExpressErrorHandler(app);

module.exports = app;
