// Onboarding de Azul Navegante: una pregunta por pantalla.
// Para cambiar una pregunta, se edita PASOS. Las respuestas van a /api/azul-navegante
// (Notion "Azul Navegante · Participantes"). Mientras la persona responde, se guarda
// un borrador en su navegador por si cierra la página.

const PASOS = [
  {
    titulo: "Empecemos por tus datos",
    campos: [
      { key: "nombre", tipo: "text", label: "Nombre completo", auto: "name" },
      { key: "preferido", tipo: "text", label: "¿Cómo te gusta que te llamen?", auto: "nickname", opcional: true },
      { key: "correo", tipo: "email", label: "Correo con el que compraste", auto: "email" },
      { key: "celular", tipo: "tel", label: "WhatsApp" },
    ],
  },
  {
    titulo: "¿Desde dónde navegas?",
    campos: [{ key: "vive", tipo: "text", label: "Ciudad y país donde vives" }],
  },
  {
    titulo: "¿Qué te motivó a entrar a Azul Navegante?",
    campos: [{ key: "motivo", tipo: "textarea", label: "Mi motivo" }],
  },
  {
    titulo: "¿Qué patrón sientes que se repite en tu vida?",
    ayuda: "Comparte solo lo que te resulte cómodo.",
    campos: [{ key: "patron", tipo: "textarea", label: "Lo que se repite" }],
  },
  {
    titulo: "¿Qué área quieres priorizar?",
    campos: [{ key: "area", tipo: "opciones", items: ["Identidad", "Emociones", "Creencias", "Propósito", "Relaciones", "Dinero"] }],
  },
  {
    titulo: "¿Qué cambio te gustaría reconocer en ti al terminar este primer ciclo?",
    campos: [{ key: "cambio", tipo: "textarea", label: "El cambio que busco" }],
  },
  {
    titulo: "Lo que ya has recorrido",
    campos: [
      { key: "intentado", tipo: "textarea", label: "¿Qué has intentado antes y qué te resultó útil?", opcional: true },
      { key: "apoyo", tipo: "textarea", label: "¿Qué podría dificultar tu constancia y qué apoyo necesitas?", opcional: true },
    ],
  },
  {
    titulo: "Tu tiempo",
    campos: [
      { key: "tiempo", tipo: "opciones", label: "¿Cuánto tiempo al día puedes reservar para ti?", items: ["30 minutos", "45 minutos", "1 hora o más"] },
      { key: "disponibilidad", tipo: "text", label: "¿Qué días y horas te sirven para las sesiones en vivo?", placeholder: "Ej.: martes y jueves en la noche" },
    ],
  },
  {
    titulo: "¿Cómo llegas hoy?",
    ayuda: "Del 0 al 10, según lo que percibes en ti.",
    campos: [
      { key: "claridad", tipo: "nivel", label: "Claridad" },
      { key: "confianza", tipo: "nivel", label: "Confianza" },
      { key: "calma", tipo: "nivel", label: "Calma" },
      { key: "constancia", tipo: "nivel", label: "Constancia" },
      { key: "acepta", tipo: "check", label: "Acepto que Laura y su equipo usen estas respuestas para acompañarme en el programa. Puedo pedirle a Laura que las cambie o las elimine." },
    ],
  },
];

// Códigos de país para el WhatsApp
const PAISES = [
  ["Colombia", "57"], ["México", "52"], ["Estados Unidos", "1"], ["España", "34"],
  ["Argentina", "54"], ["Bolivia", "591"], ["Brasil", "55"], ["Canadá", "1"],
  ["Chile", "56"], ["Costa Rica", "506"], ["Cuba", "53"], ["Ecuador", "593"],
  ["El Salvador", "503"], ["Guatemala", "502"], ["Honduras", "504"], ["Nicaragua", "505"],
  ["Panamá", "507"], ["Paraguay", "595"], ["Perú", "51"], ["Puerto Rico", "1"],
  ["República Dominicana", "1"], ["Uruguay", "598"], ["Venezuela", "58"],
  ["Alemania", "49"], ["Australia", "61"], ["Francia", "33"], ["Italia", "39"],
  ["Países Bajos", "31"], ["Portugal", "351"], ["Reino Unido", "44"], ["Suiza", "41"],
];

