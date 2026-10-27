// Registra inscritos de la masterclass en MailerLite.
// Variables de entorno en Vercel: MAILERLITE_API_KEY y MAILERLITE_GROUP_ID
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Método no permitido");
  }

  const { name, email, phone } = req.body || {};
  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).send("Datos inválidos");
  }

  const { MAILERLITE_API_KEY, MAILERLITE_GROUP_ID } = process.env;
  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    console.error("Faltan MAILERLITE_API_KEY o MAILERLITE_GROUP_ID");
    return res.status(503).send("Registro no configurado");
  }

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILERLITE_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      fields: { name: name.trim(), phone: (phone || "").trim() },
      groups: [MAILERLITE_GROUP_ID],
    }),
  });

  if (!response.ok) {
    console.error("MailerLite", response.status, await response.text());
    return res.status(502).send("No se pudo registrar");
  }

  return res.status(200).json({ ok: true });
};
