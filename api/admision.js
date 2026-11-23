// Formulario de admisión de Expansión (/admision): manda las respuestas a n8n
// (flujo "Azul Navegante — Admisión Expansión"), que crea la fila en Notion
// "Admisión Expansión · Alumnos".
const WEBHOOK_URL = "https://n8n.webcraftia.com/webhook/azul-expansion-admision";

const TEXTOS = [
  "nacio", "vive", "ocupacion", "estudios", "que_estudio", "ingresos", "proposito", "dios",
  "por_que", "como_conocio", "resultado", "cambiaria", "reto", "aprende", "tiempo", "intencion", "extra",
];
const LISTAS = ["dones", "conexion", "bloqueos"];

const texto = (v, max = 1900) => String(v || "").trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Método no permitido");
  }

  const b = req.body || {};
  if (
    !texto(b.name) ||
    !/^\S+@\S+\.\S+$/.test(b.email || "") ||
    String(b.phone || "").replace(/\D/g, "").length < 7 ||
    !/^\d{4}-\d{2}-\d{2}$/.test(b.nacimiento || "")
  ) {
    return res.status(400).send("Datos inválidos");
  }

  const datos = {
    name: texto(b.name, 200),
    email: texto(b.email, 200),
    phone: texto(b.phone, 50),
    nacimiento: b.nacimiento,
  };
  TEXTOS.forEach((k) => (datos[k] = texto(b[k])));
  LISTAS.forEach((k) => (datos[k] = (Array.isArray(b[k]) ? b[k] : []).slice(0, 12).map((v) => texto(v, 100))));

  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    console.error("n8n", response.status, await response.text());
    return res.status(502).send("No se pudo enviar");
  }

  // El id de la fila en Notion es el link de la página de onboarding del alumno (/bienvenida/<id>)
  const { id } = await response.json().catch(() => ({}));
  return res.status(200).json({ ok: true, ...(/^[0-9a-f]{32}$/.test(id) && { id }) });
};