const $ = (s) => document.querySelector(s);
const escapar = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// ---------- Borrador ----------
const BORRADOR = "azul-navegante-v1";
let datos = {};
let paso = 0;
try {
  const b = JSON.parse(localStorage.getItem(BORRADOR));
  if (b?.datos) {
    datos = b.datos;
    paso = Math.min(Number(b.paso) || 0, PASOS.length - 1);
  }
} catch {}
const guardar = () => {
  try { localStorage.setItem(BORRADOR, JSON.stringify({ paso, datos })); } catch {}
};

// ---------- Pantallas ----------
function pantalla(nombre) {
  document.querySelectorAll("[data-pantalla]").forEach((el) => (el.hidden = el.dataset.pantalla !== nombre));
  window.scrollTo(0, 0);
}

function htmlCampo(c) {
  const v = datos[c.key];
  const label = `<span>${c.label}${c.opcional ? " <small>Opcional</small>" : ""}</span>`;
  switch (c.tipo) {
    case "textarea":
      return `<label class="campo">${label}<textarea data-key="${c.key}" maxlength="1900">${escapar(v)}</textarea></label>`;
    case "tel":
      return `<div class="fila">
        <label class="campo"><span>País</span><select data-key="pais"><option value="">Código</option>${PAISES.map(
          ([nombre, codigo]) => `<option value="${codigo}|${nombre}"${datos.pais === `${codigo}|${nombre}` ? " selected" : ""}>+${codigo} ${nombre}</option>`
        ).join("")}</select></label>
        <label class="campo">${label}<input type="tel" data-key="numero" autocomplete="tel-national" maxlength="25" placeholder="300 000 0000" value="${escapar(datos.numero)}" /></label>
      </div>`;
    case "opciones":
      return `<fieldset class="grupo"><legend${c.label ? "" : " hidden"}>${c.label || ""}</legend><div class="opciones">${c.items
        .map((i) => `<label><input type="radio" name="${c.key}" data-key="${c.key}" value="${i}"${v === i ? " checked" : ""} /><span>${i}</span></label>`)
        .join("")}</div></fieldset>`;
    case "nivel":
      return `<label class="nivel${v === undefined ? " is-vacio" : ""}"><span>${c.label} <output>${v ?? "–"}</output></span>
        <input type="range" min="0" max="10" step="1" value="${v ?? 5}" data-nivel="${c.key}" /></label>`;
    case "check":
      return `<label class="check"><input type="checkbox" data-check="${c.key}"${v ? " checked" : ""} /><span>${c.label}</span></label>`;
    default:
      return `<label class="campo">${label}<input type="${c.tipo}" data-key="${c.key}" maxlength="200" placeholder="${escapar(c.placeholder)}"${c.auto ? ` autocomplete="${c.auto}"` : ""} value="${escapar(v)}" /></label>`;
  }
}

function mostrarPaso(i) {
  paso = i;
  const p = PASOS[i];
  $("[data-paso]").textContent = `${i + 1} de ${PASOS.length}`;
  $(".avance span").style.width = `${((i + 1) / PASOS.length) * 100}%`;
  $(".avance").setAttribute("aria-valuemax", PASOS.length);
  $(".avance").setAttribute("aria-valuenow", i + 1);
  $("[data-titulo]").textContent = p.titulo;
  $("[data-ayuda]").textContent = p.ayuda || "";
  $("[data-error]").textContent = "";
  $("[data-cuerpo]").innerHTML = p.campos.map(htmlCampo).join("");
  $("[data-volver]").hidden = i === 0;
  $("[data-seguir]").textContent = i === PASOS.length - 1 ? "Enviar" : "Continuar";
  pantalla("pregunta");
  const primero = $("[data-cuerpo] input:not([type=radio]):not([type=range]), [data-cuerpo] textarea");
  if (primero && matchMedia("(min-width: 861px)").matches) primero.focus({ preventScroll: true });
  else $("[data-titulo]").focus({ preventScroll: true });
  guardar();
}

