// Formulario de onboarding de Azul Navegante (/azul-navegante): crea una fila por participante
// en Notion "Azul Navegante · Participantes" (dentro de "Equipo Laura").
// Variable en Vercel: NOTION_TOKEN (la misma de /alumnos), con permiso para crear en esa base.
const BASE = "42337f977de6815d93f6e892f93da742";

const AREAS = ["Identidad", "Emociones", "Creencias", "Propósito", "Relaciones", "Dinero"];
const TIEMPOS = ["30 minutos", "45 minutos", "1 hora o más"];
const ESCALA = ["claridad", "confianza", "calma", "constancia"];
// Respuesta abierta → columna en Notion
const TEXTOS = {
  preferido: "Nombre preferido",
  vive: "Vive en",
  zona: "Zona horaria",
  motivo: "Motivación",
  patron: "Patrón que se repite",
  cambio: "Cambio que busca",
  intentado: "Qué ha intentado",
  apoyo: "Apoyo que necesita",
  disponibilidad: "Disponibilidad",
};

const texto = (v, max = 1900) => String(v ?? "").trim().slice(0, max);
const rico = (t) => ({ rich_text: t ? [{ text: { content: t } }] : [] });
const opcion = (v, lista) => ({ select: lista.includes(v) ? { name: v } : null });

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Método no permitido");
  }
  if (!process.env.NOTION_TOKEN) return res.status(503).send("La página todavía no está configurada");

  const b = req.body || {};
  if (b.web) return res.status(200).json({ ok: true }); // campo trampa: lo llenan los robots
  if (
    !texto(b.nombre) ||
    !/^\S+@\S+\.\S+$/.test(texto(b.correo)) ||
    texto(b.celular).replace(/\D/g, "").length < 7 ||
    b.acepta !== true
  ) {
    return res.status(400).send("Datos inválidos");
  }

  const niveles = ESCALA.filter((k) => Number.isInteger(b[k]) && b[k] >= 0 && b[k] <= 10)
    .map((k) => `${k[0].toUpperCase()}${k.slice(1)} ${b[k]}`)
    .join(" · ");
  // Hasta 3 áreas en orden de prioridad, sin repetir (antes llegaba una sola, como texto)
  const areas = [...new Set([].concat(b.area ?? []))].filter((a) => AREAS.includes(a)).slice(0, 3);
  const properties = {
    Nombre: { title: [{ text: { content: texto(b.nombre, 120) } }] },
    "Correo de compra": { email: texto(b.correo, 200) },
    WhatsApp: { phone_number: texto(b.celular, 40) },
    "Área a priorizar": opcion(areas[0], AREAS),
    "Segunda área": opcion(areas[1], AREAS),
    "Tercera área": opcion(areas[2], AREAS),
    "Tiempo diario": opcion(b.tiempo, TIEMPOS),
    "Punto de partida 0–10": rico(niveles),
    "Aceptó uso de datos": { date: { start: new Date().toISOString() } },
  };
  for (const [k, columna] of Object.entries(TEXTOS)) properties[columna] = rico(texto(b[k]));

  try {
    const r = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parent: { database_id: BASE }, properties }),
    });
    if (r.ok) return res.status(200).json({ ok: true });
    const e = await r.json().catch(() => ({}));
    console.error("azul-navegante", r.status, e.code, e.message);
  } catch (e) {
    console.error("azul-navegante", e.message);
  }
  return res.status(502).send("No se pudo enviar");
};
