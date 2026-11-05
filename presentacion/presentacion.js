// Contenido mes a mes del programa EXPANSIÓN. Para cambiar un texto, se edita aquí.
const PUERTOS = [
  {
    nombre: "Identidad",
    frase: "Consolidar la identidad del arquitecto",
    objetivo: "Anclar la identidad reprogramada de Azul Navegante en un yo coherente, estable y poderoso que sostiene el proyecto de vida y el despertar espiritual que vas a construir.",
    modulo: "La identidad del arquitecto",
    lecciones: [
      "De Navegante a Arquitecto: la evolución de tu identidad",
      "Los 7 pilares de la identidad elevada (Método TRE™ aplicado)",
      "Arquetipos de poder: ¿cuál es tu firma energética única?",
      "Coherencia vibracional 360° (identidad + propósito + dones + vida)",
      "Protocolo de anclaje identitario: 30 días",
      "Test de identidad expandida (autoevaluación profunda)",
    ],
    sesiones: [
      "Diagnóstico de identidad actual post-Azul Navegante. Identificar brechas entre quién eres y quién necesitas ser. Diseñar tu Declaración de Identidad del Arquitecto.",
      "Trabajo profundo con arquetipos de poder. Identificar tu firma energética única. Crear tu avatar de identidad expandida.",
      "Escaneo energético de coherencia vibracional. Detectar incongruencias entre identidad y acciones. Protocolo de corrección energética.",
      "Revisión del protocolo de anclaje. Sanación energética de resistencias identitarias. Cierre del mes y preparación para Puerto Propósito.",
    ],
    clases: [
      "Masterclass: Los 7 errores que destruyen tu identidad expandida",
      "Taller práctico: Ritual de anclaje identitario (en vivo con el grupo)",
    ],
    mastermind: "Hot seat con cada navegante presentando su Declaración de Identidad, con feedback grupal. Se activa conforme se forme el grupo.",
    material: [
      "Workbook «Consolidación identitaria» (PDF de 50 páginas)",
      "4 meditaciones guiadas de anclaje identitario",
      "Playlist energética personalizada",
      "Tracker semanal de coherencia vibracional",
    ],
  },
  {
    nombre: "Propósito",
    frase: "Diseñar el proyecto de vida escalable",
    objetivo: "Transformar el propósito descubierto en Azul Navegante en un proyecto de vida concreto, escalable, conectado a los dones espirituales y abundante.",
    modulo: "Arquitectura de tu proyecto de vida",
    lecciones: [
      "De propósito abstracto a proyecto concreto",
      "El método de los 4 cuadrantes (pasión, talento, mercado, impacto)",
      "Ikigai expandido: tu misión de vida monetizable",
      "Diseño de oferta irresistible (tu servicio o programa único)",
      "Modelo de negocio espiritual sostenible",
      "Proyección financiera a 3 años: tu camino hacia la abundancia real",
    ],
    sesiones: [
      "Extracción profunda de tu propósito de vida (Método TRE™). Identificar los 4 cuadrantes de tu proyecto. Clarificar tu oferta núcleo.",
      "Diseño de tu oferta irresistible. Definir tu avatar de cliente ideal. Crear tu propuesta de valor única.",
      "Construcción del modelo de negocio escalable. Proyección financiera real y honesta. Identificar primeras fuentes de ingreso.",
      "Validación de mercado (estrategia de testeo). Ajustes finales al proyecto de vida. Preparación para construir tu marca.",
    ],
    clases: [
      "Cómo convertir tu don espiritual en oferta comercial de alto valor",
      "Casos reales: proyectos de vida que generan abundancia desde el propósito",
    ],
    material: [
      "Canvas del proyecto de vida (plantilla editable)",
      "Guía de validación de mercado",
      "10 scripts para entrevistas con clientes potenciales",
    ],
  },
  {
    nombre: "Marca",
    frase: "Construir marca personal de impacto global",
    objetivo: "Crear una marca personal coherente, auténtica y magnética que atraiga a tu cliente ideal, posicione tu autoridad globalmente y refleje tu propósito y dones únicos.",
    nota: "Módulo impartido por un mentor experto en marcas personales con propósito y potencial de viralización internacional.",
    modulo: "Marca personal de impacto (con mentor experto)",
    lecciones: [
      "Fundamentos de marca personal en la era digital",
      "Storytelling de transformación (tu historia como imán)",
      "Arquetipos de marca (descubre el tuyo)",
      "Identidad visual coherente (colores, tipografía, estética)",
      "Copywriting energético (escribe desde tu esencia)",
      "Estrategia de contenido viral (estudios de caso reales)",
    ],
    sesiones: [
      "Definir el ADN de tu marca personal. Storytelling: extraer tu historia de transformación. Identificar tu arquetipo de marca.",
      "Diseño de identidad visual (briefing para diseñador). Definir voz y tono de marca. Crear tu manifiesto de marca.",
      "Estrategia de contenido personalizada. Calendario de contenido a 90 días. Ideas de contenido viral auténtico.",
      "Revisión de tus primeros contenidos. Optimización basada en resultados reales. Preparación para el módulo de abundancia.",
    ],
    material: ["Material personalizado de acuerdo con la construcción de tu marca personal"],
  },
  {
    nombre: "Abundancia",
    frase: "Monetización consciente y primeros resultados",
    objetivo: "Implementar estrategias validadas y honestas de monetización para comenzar a generar ingresos reales con tu proyecto de vida. El enfoque es la coherencia, no la promesa vacía.",
    modulo: "Dinero consciente",
    lecciones: [
      "Mentalidad de abundancia vs. mentalidad de escasez",
      "Los 3 modelos de monetización espiritual",
      "Estrategia de pricing (cómo fijar precios sin culpa ni miedo)",
      "Atracción energética de clientes (atraer sin perseguir)",
      "Lanzamientos de alto impacto (método probado y honesto)",
      "Ventas 1:1 desde tu esencia, sin ser «vendedor»",
      "Email marketing con alma",
      "Construcción de comunidad de pago",
      "Productos digitales escalables",
      "Tu plan de monetización de los próximos 6 meses",
    ],
    sesiones: [
      "Sanación energética de bloqueos económicos profundos. Reprogramación de creencias sobre dinero. Definir tu modelo de monetización principal.",
      "Crear tu oferta irresistible con pricing estratégico y honesto. Preparación de tu primer lanzamiento.",
      "Ejecución del primer lanzamiento, con acompañamiento. Estrategia de cierre de ventas desde la energía. Manejo de objeciones con integridad.",
      "Análisis de resultados del primer lanzamiento. Optimización de conversión. Proyección realista para los próximos meses.",
    ],
    clases: [
      "Anatomía de un lanzamiento que genera resultados reales (caso real paso a paso)",
      "Cómo vender sin vender: ventas desde energía elevada",
    ],
    material: [
      "Scripts de ventas (5 conversaciones tipo)",
      "Guía de lanzamientos de alto impacto",
      "E-book «Cómo vender sin vender: ventas desde energía elevada»",
    ],
  },
  {
    nombre: "Dones",
    frase: "Despertar, activación e integración de dones espirituales",
    objetivo: "Identificar, activar e integrar tus dones espirituales únicos, conectándolos directamente con tu propósito de vida y tu modelo de abundancia. Aprenderás cómo crear una vida de riqueza real a través de tus dones.",
    nota: "Laura guía este proceso desde sus propios dones únicos de sanación.",
    modulo: "Activación de dones espirituales",
    lecciones: [
      "Los dones espirituales: mapa completo y cómo identificarlos",
      "Test de identificación de tus dones únicos (autoevaluación profunda)",
      "Clarividencia: ver más allá del velo",
      "Clariaudiencia: escuchar la guía divina",
      "Sanación energética: canalizar energía transformadora",
      "Intuición expandida: tomar decisiones desde el alma",
      "Mediumnidad: conectar con planos superiores",
      "Integrar tus dones en tu oferta de servicio al mundo",
      "Cómo crear una vida de riqueza y abundancia a través de tus dones espirituales",
      "Protección energética para trabajadores de luz",
    ],
    sesiones: [
      "Escaneo energético profundo de tus dones latentes. Identificación de tus dones. Activación energética inicial.",
      "Activación profunda de tu don único. Protocolo de desarrollo diario personalizado. Ejercicios prácticos adaptados a tu don.",
      "Integración de tus dones en tu proyecto de vida y tu oferta de servicio. Cómo ofrecer tus dones de forma ética y abundante.",
      "Consolidación de la activación. Protección energética avanzada. Preparación para poner tus dones al servicio del mundo.",
    ],
    clases: [
      "Los 7 mitos sobre dones espirituales que te limitan",
      "Círculo de activación grupal: ceremonia energética en vivo con Laura (se activará conforme crezca el grupo)",
    ],
    material: [
      "Guía «Despertar y desarrollo de dones espirituales» (PDF)",
      "7 meditaciones de activación de dones",
      "Protocolo de protección energética",
      "Journal de experiencias espirituales",
    ],
  },
  {
    nombre: "Trascendencia",
    frase: "Impacto mundial a través de tus dones y tu propósito",
    objetivo: "Posicionar tus dones espirituales y tu proyecto de vida como un movimiento de impacto real en el mundo. No se trata solo de escalar a cifras millonarias: se trata de crear un legado auténtico, sostenible y transformador.",
    modulo: "Trascendencia: tu movimiento de impacto mundial",
    lecciones: [
      "De proyecto personal a movimiento global: la diferencia que lo cambia todo",
      "Cómo los dones espirituales escalan el impacto más allá de las fronteras",
      "Construcción de un equipo consciente y alineado con tu propósito",
      "Sistemas y automatización espiritual (hacer más con menos)",
      "Colaboraciones estratégicas de alto impacto",
      "Conferencias, charlas y eventos presenciales como plataforma de expansión",
      "Tu plan de vida e impacto a 10 años",
      "Construir una comunidad que sane y transforme generaciones",
      "El Instituto de Dones Espirituales: visión de academia mundial (semilla)",
    ],
    sesiones: [
      "Visión de impacto: ¿qué huella única quieres dejar en el mundo con tus dones? Diseñar tu declaración de trascendencia.",
      "Creación de sistemas de automatización consciente. Estrategia de equipo y primeros pasos de delegación.",
      "Identificar colaboraciones estratégicas y alianzas de impacto. Planificación de eventos, charlas o conferencias.",
      "Cierre del programa. Revisión de tu transformación total (mes 1 vs. mes 6). Plan de acción para los próximos 12 meses con tus dones activos.",
    ],
    clases: [
      "Cómo un don espiritual puede convertirse en un movimiento global (casos reales)",
      "Ceremonia de cierre y activación final: el Círculo de Trascendencia",
    ],
    bonus: [
      "Carta de reconocimiento personal de Laura: tu historia de transformación documentada",
      "Introducción estratégica a la red de contactos de Laura (cuando sea relevante y oportuno)",
    ],
    material: [
      "Roadmap de impacto mundial (plantilla estratégica personalizada)",
      "Guía de sistemas y automatización consciente",
      "Plantilla de plan de vida e impacto a 10 años",
      "Manual de colaboraciones estratégicas",
    ],
  },
];

