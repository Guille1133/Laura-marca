// Plan de 5 días (basado en el módulo "La Física Cuántica del Dinero").
// Para cambiar un texto, se edita aquí. Lo que marca o escribe cada persona
// se guarda solo en su navegador (localStorage).
const DIAS = [
  {
    nombre: "Reconocer",
    titulo: "¿Quién has sido con el dinero?",
    intencion: "Tu realidad financiera de hoy es un espejo de lo que crees sobre el dinero. Hoy solo observas, sin juzgarte.",
    pasos: [
      "Escribe tu historia con el dinero: qué escuchabas en casa, cómo se manejaba, qué sentías cuando faltaba.",
      "Marca abajo las frases que escuchaste de pequeño o pequeña.",
      "Responde las 4 preguntas con honestidad total.",
    ],
    frases: [
      "«El dinero no crece en los árboles»",
      "«Los ricos son egoístas»",
      "«Hay que trabajar duro para ganar dinero»",
      "«No somos ricos»",
      "«El dinero es la raíz de todos los males»",
      "«¿Crees que soy millonario?»",
    ],
    preguntas: [
      "¿Quién has sido financieramente hasta hoy? (Ej.: «alguien que siempre llega justo»)",
      "¿Qué decisiones has tomado desde esa identidad? (Ej.: «aceptar menos de lo que valgo»)",
      "¿Qué resultados has obtenido?",
      "¿Qué emociones has normalizado alrededor del dinero?",
    ],
    cierre: "Estas frases no son recuerdos: son programas que siguen corriendo. Hoy los hiciste visibles, y lo que ves lo puedes cambiar.",
  },
  {
    nombre: "Soltar",
    titulo: "El funeral de tu vieja identidad",
    intencion: "No puedes ser dos personas a la vez. Para que nazca una identidad nueva, primero sueltas conscientemente la antigua.",
    pasos: [
      "En un papel escribe: «Yo, [tu nombre], he sido una persona que [tu vieja relación con el dinero]. Esta identidad me mantuvo pequeña/o y en supervivencia. Hoy elijo soltarla».",
      "Quema el papel en un lugar seguro (o rómpelo en pedazos si no puedes quemarlo) y di en voz alta: «Esta identidad murió. Ya no es quien soy. Gracias por protegerme. Ya no te necesito. Eres libre. Yo soy libre».",
      "Date una ducha o un baño como ritual: visualiza el agua lavando la vieja energía y siente el alivio de soltar.",
      "Antes de dormir, quédate 10 minutos en silencio. No llenes el espacio todavía.",
    ],
    preguntas: [
      "¿Qué sentiste mientras el papel desaparecía?",
      "¿Qué notas distinto en tu cuerpo después del ritual?",
    ],
    cierre: "No subestimes este paso: tu cerebro responde a los símbolos y a los rituales.",
  },
  {
    nombre: "Diseñar",
    titulo: "El nacimiento de tu identidad abundante",
    intencion: "Ahora que hay espacio, lo llenas a conciencia. No con lo que quieres tener, sino con quien decides SER.",
    pasos: [
      "Responde las 4 preguntas como si describieras al personaje de una película. Porque lo es: es el personaje que vas a interpretar hasta que se vuelva tu naturaleza.",
      "Elige una afirmación puente (abajo) y escríbela donde la veas todos los días.",
      "Dila en voz alta 3 veces hoy, sintiéndola en el cuerpo.",
    ],
    preguntas: [
      "¿Quién es la versión de ti que vive en abundancia? No qué tiene: quién ES.",
      "¿Cómo se siente esa persona? (Ej.: tranquila, confiada, libre, en paz)",
      "¿Qué decisiones toma? (Ej.: se paga primero, pide lo que vale, dice no a lo que no está alineado)",
      "¿Qué NO hace esa persona? (Ej.: no se queja, no se victimiza, no acepta migajas)",
    ],
    afirmaciones: [
      "Estoy dispuesta/o a creer que el dinero puede fluir más fácilmente.",
      "Estoy aprendiendo a recibir.",
      "Mi relación con el dinero está cambiando.",
      "Cada día me siento más cómoda/o con la abundancia.",
      "El dinero es energía y yo soy energía.",
    ],
    cierre: "Si saltas de «no me alcanza» a «soy millonaria/o», tu cuerpo rechaza la frase. Las afirmaciones puente funcionan porque tu cuerpo sí puede creerlas.",
  },
  {
    nombre: "Coherencia",
    titulo: "Que lo que piensas y lo que sientes digan lo mismo",
    intencion: "Pensar abundancia mientras sientes miedo envía una señal mezclada. Hoy entrenas la coherencia: pensar y sentir lo mismo.",
    pasos: [
      "Al despertar, agradece por el dinero que YA tienes, por poco que sea.",
      "Haz 20 minutos de meditación de futuro presente: ojos cerrados, en silencio. No visualices el futuro: siéntelo como si fuera ahora. La libertad, la paz al ver tu cuenta, la alegría de dar.",
      "Antes de mirar tu cuenta bancaria, respira y agradece primero.",
      "Cada vez que pagues algo hoy, agradece: ese dinero está circulando.",
      "Por la noche, con la mano en el corazón, di la declaración de unidad (abajo).",
    ],
    declaracion: "El dinero no está separado de mí. El dinero es una forma de energía. Yo soy una forma de energía. No hay separación. No hay lucha. Solo hay flujo.",
    preguntas: [
      "¿En qué momento del día sentiste miedo o duda con el dinero? ¿Qué pensabas en ese momento?",
      "¿Qué cambió cuando agradeciste antes de mirar tu cuenta?",
    ],
    cierre: "La coherencia es una habilidad: se entrena. Lo que sostienes en el tiempo es lo que se materializa.",
  },
  {
    nombre: "Actuar",
    titulo: "Acción alineada desde tu nueva identidad",
    intencion: "La acción no es hacer más. Es moverte desde quien estás decidiendo ser, no desde la desesperación.",
    pasos: [
      "Elige UNA acción que tu vieja identidad nunca haría y hazla hoy. Ideas: subir tus precios, pedir lo que vales, invertir en tu crecimiento, decir no a algo que no está alineado, pedir ayuda.",
      "Antes de cualquier decisión de dinero importante, haz una pausa y pregúntate: «¿Esto nace del miedo o de mi poder?». Decide desde tu poder.",
      "Revisa tus respuestas de los días 1 y 3: mira de dónde vienes y hacia quién vas.",
      "Lee en voz alta tu nuevo mantra (abajo).",
    ],
    declaracion: "Yo soy energía. El dinero es energía. El dinero fluye hacia mí tan natural como respiro. Recibo con gratitud. Doy con amor. Invierto con sabiduría. Confío en el flujo.",
    preguntas: [
      "¿Qué acción tomaste hoy desde tu nueva identidad? ¿Cómo te sentiste?",
      "¿Qué evidencia de cambio, aunque sea pequeña, notaste en estos 5 días?",
      "¿Qué quieres seguir sosteniendo a partir de mañana?",
    ],
    cierre: "Misma acción, frecuencia diferente, resultados opuestos. El conocimiento sin aplicación es entretenimiento; el conocimiento aplicado es transformación.",
  },
];

