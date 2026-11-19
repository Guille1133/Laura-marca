// Onboarding de Expansión: mapa de 5 meses, 15 mentorías y fechas.
// Para cambiar un texto, se edita MESES / BONUS / ANTES. Lo que la persona anota
// se guarda en su navegador; con "Copiar link con mis fechas" viaja en el link.

const MESES = [
  {
    puerto: "Identidad",
    frase: "Consolidar la identidad del arquitecto",
    objetivo: "Anclar un yo coherente, estable y poderoso que sostenga el proyecto de vida y el despertar espiritual que vas a construir.",
    sesiones: [
      ["Tu identidad hoy", "Diagnóstico de dónde estás, las brechas entre quién eres y quién necesitas ser, y tu Declaración de Identidad del Arquitecto."],
      ["Tu firma energética", "Trabajo profundo con arquetipos de poder para descubrir tu firma energética única y tu identidad expandida."],
      ["Coherencia y anclaje", "Escaneo de coherencia vibracional, sanación de resistencias y protocolo para anclar tu nueva identidad."],
    ],
    construyes: "Tu Declaración de Identidad del Arquitecto",
    material: ["Workbook «Consolidación identitaria»", "Meditaciones guiadas de anclaje", "Tracker semanal de coherencia"],
  },
  {
    puerto: "Propósito",
    frase: "Diseñar tu proyecto de vida",
    objetivo: "Transformar tu propósito en un proyecto de vida concreto, conectado a tus dones y abundante.",
    sesiones: [
      ["Tu propósito y tu oferta", "Extracción profunda de tu propósito con el Método TRE™ y claridad sobre tu oferta núcleo."],
      ["Tu oferta irresistible", "Diseño de tu servicio o programa, tu cliente ideal y tu propuesta de valor única."],
      ["Tu modelo de negocio", "Modelo de negocio, proyección financiera real y honesta, y cómo validar tu oferta en el mercado."],
    ],
    construyes: "Tu oferta y el canvas de tu proyecto de vida",
    material: ["Canvas del proyecto de vida", "Guía de validación de mercado", "Scripts para conversar con clientes potenciales"],
  },
  {
    puerto: "Marca",
    frase: "Construir tu marca personal",
    objetivo: "Crear una marca coherente, auténtica y magnética que atraiga a tu cliente ideal y refleje tu propósito y tus dones.",
    nota: "Este mes incluye el módulo de marca personal con un mentor experto en marcas con propósito.",
    sesiones: [
      ["El ADN de tu marca", "Tu historia de transformación como imán, tu arquetipo de marca y lo que te hace diferente."],
      ["Tu identidad de marca", "Voz y tono, manifiesto de marca y la base de tu identidad visual."],
      ["Tu estrategia de contenido", "Estrategia personalizada y calendario de contenido a 90 días."],
    ],
    construyes: "Tu manifiesto y tu calendario de contenido",
    material: ["Material personalizado según la construcción de tu marca"],
  },
  {
    puerto: "Abundancia",
    frase: "Monetización consciente y primeros resultados",
    objetivo: "Empezar a generar ingresos reales con estrategias honestas. El enfoque es la coherencia, no la promesa vacía.",
    sesiones: [
      ["Tu relación con el dinero", "Sanación de bloqueos económicos, reprogramación de creencias y tu modelo de monetización."],
      ["Tu precio y tu lanzamiento", "Pricing estratégico y honesto, y la preparación de tu primer lanzamiento."],
      ["Tu primer lanzamiento", "Acompañamiento en el lanzamiento, cierre de ventas desde la energía y análisis de resultados."],
    ],
    construyes: "Tu primer lanzamiento",
    material: ["Scripts de ventas", "Guía de lanzamientos de alto impacto", "E-book «Cómo vender sin vender»"],
  },
  {
    puerto: "Dones y trascendencia",
    frase: "Activar tus dones e impactar al mundo",
    objetivo: "Activar e integrar tus dones espirituales en tu oferta y proyectar tu impacto más allá de estos 5 meses.",
    sesiones: [
      ["La activación de tu don", "Escaneo energético de tus dones latentes y activación profunda de tu don único."],
      ["Tus dones al servicio", "Cómo integrar tus dones en tu oferta de forma ética y abundante, con protección energética."],
      ["Tu cierre y tu legado", "Revisión de tu transformación (mes 1 vs. mes 5) y tu plan de los próximos 12 meses."],
    ],
    construyes: "Tu plan de vida e impacto con tus dones activos",
    material: ["Guía «Despertar y desarrollo de dones espirituales»", "Meditaciones de activación de dones", "Protocolo de protección energética", "Roadmap de impacto"],
  },
];