const PAGOS = {
  unico: { monto: "$2,500", detalle: "Un solo pago" },
  tres: { monto: "$900", detalle: "3 cuotas de $900 USD · Total $2,700 USD" },
  seis: { monto: "$480", detalle: "6 cuotas de $480 USD · Total $2,880 USD" },
};

const ruta = document.getElementById("ruta");
const puerto = document.getElementById("puerto");

const lista = (items) => items.map((item) => `<li>${item}</li>`).join("");

function seccion(titulo, cuerpo, { abierta = false, cuenta = "" } = {}) {
  return `<details${abierta ? " open" : ""}>
    <summary>${titulo}${cuenta ? `<small>${cuenta}</small>` : ""}</summary>
    ${cuerpo}
  </details>`;
}

function htmlPuerto(p, i) {
  const anterior = PUERTOS[i - 1];
  const siguiente = PUERTOS[i + 1];
  const sesiones = p.sesiones
    .map((s, n) => `<li><b>Semana ${n + 1}</b>${s}</li>`)
    .join("");

  return `
    <p class="fase__tag">Mes ${i + 1} de ${PUERTOS.length}</p>
    <h3>Puerto ${p.nombre}</h3>
    <p class="puerto__frase">${p.frase}</p>
    <p class="puerto__objetivo">${p.objetivo}</p>
    ${p.nota ? `<p class="puerto__nota">✦ ${p.nota}</p>` : ""}
    ${seccion(
      "Sesiones 1:1 contigo",
      `<ul class="puerto__sesiones">${sesiones}</ul>`,
      { abierta: true, cuenta: `${p.sesiones.length} sesiones` }
    )}
    ${seccion(
      "Módulo de formación",
      `<p class="puerto__modulo">${p.modulo}</p><ol>${lista(p.lecciones)}</ol>`,
      { cuenta: `${p.lecciones.length} lecciones` }
    )}
    ${p.clases ? seccion("Clases grupales en vivo", `<ul>${lista(p.clases)}</ul>`, { cuenta: `${p.clases.length} clases` }) : ""}
    ${p.mastermind ? seccion("Mastermind del mes", `<ul><li>${p.mastermind}</li></ul>`) : ""}
    ${seccion("Material de implementación", `<ul>${lista(p.material)}</ul>`)}
    ${p.bonus ? seccion("Bonus del mes", `<ul>${lista(p.bonus)}</ul>`) : ""}
    <div class="puerto__nav">
      ${anterior ? `<button type="button" data-ir="${i - 1}">← ${anterior.nombre}</button>` : ""}
      ${siguiente ? `<button type="button" data-ir="${i + 1}">Siguiente: ${siguiente.nombre} →</button>` : `<button type="button" data-saltar="incluye">Ver qué incluye →</button>`}
    </div>`;
}

