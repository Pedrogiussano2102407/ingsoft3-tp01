import type { NextApiRequest, NextApiResponse } from "next";

// El navegador le pide todo a su MISMO origen (/api/...) y este archivo reenvia el pedido
// al backend de ESTE entorno. La direccion sale de la variable BACKEND_URL, que se lee en
// cada pedido, con el servidor ya corriendo: no se hornea en la imagen. Por eso la misma
// imagen sirve en QA y en PROD, y lo unico que cambia es la variable del entorno.

// Se desactiva el parseo del cuerpo: se reenvia tal cual llego (JSON, formulario, lo que sea).
export const config = { api: { bodyParser: false, responseLimit: false } };

function leerCuerpo(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const partes: Buffer[] = [];
    req.on("data", (parte) => partes.push(Buffer.from(parte)));
    req.on("end", () => resolve(Buffer.concat(partes)));
    req.on("error", reject);
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Sin barra al final: si no, se arma "https://api//categories".
  const base = (process.env.BACKEND_URL || "http://localhost:3001").replace(
    /\/+$/,
    ""
  );
  // /api/categories?x=1  ->  <BACKEND_URL>/categories?x=1
  const destino = base + (req.url || "").replace(/^\/api/, "");

  const headers: Record<string, string> = {};
  if (req.headers["content-type"]) {
    headers["content-type"] = String(req.headers["content-type"]);
  }
  if (req.headers["accept"]) {
    headers["accept"] = String(req.headers["accept"]);
  }

  const metodo = req.method || "GET";
  const lleva_cuerpo = metodo !== "GET" && metodo !== "HEAD";

  try {
    const respuesta = await fetch(destino, {
      method: metodo,
      headers,
      body: lleva_cuerpo ? await leerCuerpo(req) : undefined,
    });

    const contenido = Buffer.from(await respuesta.arrayBuffer());
    // El front lee statusText para mostrar los errores del backend (403 "Permission denied"...).
    if (respuesta.statusText) {
      res.statusMessage = respuesta.statusText;
    }
    res.status(respuesta.status);
    const tipo = respuesta.headers.get("content-type");
    if (tipo) {
      res.setHeader("content-type", tipo);
    }
    res.send(contenido);
  } catch (error) {
    res.status(502).json({ error: "No se pudo contactar al backend" });
  }
}