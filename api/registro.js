// Registra inscritos de la masterclass: los manda a n8n
// (flujo "Azul Navegante — Inscritos Masterclass"), que crea la fila en Notion.
const WEBHOOK_URL = "https://n8n.webcraftia.com/webhook/azul-masterclass-registro";

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Método no permitido");
  }

  const { name, phone } = req.body || {};
  if (!String(name || "").trim() || String(phone || "").replace(/\D/g, "").length < 7) {
    return res.status(400).send("Datos inválidos");
  }

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: String(name).trim().slice(0, 200),
      phone: String(phone).trim().slice(0, 50),
      source: "masterclass",
    }),
  });

  if (!response.ok) {
    console.error("n8n", response.status, await response.text());
    return res.status(502).send("No se pudo registrar");
  }

  return res.status(200).json({ ok: true });
};