function mostrarPuerto(i, { desplazar = false } = {}) {
  ruta.querySelectorAll(".ruta__btn").forEach((btn, n) => {
    btn.classList.toggle("is-done", n < i);
    if (n === i) btn.setAttribute("aria-current", "step");
    else btn.removeAttribute("aria-current");
  });

  puerto.innerHTML = htmlPuerto(PUERTOS[i], i);
  puerto.style.animation = "none";
  void puerto.offsetWidth; // reinicia la animación de entrada
  puerto.style.animation = "";

  if (desplazar) {
    ruta.scrollIntoView({ block: "start" });
    puerto.focus({ preventScroll: true });
  }
}

ruta.innerHTML = PUERTOS.map(
  (p, i) => `<li><button type="button" class="ruta__btn" data-ir="${i}"><small>Mes ${i + 1}</small><span>${p.nombre}</span></button></li>`
).join("");

ruta.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-ir]");
  if (btn) mostrarPuerto(Number(btn.dataset.ir));
});

puerto.addEventListener("click", (e) => {
  const ir = e.target.closest("[data-ir]");
  if (ir) mostrarPuerto(Number(ir.dataset.ir), { desplazar: true });
  const saltar = e.target.closest("[data-saltar]");
  if (saltar) document.getElementById(saltar.dataset.saltar).scrollIntoView();
});

mostrarPuerto(0);

// Forma de pago
document.querySelectorAll('input[name="pago"]').forEach((input) => {
  input.addEventListener("change", () => {
    const pago = PAGOS[input.value];
    document.getElementById("pagoMonto").textContent = pago.monto;
    document.getElementById("pagoDetalle").textContent = pago.detalle;
  });
});