// ---------- Guardado local (si el navegador lo bloquea, la página funciona igual) ----------
const CLAVE = "regalo-dinero-v1";
let estado = { hechos: [], marcas: {}, notas: {} };
try {
  const guardado = JSON.parse(localStorage.getItem(CLAVE));
  if (guardado) estado = { ...estado, ...guardado };
} catch {}
function guardar() {
  try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch {}
}

// ---------- Render ----------
const ruta = document.getElementById("ruta");
const dia = document.getElementById("dia");
const escapar = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function casilla(id, texto) {
  const marcado = estado.marcas[id] ? " checked" : "";
  return `<li><label class="check"><input type="checkbox" data-marca="${id}"${marcado} /><span>${texto}</span></label></li>`;
}

function htmlDia(d, i) {
  const n = i + 1;
  const hecho = estado.hechos.includes(i);
  const siguiente = DIAS[i + 1];

  return `
    <p class="fase__tag">Día ${n} de ${DIAS.length}</p>
    <h3>${d.nombre}</h3>
    <p class="puerto__frase">${d.titulo}</p>
    <p class="puerto__objetivo">${d.intencion}</p>

    <h4 class="dia__sub">Tu práctica de hoy</h4>
    <ul class="checks">${d.pasos.map((p, k) => casilla(`d${n}-p${k}`, p)).join("")}</ul>

    ${d.frases ? `<h4 class="dia__sub">¿Cuáles escuchaste?</h4>
      <ul class="checks checks--chips">${d.frases.map((f, k) => casilla(`d${n}-f${k}`, f)).join("")}</ul>` : ""}

    ${d.afirmaciones ? `<h4 class="dia__sub">Afirmaciones puente</h4>
      <ul class="checks">${d.afirmaciones.map((a, k) => casilla(`d${n}-a${k}`, a)).join("")}</ul>` : ""}

    ${d.declaracion ? `<blockquote class="declaracion">${d.declaracion}</blockquote>` : ""}

    <h4 class="dia__sub">Escribe</h4>
    ${d.preguntas.map((q, k) => {
      const id = `d${n}-q${k}`;
      return `<label class="nota"><span>${q}</span><textarea data-nota="${id}" rows="3" placeholder="Escribe aquí…">${escapar(estado.notas[id] || "")}</textarea></label>`;
    }).join("")}

    <p class="puerto__nota">✦ ${d.cierre}</p>

    <div class="dia__acciones">
      <button type="button" class="btn ${hecho ? "btn--ghost" : ""}" data-completar="${i}">
        ${hecho ? "Día completado ✓" : `Completé el día ${n}`}
      </button>
    </div>
    <div class="puerto__nav">
      ${i > 0 ? `<button type="button" data-ir="${i - 1}">← Día ${i}</button>` : ""}
      ${siguiente ? `<button type="button" data-ir="${i + 1}">Día ${n + 1}: ${siguiente.nombre} →</button>` : `<button type="button" data-saltar="agenda">Tu siguiente paso →</button>`}
    </div>`;
}

