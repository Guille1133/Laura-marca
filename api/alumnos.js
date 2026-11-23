// Página privada /alumnos: lista los alumnos de Expansión con el link de su página de onboarding.
// Lee Notion "Admisión Expansión · Alumnos". Usa las mismas variables de Vercel que /equipo:
//   EQUIPO_CLAVE  clave de acceso (12 caracteres o más)
//   NOTION_TOKEN  integración de Notion con acceso a la base de admisión
const crypto = require("crypto");

const ADMISION = "41d37f977de6817abd9fd93296d62b3e";
const DIAS_SESION = 30;

// ---------- Sesión ----------
const igual = (a, b) => {
  const h = (v) => crypto.createHash("sha256").update(String(v)).digest();
  return crypto.timingSafeEqual(h(a), h(b));
};
const firma = (vence) => crypto.createHmac("sha256", process.env.EQUIPO_CLAVE).update(`alumnos:${vence}`).digest("hex");
const cookie = (valor, segundos) =>
  `alumnos=${valor}; Path=/api/alumnos; Max-Age=${segundos}; HttpOnly; Secure; SameSite=Strict`;

function sesionValida(req) {
  const m = /(?:^|;\s*)alumnos=(\d+)\.([0-9a-f]{64})/.exec(req.headers.cookie || "");
  return Boolean(m && Number(m[1]) > Date.now() && igual(m[2], firma(m[1])));
}

// ---------- Notion ----------
async function filas() {
  const todas = [];
  let cursor;
  do {
    const r = await fetch(`https://api.notion.com/v1/databases/${ADMISION}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page_size: 100,
        sorts: [{ timestamp: "created_time", direction: "descending" }],
        ...(cursor && { start_cursor: cursor }),
      }),
    });
    const datos = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`Notion ${r.status} ${datos.code || ""} ${datos.message || ""}`);
    todas.push(...datos.results);
    cursor = datos.has_more ? datos.next_cursor : null;
  } while (cursor);
  return todas;
}

// Solo lo que hace falta para enviar el link; nada de las respuestas de la admisión
function alumno(pagina) {
  const p = pagina.properties;
  return {
    id: pagina.id.replace(/-/g, ""),
    nombre: (p.Nombre?.title || []).map((t) => t.plain_text).join("").trim(),
    whatsapp: p.WhatsApp?.phone_number || "",
    fecha: pagina.created_time,
    proxima: p["Próxima mentoría"]?.date?.start || "",
    realizadas: p["Mentorías realizadas"]?.number || 0,
  };
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Método no permitido" });
  }
  if ((process.env.EQUIPO_CLAVE || "").length < 12 || !process.env.NOTION_TOKEN) {
    return res.status(503).json({ error: "La página todavía no está configurada." });
  }

  if (req.method === "POST") {
    const b = req.body || {};
    if (b.accion === "salir") {
      res.setHeader("Set-Cookie", cookie("", 0));
      return res.status(200).json({ ok: true });
    }
    if (b.accion !== "entrar" || !igual(b.clave ?? "", process.env.EQUIPO_CLAVE)) {
      await new Promise((r) => setTimeout(r, 1500)); // frena los intentos seguidos
      return res.status(401).json({ error: "La clave no coincide." });
    }
    const vence = Date.now() + DIAS_SESION * 86400000;
    res.setHeader("Set-Cookie", cookie(`${vence}.${firma(vence)}`, DIAS_SESION * 86400));
    return res.status(200).json({ ok: true });
  }

  if (!sesionValida(req)) return res.status(401).json({ error: "" });

  try {
    // Se saltan las filas de prueba que empiezan por "EJEMPLO"
    const alumnos = (await filas()).map(alumno).filter((a) => a.nombre && !/^ejemplo\b/i.test(a.nombre));
    return res.status(200).json({ alumnos });
  } catch (e) {
    console.error("alumnos", e.message);
    return res.status(502).json({ error: "No se pudo conectar con Notion. Inténtalo de nuevo." });
  }
};
