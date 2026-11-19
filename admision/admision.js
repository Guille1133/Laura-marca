// Formulario de admisión de Expansión: una pregunta por pantalla.
// Para cambiar una pregunta, se edita PASOS. Las respuestas se envían a /api/admision
// (n8n → Notion "Admisión Expansión · Alumnos"). Mientras la persona responde, se guarda
// un borrador en su navegador por si cierra la página.

const CAP = {
  1: "Capítulo I · Quién eres",
  2: "Capítulo II · Tu don y tu fe",
  3: "Capítulo III · Tu llegada",
  4: "Capítulo IV · Tu expansión",
};

const PASOS = [
  {
    cap: 1,
    pregunta: "Empecemos por lo sencillo",
    ayuda: "¿Cómo te llamas y dónde podemos escribirte?",
    campos: [
      { key: "name", tipo: "text", label: "Nombre completo", placeholder: "Tu nombre y apellido", auto: "name" },
      { key: "email", tipo: "email", label: "Correo electrónico", placeholder: "tucorreo@ejemplo.com", auto: "email" },
      { key: "phone", tipo: "tel", label: "WhatsApp" },
    ],
  },
  {
    cap: 1,
    pregunta: "¿Qué día llegaste a este mundo?",
    ayuda: "Tu fecha de nacimiento.",
    campos: [{ key: "nacimiento", tipo: "date", label: "Fecha de nacimiento" }],
  },
  {
    cap: 1,
    pregunta: "¿De dónde vienes y dónde estás hoy?",
    campos: [
      { key: "nacio", tipo: "text", label: "¿Dónde naciste?", placeholder: "Ciudad y país" },
      { key: "vive", tipo: "text", label: "¿Dónde vives hoy?", placeholder: "Ciudad y país" },
    ],
  },
  {
    cap: 1,
    pregunta: "¿A qué te dedicas hoy?",
    ayuda: "Tu trabajo, tu negocio o cómo ocupas tus días.",
    campos: [{ key: "ocupacion", tipo: "text", label: "Tu ocupación", placeholder: "Ej.: terapeuta, docente, emprendo en…" }],
  },
  {
    cap: 1,
    pregunta: "¿Qué camino de estudio has recorrido?",
    opciones: { key: "estudios", tipo: "single", items: ["Bachillerato", "Técnico o tecnológico", "Universitario", "Posgrado", "Autodidacta"] },
    campos: [{ key: "que_estudio", tipo: "text", label: "¿Qué estudiaste?", placeholder: "Ej.: psicología, contaduría, reiki…", opcional: true }],
  },
  {
    cap: 1,
    pregunta: "Hoy, ¿cuánto recibes al mes gracias a tus dones?",
    ayuda: "No hay respuesta correcta: es tu punto de partida.",
    opciones: { key: "ingresos", tipo: "single", auto: true, items: ["Todavía nada", "Menos de 500 USD", "Entre 500 y 1.500 USD", "Entre 1.500 y 3.000 USD", "Más de 3.000 USD"] },
  },
  {
    cap: 2,
    pregunta: "¿Qué dones sientes que Dios puso en ti?",
    ayuda: "Elige todos los que resuenen contigo.",
    opciones: {
      key: "dones",
      tipo: "multi",
      items: ["Sanación energética", "Intuición", "Visión o clarividencia", "Canalización", "Sueños y señales", "Guía y consejería", "Enseñanza", "Aún lo estoy descubriendo"],
    },
  },
  {
    cap: 2,
    pregunta: "¿Cuál sientes que es tu propósito de vida?",
    ayuda: "No tiene que estar perfecto. Escribe lo que tu corazón ya sabe.",
    campos: [{ key: "proposito", tipo: "textarea", label: "Mi propósito", placeholder: "Siento que vine a…" }],
  },
  {
    cap: 2,
    pregunta: "¿Cómo vives hoy tu relación con Dios?",
    ayuda: "Cuéntanos, con tus palabras, cómo se manifiesta Dios en tu vida.",
    campos: [{ key: "dios", tipo: "textarea", label: "Mi relación con Dios", placeholder: "Escribe con libertad…", opcional: true }],
  },
  {
    cap: 3,
    pregunta: "¿Qué te hizo decir sí a Expansión?",
    ayuda: "El momento, la razón o la señal que te trajo hasta aquí.",
    campos: [{ key: "por_que", tipo: "textarea", label: "Dije sí porque…", placeholder: "Escribe con libertad…" }],
  },
  {
    cap: 3,
    pregunta: "¿Qué fue lo que más conectó contigo de Laura?",
    ayuda: "Puedes elegir varias.",
    opciones: {
      key: "conexion",
      tipo: "multi",
      items: ["Su historia", "Su fe en Dios", "Sus dones", "Su forma de enseñar", "Los resultados de sus alumnos", "Una sesión o llamada con ella"],
    },
  },
  {
    cap: 3,
    pregunta: "¿Cómo llegaste a Laura?",
    opciones: { key: "como_conocio", tipo: "single", auto: true, items: ["Instagram", "Masterclass", "Azul Navegante", "Recomendación", "Otro"] },
  },
  {
    cap: 4,
    pregunta: "¿Qué resultado concreto quieres lograr en Expansión?",
    ayuda: "Expansión está pensado para que factures 5.000 USD en 5 meses con tus dones. ¿Cuál es tu meta?",
    campos: [
      { key: "resultado", tipo: "textarea", label: "Mi resultado", placeholder: "Ej.: lanzar mi programa de sanación y facturar mis primeros 5.000 USD" },
      { key: "cambiaria", tipo: "textarea", label: "¿Qué cambiaría en tu vida cuando lo logres?", placeholder: "Escribe con libertad…", opcional: true },
    ],
  },
  {
    cap: 4,
    pregunta: "¿Qué es lo que más te está frenando hoy?",
    ayuda: "Elige lo que sientas y cuéntanos tu mayor reto. Nombrarlo es el primer paso para soltarlo.",
    opciones: {
      key: "bloqueos",
      tipo: "multi",
      items: ["Miedo a mostrarme", "No sé qué ofrecer", "No sé cuánto cobrar", "Culpa con el dinero", "Dudo de mi don", "No tengo clientes", "Falta de tiempo", "Falta de apoyo de mi entorno"],
    },
    campos: [{ key: "reto", tipo: "textarea", label: "Mi mayor reto en este momento", placeholder: "Lo que más me cuesta hoy es…" }],
  },
  {
    cap: 4,
    pregunta: "¿Cómo aprendes con más facilidad?",
    opciones: {
      key: "aprende",
      tipo: "single",
      auto: true,
      items: [
        ["Viendo", "Videos, imágenes, esquemas"],
        ["Escuchando", "Audios, conversaciones, clases en vivo"],
        ["Leyendo y escribiendo", "Textos, guías, tomando notas"],
        ["Haciendo", "Practicando y aprendiendo en el camino"],
      ],
    },
  },
  {
    cap: 4,
    pregunta: "¿Cuánto tiempo a la semana puedes regalarle a tu expansión?",
    opciones: { key: "tiempo", tipo: "single", auto: true, items: ["Menos de 3 horas", "De 3 a 5 horas", "De 5 a 10 horas", "Más de 10 horas"] },
  },
  {
    cap: 4,
    pregunta: "Para cerrar, pon este camino en manos de Dios",
    ayuda: "Escribe una oración o intención para estos meses. Es tuya y de Dios.",
    campos: [
      { key: "intencion", tipo: "textarea", label: "Mi oración o intención", placeholder: "Señor, te entrego este camino…", opcional: true },
      { key: "extra", tipo: "textarea", label: "¿Hay algo más que Laura deba saber de ti?", placeholder: "Tu momento de vida, tu salud, lo que quieras compartir…", opcional: true },
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

// ---------- Estado y borrador ----------
const BORRADOR = "admision-expansion-v1";
let datos = {};
let paso = 0;
try {
  const guardado = JSON.parse(localStorage.getItem(BORRADOR));
  if (guardado && guardado.datos) {
    datos = guardado.datos;
    paso = Math.min(Number(guardado.paso) || 0, PASOS.length - 1);
  }
} catch {}
const guardar = () => {
  try { localStorage.setItem(BORRADOR, JSON.stringify({ paso, datos })); } catch {}
};
const borrar = () => {
  try { localStorage.removeItem(BORRADOR); } catch {}
};

// ---------- Pantallas ----------
const $ = (sel) => document.querySelector(sel);
const pantallas = document.querySelectorAll("[data-screen]");
function mostrarPantalla(nombre) {
  pantallas.forEach((s) => s.classList.toggle("is-active", s.dataset.screen === nombre));
  window.scrollTo({ top: 0 });
}

const escapar = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function htmlCampo(c) {
  const opcional = c.opcional ? " <small>(opcional)</small>" : "";
  const valor = escapar(datos[c.key]);
  if (c.tipo === "textarea") {
    return `<label class="campo"><span>${c.label}${opcional}</span>
      <textarea data-key="${c.key}" rows="4" placeholder="${escapar(c.placeholder)}">${valor}</textarea></label>`;
  }
  if (c.tipo === "tel") {
    const opciones = PAISES.map(([nombre, codigo], i) => {
      const sep = i === 4 ? `<option value="" disabled>──────────</option>` : "";
      const sel = datos.pais === `${codigo}|${nombre}` ? " selected" : "";
      return `${sep}<option value="${codigo}|${nombre}"${sel}>+${codigo} ${nombre}</option>`;
    }).join("");
    return `<div class="campo-fila">
      <label class="campo"><span>País</span>
        <select data-key="pais" required><option value=""${datos.pais ? "" : " selected"} disabled>Código</option>${opciones}</select></label>
      <label class="campo"><span>${c.label}</span>
        <input type="tel" data-key="numero" inputmode="tel" autocomplete="tel-national" placeholder="300 000 0000" value="${escapar(datos.numero)}" /></label>
    </div>`;
  }
  const extra = c.tipo === "date" ? ` max="${new Date().toISOString().slice(0, 10)}" min="1920-01-01"` : "";
  return `<label class="campo"><span>${c.label}${opcional}</span>
    <input type="${c.tipo}" data-key="${c.key}" placeholder="${escapar(c.placeholder)}" value="${valor}"${c.auto ? ` autocomplete="${c.auto}"` : ""}${extra} /></label>`;
}

function htmlOpciones(o) {
  if (o.tipo === "multi") {
    const elegidas = datos[o.key] || [];
    return `<div class="chips" role="group">${o.items
      .map((item) => `<button type="button" class="chip" data-chip="${escapar(item)}" aria-pressed="${elegidas.includes(item)}">${item}</button>`)
      .join("")}</div>`;
  }
  return `<div class="quiz__options" role="group">${o.items
    .map((item) => {
      const [valor, desc] = Array.isArray(item) ? item : [item];
      const sel = datos[o.key] === valor;
      return `<button type="button" class="quiz__option${sel ? " is-selected" : ""}" data-option="${escapar(valor)}" aria-pressed="${sel}">${valor}${desc ? `<small>${desc}</small>` : ""}</button>`;
    })
    .join("")}</div>`;
}

function mostrarPaso(i) {
  paso = i;
  const p = PASOS[i];
  const ultimo = i === PASOS.length - 1;

  $("[data-progress]").style.width = `${(i / PASOS.length) * 100}%`;
  $("[data-chapter]").textContent = `${CAP[p.cap]} · ${i + 1} de ${PASOS.length}`;
  $("[data-question]").textContent = p.pregunta;
  $("[data-help]").textContent = p.ayuda || "";
  $("[data-msg]").textContent = "";
  $("[data-body]").innerHTML = (p.opciones ? htmlOpciones(p.opciones) : "") + (p.campos || []).map(htmlCampo).join("");
  $("[data-back]").hidden = i === 0;

  const siguiente = $("[data-next]");
  siguiente.textContent = ultimo ? "Enviar mi admisión" : "Continuar";
  siguiente.hidden = Boolean(p.opciones?.auto && !p.campos && !datos[p.opciones.key]);
  siguiente.disabled = false;

  mostrarPantalla("question");
  const primero = $("[data-body] input, [data-body] textarea");
  if (primero && window.matchMedia("(min-width: 760px)").matches) primero.focus({ preventScroll: true });
  else $("[data-question]").focus({ preventScroll: true });
  guardar();
}

// ---------- Validación ----------
function validar(p) {
  for (const c of p.campos || []) {
    if (c.tipo === "tel") {
      if (!datos.pais) return "Selecciona el código de tu país.";
      if (String(datos.numero || "").replace(/\D/g, "").length < 7) return "Revisa tu número de WhatsApp.";
      continue;
    }
    const v = String(datos[c.key] || "").trim();
    if (!c.opcional && !v) return "Este espacio es importante para conocerte. ✦";
    if (c.tipo === "email" && !/^\S+@\S+\.\S+$/.test(v)) return "Revisa tu correo electrónico.";
    if (c.tipo === "date") {
      const anio = Number(v.slice(0, 4));
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || anio < 1920 || anio > new Date().getFullYear() - 14) return "Revisa tu fecha de nacimiento.";
    }
  }
  const o = p.opciones;
  if (o) {
    const v = datos[o.key];
    if (o.tipo === "multi" ? !(v && v.length) : !v) return o.tipo === "multi" ? "Elige al menos una opción." : "Elige una opción.";
  }
  return "";
}

// ---------- Eventos ----------
const form = $("[data-form]");

$("[data-start]").addEventListener("click", () => mostrarPaso(paso));
if (Object.keys(datos).length) $("[data-resume]").hidden = false;

$("[data-back]").addEventListener("click", () => {
  if (paso > 0) mostrarPaso(paso - 1);
});

form.addEventListener("input", (e) => {
  const key = e.target.dataset.key;
  if (key) {
    datos[key] = e.target.value;
    guardar();
  }
});
form.addEventListener("change", (e) => {
  const key = e.target.dataset.key;
  if (key) {
    datos[key] = e.target.value;
    guardar();
  }
});

form.addEventListener("click", (e) => {
  const p = PASOS[paso];
  const chip = e.target.closest("[data-chip]");
  if (chip) {
    const lista = new Set(datos[p.opciones.key] || []);
    const valor = chip.dataset.chip;
    lista.has(valor) ? lista.delete(valor) : lista.add(valor);
    datos[p.opciones.key] = [...lista];
    chip.setAttribute("aria-pressed", lista.has(valor));
    $("[data-msg]").textContent = "";
    guardar();
    return;
  }
  const opcion = e.target.closest("[data-option]");
  if (opcion) {
    datos[p.opciones.key] = opcion.dataset.option;
    form.querySelectorAll("[data-option]").forEach((b) => {
      const sel = b === opcion;
      b.classList.toggle("is-selected", sel);
      b.setAttribute("aria-pressed", sel);
    });
    $("[data-msg]").textContent = "";
    guardar();
    if (p.opciones.auto && !p.campos) setTimeout(() => avanzar(), 350);
    else $("[data-next]").hidden = false;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  avanzar();
});

let enviando = false;
async function avanzar() {
  const error = validar(PASOS[paso]);
  if (error) {
    $("[data-msg]").textContent = error;
    return;
  }
  if (paso < PASOS.length - 1) return mostrarPaso(paso + 1);
  if (enviando) return;

  enviando = true;
  const boton = $("[data-next]");
  boton.disabled = true;
  boton.textContent = "Enviando…";

  const [codigo] = String(datos.pais || "").split("|");
  const numero = String(datos.numero || "").replace(/\D/g, "").replace(/^0+/, "");
  const { pais, ...resto } = datos;
  delete resto.numero;
  const envio = { ...resto, phone: `+${codigo} ${numero}` };

  try {
    const res = await fetch("/api/admision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(envio),
    });
    if (!res.ok) throw new Error(await res.text());
    borrar();
    const nombre = String(datos.name || "").trim().split(/\s+/)[0];
    $("[data-done-title]").innerHTML = `Gracias${nombre ? `, ${escapar(nombre)}` : ""}.<br /><em>Ya comenzó tu Expansión</em>`;
    $("[data-progress]").style.width = "100%";
    mostrarPantalla("done");
    $("[data-done-title]").focus({ preventScroll: true });
  } catch {
    $("[data-msg]").textContent = "No pudimos enviar tus respuestas. Revisa tu conexión e inténtalo de nuevo; no se perdió nada.";
    boton.disabled = false;
    boton.textContent = "Enviar mi admisión";
  } finally {
    enviando = false;
  }
}
