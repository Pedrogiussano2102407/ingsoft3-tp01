import type { NextApiRequest, NextApiResponse } from "next";

// El DSN se lee en runtime del contenedor: la misma imagen sirve en QA y PROD.
// Sin SENTRY_DSN_FRONTEND (QA) devuelve null y el navegador no inicia Sentry.
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    dsn: process.env.SENTRY_DSN_FRONTEND || null,
    environment: process.env.SENTRY_ENVIRONMENT || "production",
  });
}