let actual = 0;

function pintarRuta() {
  ruta.querySelectorAll(".ruta__btn").forEach((btn, n) => {
    btn.classList.toggle("is-done", estado.hechos.includes(n));
    if (n === actual) btn.setAttribute("aria-current", "step");
    else btn.removeAttribute("aria-current");
  });
  const total = estado.hechos.length;
  document.getElementById("progresoBarra").style.width = `${(total / DIAS.length) * 100}%`;
  document.getElementById("progresoTexto").textContent =
    total === DIAS.length ? "¡Completaste los 5 días! ✦" : `${total} de ${DIAS.length} días completados`;
}

function mostrarDia(i, { desplazar = false } = {}) {
  actual = i;
  dia.innerHTML = htmlDia(DIAS[i], i);
  dia.style.animation = "none";
  void dia.offsetWidth; // reinicia la animación de entrada
  dia.style.animation = "";
  pintarRuta();
  if (desplazar) {
    ruta.scrollIntoView({ block: "start" });
    dia.focus({ preventScroll: true });
  }
}

ruta.innerHTML = DIAS.map(
  (d, i) => `<li><button type="button" class="ruta__btn" data-ir="${i}"><small>Día ${i + 1}</small><span>${d.nombre}</span></button></li>`
).join("");

ruta.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-ir]");
  if (btn) mostrarDia(Number(btn.dataset.ir));
});

dia.addEventListener("click", (e) => {
  const ir = e.target.closest("[data-ir]");
  if (ir) mostrarDia(Number(ir.dataset.ir), { desplazar: true });

  const saltar = e.target.closest("[data-saltar]");
  if (saltar) document.getElementById(saltar.dataset.saltar).scrollIntoView();

  const completar = e.target.closest("[data-completar]");
  if (completar) {
    const i = Number(completar.dataset.completar);
    if (!estado.hechos.includes(i)) estado.hechos.push(i);
    guardar();
    if (i + 1 < DIAS.length) mostrarDia(i + 1, { desplazar: true });
    else {
      mostrarDia(i);
      document.getElementById("agenda").scrollIntoView();
    }
  }
});

dia.addEventListener("change", (e) => {
  const id = e.target.dataset.marca;
  if (id) {
    estado.marcas[id] = e.target.checked;
    guardar();
  }
});

dia.addEventListener("input", (e) => {
  const id = e.target.dataset.nota;
  if (id) {
    estado.notas[id] = e.target.value;
    guardar();
  }
});

// Abre en el primer día sin completar
const pendiente = DIAS.findIndex((_, i) => !estado.hechos.includes(i));
mostrarDia(pendiente === -1 ? 0 : pendiente);