const BONUS = [
  ["Sanación energética familiar", "Una sesión para sanar dinámicas familiares que afectan tu expansión y la activación de tus dones."],
  ["Activación individual de dones", "Una sesión con Laura enfocada en tu don principal: activación profunda, protocolo de desarrollo y protección energética."],
];

const ANTES = [
  ["Completa tu formulario de admisión", "/admision"],
  ["Entra a la plataforma de formación y ubica el módulo del mes 1", ""],
  ["Agenda tus 3 mentorías del primer mes y anótalas en esta página", "#mapa"],
  ["Elige un cuaderno solo para Expansión", ""],
  ["Prepara un espacio tranquilo para tus mentorías y una oración para empezar", ""],
];

const DURACION_MIN = 60; // duración de cada mentoría en el calendario

// ---------- Estado ----------
const CLAVE = "bienvenida-expansion-v1";
let estado = { nombre: "", meta: "", fechas: {}, hechas: {}, antes: {} };
try {
  const guardado = JSON.parse(localStorage.getItem(CLAVE));
  if (guardado) estado = { ...estado, ...guardado };
} catch {}

// Link compartido: #f=... trae nombre, meta y fechas
function leerLink() {
  const m = location.hash.match(/^#f=([\w-]+)/);
  if (!m) return;
  try {
    const b64 = m[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const datos = JSON.parse(new TextDecoder().decode(bytes));
    if (datos.n) estado.nombre = String(datos.n).slice(0, 80);
    if (datos.m) estado.meta = String(datos.m).slice(0, 200);
    if (datos.f && typeof datos.f === "object") {
      Object.entries(datos.f).forEach(([k, v]) => {
        if (/^(s\d{1,2}|b\d)$/.test(k) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v)) estado.fechas[k] = v;
      });
    }
    guardar();
    history.replaceState(null, "", location.pathname);
  } catch {}
}
function crearLink() {
  const datos = { n: estado.nombre, m: estado.meta, f: estado.fechas };
  const bytes = new TextEncoder().encode(JSON.stringify(datos));
  const b64 = btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `${location.origin}${location.pathname}#f=${b64}`;
}
function guardar() {
  try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch {}
}
leerLink();

// ---------- Utilidades ----------
const $ = (s) => document.querySelector(s);
const escapar = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const fechaLarga = (v) =>
  new Date(v).toLocaleString("es", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" });
const compacta = (d) =>
  `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}00`;

// Lista plana de todas las sesiones con fecha posible
const SESIONES = [];
MESES.forEach((m, mi) =>
  m.sesiones.forEach(([titulo, desc], si) =>
    SESIONES.push({ id: `s${mi * 3 + si + 1}`, num: mi * 3 + si + 1, mes: mi + 1, titulo, desc, puerto: m.puerto })
  )
);
BONUS.forEach(([titulo, desc], i) => SESIONES.push({ id: `b${i + 1}`, bonus: true, titulo, desc }));

function nombreEvento(s) {
  return s.bonus ? `Expansión · Sesión de regalo: ${s.titulo}` : `Expansión · Mentoría ${s.num}: ${s.titulo}`;
}
function linkGoogle(s) {
  const v = estado.fechas[s.id];
  if (!v) return "";
  const ini = new Date(v);
  const fin = new Date(ini.getTime() + DURACION_MIN * 60000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: nombreEvento(s),
    dates: `${compacta(ini)}/${compacta(fin)}`,
    details: `${s.desc}\n\nMi mapa: ${location.origin}${location.pathname}`,
    ctz: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// ---------- Render ----------
function htmlSesion(s) {
  const fecha = estado.fechas[s.id] || "";
  const hecha = Boolean(estado.hechas[s.id]);
  const google = linkGoogle(s);
  return `<li class="sesion${hecha ? " is-hecha" : ""}" data-sesion="${s.id}">
    <div class="sesion__num" aria-hidden="true">${s.bonus ? "✦" : s.num}</div>
    <div class="sesion__info">
      <p class="sesion__tag">${s.bonus ? "Sesión de regalo" : `Mentoría ${s.num} de 15`}</p>
      <h4>${s.titulo}</h4>
      <p>${s.desc}</p>
      <div class="sesion__controles">
        <label class="campo campo--fecha"><span>Fecha y hora</span>
          <input type="datetime-local" data-fecha="${s.id}" value="${fecha}" /></label>
        <label class="check"><input type="checkbox" data-hecha="${s.id}"${hecha ? " checked" : ""} /><span>Realizada</span></label>
        ${google ? `<a class="sesion__cal" href="${google}" target="_blank" rel="noopener">+ Google Calendar</a>` : ""}
      </div>
    </div>
  </li>`;
}

function pintarMeses() {
  $("[data-meses]").innerHTML = MESES.map((m, mi) => {
    const propias = SESIONES.filter((s) => s.mes === mi + 1);
    const hechas = propias.filter((s) => estado.hechas[s.id]).length;
    const abierto = mi === mesActual() ? " open" : "";
    return `<li class="mes">
      <details${abierto} data-mes="${mi}">
        <summary>
          <span class="mes__num">Mes ${mi + 1}</span>
          <span class="mes__titulo"><strong>Puerto ${m.puerto}</strong><em>${m.frase}</em></span>
          <span class="mes__estado">${hechas}/3</span>
        </summary>
        <div class="mes__cuerpo">
          <p class="mes__objetivo">${m.objetivo}</p>
          ${m.nota ? `<p class="puerto__nota">✦ ${m.nota}</p>` : ""}
          <ol class="sesiones">${propias.map(htmlSesion).join("")}</ol>
          <div class="mes__extra">
            <div><p class="fase__tag">Al cerrar el mes construyes</p><p class="mes__construyes">${m.construyes}</p></div>
            <div><p class="fase__tag">Tu material</p><ul>${m.material.map((x) => `<li>${x}</li>`).join("")}</ul></div>
          </div>
        </div>
      </details>
    </li>`;
  }).join("");
  $("[data-bonus]").innerHTML = SESIONES.filter((s) => s.bonus).map(htmlSesion).join("");
}

// El mes que toca: el primero con mentorías pendientes
function mesActual() {
  const i = MESES.findIndex((_, mi) => SESIONES.some((s) => s.mes === mi + 1 && !estado.hechas[s.id]));
  return i === -1 ? 0 : i;
}

function pintarProgreso() {
  const total = SESIONES.filter((s) => !s.bonus).length;
  const hechas = SESIONES.filter((s) => !s.bonus && estado.hechas[s.id]).length;
  $("[data-barra]").style.width = `${(hechas / total) * 100}%`;
  $("[data-progreso]").textContent =
    hechas === total ? "¡Completaste tus 15 mentorías! ✦" : `${hechas} de ${total} mentorías realizadas`;
}

function pintarAgenda() {
  const filas = SESIONES.map((s) => {
    const v = estado.fechas[s.id];
    const etiqueta = s.bonus ? "Regalo" : `Mes ${s.mes} · ${s.num}`;
    return `<li class="${estado.hechas[s.id] ? "is-hecha" : ""}${v ? "" : " is-vacia"}">
      <span class="agenda__tag">${etiqueta}</span>
      <span class="agenda__titulo">${s.titulo}</span>
      <span class="agenda__fecha">${v ? fechaLarga(v) : "Sin fecha"}</span>
    </li>`;
  });
  $("[data-agenda]").innerHTML = `<ol>${filas.join("")}</ol>`;
}

function pintarPerfil() {
  document.querySelectorAll("[data-perfil]").forEach((el) => (el.value = estado[el.dataset.perfil] || ""));
  const nombre = estado.nombre.trim().split(/\s+/)[0];
  $("[data-saludo]").textContent = nombre ? `${nombre}, tu camino` : "Tu camino";
}

function pintarAntes() {
  $("[data-antes]").innerHTML = ANTES.map(([texto, link], i) => {
    const marcado = estado.antes[i] ? " checked" : "";
    const contenido = link ? `<a href="${link}">${texto}</a>` : texto;
    return `<li><label class="check"><input type="checkbox" data-antes-i="${i}"${marcado} /><span>${contenido}</span></label></li>`;
  }).join("");
}

function pintarTodo() {
  pintarPerfil();
  pintarMeses();
  pintarProgreso();
  pintarAgenda();
  pintarAntes();
}
pintarTodo();

// ---------- Eventos ----------
document.addEventListener("input", (e) => {
  const campo = e.target.dataset.perfil;
  if (campo) {
    estado[campo] = e.target.value;
    guardar();
    if (campo === "nombre") pintarPerfil();
  }
});

document.addEventListener("change", (e) => {
  const t = e.target;
  if (t.dataset.fecha) {
    if (t.value) estado.fechas[t.dataset.fecha] = t.value;
    else delete estado.fechas[t.dataset.fecha];
    guardar();
    refrescarSesion(t.dataset.fecha);
    pintarAgenda();
  }
  if (t.dataset.hecha) {
    estado.hechas[t.dataset.hecha] = t.checked;
    guardar();
    refrescarSesion(t.dataset.hecha);
    pintarProgreso();
    pintarAgenda();
    pintarContadorMes(t);
  }
  if (t.dataset.antesI !== undefined) {
    estado.antes[t.dataset.antesI] = t.checked;
    guardar();
  }
});

// Vuelve a pintar solo una sesión (sin cerrar el mes abierto)
function refrescarSesion(id) {
  const li = document.querySelector(`[data-sesion="${id}"]`);
  const s = SESIONES.find((x) => x.id === id);
  if (li && s) li.outerHTML = htmlSesion(s);
}
function pintarContadorMes(el) {
  const details = document.querySelector(`[data-mes="${SESIONES.find((s) => s.id === el.dataset.hecha)?.mes - 1}"]`);
  if (!details) return;
  const mi = Number(details.dataset.mes);
  const hechas = SESIONES.filter((s) => s.mes === mi + 1 && estado.hechas[s.id]).length;
  details.querySelector(".mes__estado").textContent = `${hechas}/3`;
}

function aviso(texto) {
  $("[data-aviso]").textContent = texto;
}

// Archivo .ics con todas las fechas anotadas
$("[data-ics]").addEventListener("click", () => {
  const conFecha = SESIONES.filter((s) => estado.fechas[s.id]);
  if (!conFecha.length) return aviso("Primero anota al menos una fecha en tu mapa.");
  const limpiar = (t) => String(t).replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  const eventos = conFecha.map((s) => {
    const ini = new Date(estado.fechas[s.id]);
    const fin = new Date(ini.getTime() + DURACION_MIN * 60000);
    return [
      "BEGIN:VEVENT",
      `UID:${s.id}-${compacta(ini)}@expansiondonesespirituales.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
      `DTSTART:${compacta(ini)}`,
      `DTEND:${compacta(fin)}`,
      `SUMMARY:${limpiar(nombreEvento(s))}`,
      `DESCRIPTION:${limpiar(s.desc)}`,
      "BEGIN:VALARM", "TRIGGER:-PT1H", "ACTION:DISPLAY", `DESCRIPTION:${limpiar(nombreEvento(s))}`, "END:VALARM",
      "END:VEVENT",
    ].join("\r\n");
  });
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Expansion//Laura Restrepo//ES", "CALSCALE:GREGORIAN", ...eventos, "END:VCALENDAR"].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "expansion-mentorias.ics" });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  aviso(`Listo: ${conFecha.length} ${conFecha.length === 1 ? "sesión" : "sesiones"} con recordatorio una hora antes. Ábrelo para agregarlas a tu calendario.`);
});

$("[data-compartir]").addEventListener("click", async () => {
  const link = crearLink();
  try {
    await navigator.clipboard.writeText(link);
    aviso("Link copiado. Quien lo abra verá tu nombre, tu meta y tus fechas.");
  } catch {
    window.prompt("Copia este link:", link);
  }
});

$("[data-imprimir]").addEventListener("click", () => {
  document.querySelectorAll("[data-mes]").forEach((d) => (d.open = true));
  window.print();
});