// ---------- Validación ----------
function validar(p) {
  for (const c of p.campos) {
    const v = datos[c.key];
    if (c.opcional) continue;
    if (c.tipo === "tel") {
      if (!datos.pais) return "Elige el código de tu país.";
      if (String(datos.numero || "").replace(/\D/g, "").length < 7) return "Revisa tu número de WhatsApp.";
    } else if (c.tipo === "opciones") {
      if (!v) return "Elige una opción.";
    } else if (c.tipo === "nivel") {
      if (v === undefined) return `Mueve la barra de ${c.label.toLowerCase()}.`;
    } else if (c.tipo === "check") {
      if (!v) return "Marca la casilla para enviar tus respuestas.";
    } else if (!String(v || "").trim()) return p.campos.length > 1 ? `Falta completar: ${c.label}` : "Escribe tu respuesta para continuar.";
    if (c.tipo === "email" && !/^\S+@\S+\.\S+$/.test(v.trim())) return "Revisa tu correo.";
  }
  return "";
}

// ---------- Eventos ----------
const form = $("[data-form]");
form.addEventListener("input", (e) => {
  const t = e.target;
  if (t.dataset.key) datos[t.dataset.key] = t.value;
  if (t.dataset.check) datos[t.dataset.check] = t.checked;
  if (t.dataset.nivel) ponerNivel(t);
  $("[data-error]").textContent = "";
  guardar();
});
// Tocar la barra justo en el 5 no dispara "input": también cuenta como respuesta
form.addEventListener("click", (e) => {
  if (e.target.dataset.nivel) ponerNivel(e.target);
});
function ponerNivel(t) {
  datos[t.dataset.nivel] = Number(t.value);
  const caja = t.closest(".nivel");
  caja.classList.remove("is-vacio");
  caja.querySelector("output").textContent = t.value;
  guardar();
}

$("[data-empezar]").addEventListener("click", () => mostrarPaso(paso));
$("[data-volver]").addEventListener("click", () => mostrarPaso(paso - 1));

let enviando = false;
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (enviando) return;
  const error = validar(PASOS[paso]);
  $("[data-error]").textContent = error;
  if (error) return;
  if (paso < PASOS.length - 1) return mostrarPaso(paso + 1);

  enviando = true;
  const boton = $("[data-seguir]");
  boton.disabled = true;
  boton.textContent = "Enviando…";
  const { pais, numero, ...resto } = datos;
  try {
    const r = await fetch("/api/azul-navegante", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...resto,
        celular: `+${pais.split("|")[0]} ${numero.replace(/\D/g, "").replace(/^0+/, "")}`,
        zona: Intl.DateTimeFormat().resolvedOptions().timeZone,
        web: form.web.value,
      }),
    });
    if (!r.ok) throw new Error(r.status);
    try { localStorage.removeItem(BORRADOR); } catch {}
    const nombre = (datos.preferido || "").trim() || datos.nombre.trim().split(/\s+/)[0];
    $("[data-gracias]").textContent = `Gracias, ${nombre}`;
    pantalla("gracias");
    $("[data-gracias]").focus({ preventScroll: true });
  } catch {
    $("[data-error]").textContent = "No pudimos enviar tus respuestas. Revisa tu conexión e inténtalo de nuevo; no se perdió nada.";
  } finally {
    enviando = false;
    boton.disabled = false;
    boton.textContent = "Enviar";
  }
});

if (Object.keys(datos).length) $("[data-borrador]").hidden = false;
