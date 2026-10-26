require("dotenv").config();
const Sentry = require("@sentry/node");

// Sin SENTRY_DSN (QA, desarrollo, tests) el SDK queda apagado y no manda nada.
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT || "production",
  tracesSampleRate: 1.0,
});
