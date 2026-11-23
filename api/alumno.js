// Página individual de onboarding (/bienvenida/<id>): lee y guarda el mapa del alumno
// con el flujo de n8n "Azul Navegante — Página de alumno Expansión" (Notion).
// GET ?id=...            → { nombre, meta, fechas, hechas, antes }
// POST { id, cambios }   → guarda solo lo que cambió y devuelve el mapa completo
const WEBHOOK_URL = "https://n8n.webcraftia.com/webhook/azul-expansion-alumno";

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).send("Método no permitido");
  }

  const b = (req.method === "GET" ? req.query : req.body) || {};
  const id = String(b.id || "");
  if (!/^[0-9a-f]{32}$/.test(id)) return res.status(400).send("Link inválido");

  const envio = { id };
  if (req.method === "POST") {
    if (!b.cambios || typeof b.cambios !== "object" || JSON.stringify(b.cambios).length > 4000) {
      return res.status(400).send("Datos inválidos");
    }
    envio.cambios = b.cambios;
  }

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(envio),
  });

  if (response.status === 404) return res.status(404).json({ ok: false });
  if (!response.ok) {
    console.error("n8n", response.status, await response.text());
    return res.status(502).send("No se pudo conectar");
  }

  return res.status(200).json(await response.json());
};
