// Registra inscritos de la masterclass: los manda a n8n
// (flujo "Azul Navegante — Inscritos Masterclass"), que crea la fila en Notion.
const WEBHOOK_URL = "https://n8n.webcraftia.com/webhook/azul-masterclass-registro";

// Respuestas del quiz /quiz (opcionales): solo pasan los campos conocidos
const QUIZ_FIELDS = ["don", "prioridad", "etapa", "monetizar", "consciencia", "ocupacion", "ingresos", "inversion"];
const quizFields = (quiz) => {
  if (!quiz || typeof quiz !== "object") return {};
  return Object.fromEntries(
    QUIZ_FIELDS.map((key) => [`quiz_${key}`, String(quiz[key] || "").trim().slice(0, 200)])
  );
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Método no permitido");
  }

  const { name, email, phone, quiz } = req.body || {};
  if (
    !String(name || "").trim() ||
    !/^\S+@\S+\.\S+$/.test(email || "") ||
    String(phone || "").replace(/\D/g, "").length < 7
  ) {
    return res.status(400).send("Datos inválidos");
  }

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: String(name).trim().slice(0, 200),
      email: String(email).trim().slice(0, 200),
      phone: String(phone).trim().slice(0, 50),
      source: quiz ? "quiz" : "masterclass",
      ...quizFields(quiz),
    }),
  });

  if (!response.ok) {
    console.error("n8n", response.status, await response.text());
    return res.status(502).send("No se pudo registrar");
  }

  return res.status(200).json({ ok: true });
};
