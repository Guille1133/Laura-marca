// Registra inscritos de la masterclass en una hoja de Google Sheets
// (ver google-sheets/registro.gs). Variables de entorno en Vercel:
// SHEETS_WEBHOOK_URL (URL de la app web de Apps Script) y SHEETS_SECRET
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Método no permitido");
  }

  const { name, email, phone } = req.body || {};
  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).send("Datos inválidos");
  }

  const { SHEETS_WEBHOOK_URL, SHEETS_SECRET } = process.env;
  if (!SHEETS_WEBHOOK_URL || !SHEETS_SECRET) {
    console.error("Faltan SHEETS_WEBHOOK_URL o SHEETS_SECRET");
    return res.status(503).send("Registro no configurado");
  }

  const response = await fetch(SHEETS_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: SHEETS_SECRET,
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      phone: String(phone || "").slice(0, 50),
      source: "masterclass",
    }),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.ok) {
    console.error("Google Sheets", response.status, result);
    return res.status(502).send("No se pudo registrar");
  }

  return res.status(200).json({ ok: true });
};
