// Quiz "¿Cuál es tu don espiritual?"
// Las 3 primeras preguntas revelan el don. Las demás perfilan a la persona
// (etapa con su don, creencia sobre cobrar, consciencia, ocupación, ingresos e
// inversión) y viajan con el registro a la masterclass.
{
  const DONES = {
    sanacion: {
      titulo: "Don de <em>Sanación</em>",
      desc: "Tu energía calma, ordena y restaura. Las personas se sienten mejor solo con estar cerca de ti, y tu cuerpo percibe lo que otros cargan.",
      don: "Sientes la energía en tu cuerpo y en tus manos. Donde hay dolor, tú llevas alivio.",
      proposito: "Ser canal de sanación para quienes cargan heridas que nadie más ve.",
    },
    vision: {
      titulo: "Don de <em>Visión</em>",
      desc: "Ves lo que otros todavía no pueden ver. Tus corazonadas, sueños y certezas se adelantan a los hechos.",
      don: "Tu intuición te muestra caminos, respuestas y momentos antes de que lleguen.",
      proposito: "Iluminar el camino de quienes están perdidos y no saben qué decisión tomar.",
    },
    canal: {
      titulo: "Don de <em>Canalización</em>",
      desc: "Las palabras te llegan solas. Cuando hablas o escribes desde el corazón, llevas mensajes que no vienen solo de ti.",
      don: "Eres puente entre lo invisible y lo humano: recibes mensajes y sabes transmitirlos.",
      proposito: "Llevar el mensaje que alguien necesita escuchar justo en el momento correcto.",
    },
    guia: {
      titulo: "Don de <em>Guía</em>",
      desc: "Las personas te abren su corazón sin conocerte. Tienes la capacidad de acompañar procesos y hacer que otros se encuentren a sí mismos.",
      don: "Sostienes, acompañas y das claridad. A tu lado, la gente se transforma.",
      proposito: "Acompañar a otros a atravesar su proceso y llegar a la mejor versión de sí mismos.",
    },
  };

  const PASOS = [
    {
      id: "p1",
      pregunta: "Cuando alguien cercano está pasando por un mal momento, tú…",
      opciones: [
        ["Sientes en tu cuerpo lo que le pasa, incluso antes de que te lo cuente", "sanacion"],
        ["Ves con claridad lo que tiene que hacer, como si ya lo supieras", "vision"],
        ["Te llegan las palabras exactas que necesita escuchar", "canal"],
        ["Te sientas a su lado y le ayudas a ordenar lo que siente", "guia"],
      ],
    },
    {
      id: "p2",
      pregunta: "¿Cuál de estas cosas te ha pasado más de una vez?",
      opciones: [
        ["Tus manos se calientan o sientes la energía de los lugares", "sanacion"],
        ["Sueños o corazonadas que luego se cumplen", "vision"],
        ["Escribes o hablas y sientes que no eres tú quien lo dice", "canal"],
        ["Personas que apenas conoces te cuentan su vida", "guia"],
      ],
    },
    {
      id: "p3",
      pregunta: "La gente suele buscarte porque…",
      opciones: [
        ["A tu lado se sienten en paz y más livianos", "sanacion"],
        ["Les dices cosas que luego pasan", "vision"],
        ["Siempre tienes el mensaje que necesitaban", "canal"],
        ["Les ayudas a encontrar claridad y rumbo", "guia"],
      ],
    },
    {
      id: "etapa",
      label: "Etapa con su don",
      pregunta: "¿Cómo es tu relación con tu don hoy?",
      opciones: [
        ["Lo intuyo, pero todavía no sé bien cuál es", 0],
        ["Sé cuál es y lo uso con personas cercanas", 1],
        ["Lo he trabajado y me he formado en él", 2],
        ["Ya lo ofrezco como un servicio", 3],
      ],
    },
    {
      id: "monetizar",
      label: "Cree que puede monetizarlo",
      pregunta: "Cuando piensas en recibir dinero por tu don, sientes que…",
      opciones: [
        ["Me genera ruido cobrar por algo que Dios me dio", 0],
        ["Es posible, pero no sé cómo hacerlo yo", 1],
        ["Ya he recibido dinero por él alguna vez", 2],
        ["Quiero que sea mi principal fuente de ingresos", 3],
      ],
    },
    {
      id: "consciencia",
      label: "Nivel de consciencia",
      pregunta: "¿Qué frase resuena más contigo en este momento?",
      opciones: [
        ["Siento que hay algo más para mí, pero aún no sé qué es", 0],
        ["Sé que tengo una misión, pero algo me frena", 1],
        ["Sé que creo mi realidad y estoy sanando mis bloqueos", 2],
        ["Vivo desde mi propósito y quiero expandirlo", 3],
      ],
    },
    {
      id: "ocupacion",
      label: "Ocupación",
      pregunta: "Hoy, ¿a qué dedicas la mayor parte de tu energía?",
      opciones: [
        ["Trabajo para una empresa o institución", 0],
        ["Tengo mi propio negocio o trabajo de forma independiente", 1],
        ["Acompaño a otros: terapias, salud, coaching o algo holístico", 2],
        ["Estoy en casa, estudiando o en un momento de transición", 0],
      ],
    },
    {
      id: "ingresos",
      label: "Ingresos mensuales",
      pregunta: "La abundancia también se mide. ¿Cuánto recibes al mes hoy, aproximadamente?",
      opciones: [
        ["Menos de 500 USD", 0],
        ["Entre 500 y 1.500 USD", 1],
        ["Entre 1.500 y 3.000 USD", 2],
        ["Entre 3.000 y 5.000 USD", 3],
        ["Más de 5.000 USD", 4],
      ],
    },
    {
      id: "inversion",
      label: "Inversión previa",
      pregunta: "¿Has invertido antes en tu crecimiento personal o espiritual?",
      opciones: [
        ["Todavía no", 0],
        ["Sí, en cursos o talleres por menos de 500 USD", 1],
        ["Sí, entre 500 y 2.000 USD", 2],
        ["Sí, más de 2.000 USD en mentorías o procesos", 3],
      ],
    },
  ];

  const PUENTES = [
    "Si cobrar por tu don te genera ruido, no estás sola ni solo. En la masterclass vas a ver por qué recibir también es parte de tu propósito.",
    "Ya sientes que es posible. Lo que falta es el cómo, y eso es justo lo que Laura va a enseñarte en la masterclass.",
    "Ya recibiste dinero por tu don: esa es la señal. En la masterclass verás cómo convertir eso en ingresos constantes.",
    "Quieres que tu don sea tu principal fuente de ingresos. En la masterclass verás el camino para lograrlo.",
  ];

  const screens = Object.fromEntries(
    [...document.querySelectorAll("[data-screen]")].map((el) => [el.dataset.screen, el])
  );
  const preguntas = PASOS;
  const respuestas = {}; // id → índice de la opción
  let paso = 0;

  const show = (name, focus) => {
    Object.values(screens).forEach((el) => el.classList.remove("is-active"));
    screens[name].classList.add("is-active");
    window.scrollTo({ top: 0 });
    if (focus) focus.focus({ preventScroll: true });
  };

  const render = () => {
    const actual = PASOS[paso];
    if (!actual) return show("contact", screens.contact.querySelector("input"));

    const n = preguntas.indexOf(actual) + 1;
    screens.question.querySelector("[data-step]").textContent = `Pregunta ${n} de ${preguntas.length}`;
    screens.question.querySelector("[data-progress]").style.width = `${((n - 1) / preguntas.length) * 100}%`;
    const titulo = screens.question.querySelector("[data-question]");
    titulo.textContent = actual.pregunta;

    const opciones = screens.question.querySelector("[data-options]");
    opciones.innerHTML = "";
    actual.opciones.forEach(([texto], i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz__option";
      btn.textContent = texto;
      if (respuestas[actual.id] === i) btn.classList.add("is-selected");
      btn.addEventListener("click", () => {
        respuestas[actual.id] = i;
        btn.classList.add("is-selected");
        setTimeout(() => { paso++; render(); }, 280);
      });
      opciones.append(btn);
    });

    screens.question.querySelector("[data-back]").hidden = paso === 0;
    show("question", titulo);
  };

  screens.intro.querySelector("[data-start]").addEventListener("click", render);
  screens.question.querySelector("[data-back]").addEventListener("click", () => {
    paso--;
    render();
  });

  // Don con más votos en las 3 primeras preguntas; si empatan, gana la primera respuesta
  const calcularDon = () => {
    const votos = {};
    ["p1", "p2", "p3"].forEach((id) => {
      const don = PASOS.find((p) => p.id === id).opciones[respuestas[id]][1];
      votos[don] = (votos[don] || 0) + 1;
    });
    const primero = PASOS[0].opciones[respuestas.p1][1];
    return Object.keys(votos).reduce((a, b) => (votos[b] > votos[a] ? b : a), primero);
  };

  const valor = (id) => {
    const pregunta = PASOS.find((p) => p.id === id);
    return pregunta.opciones[respuestas[id]];
  };

  // Prioridad para seguimiento comercial
  const calcularPrioridad = () => {
    const ingresos = valor("ingresos")[1];
    const inversion = valor("inversion")[1];
    const total = ingresos + inversion + valor("etapa")[1] + valor("monetizar")[1];
    if ((ingresos >= 2 && inversion >= 2) || total >= 9) return "Alta";
    if (total >= 5) return "Media";
    return "Baja";
  };

  // Registro
  const formQuiz = screens.contact.querySelector("[data-quiz-form]");
  const msgQuiz = formQuiz.querySelector("[data-form-msg]");
  const btnQuiz = formQuiz.querySelector("button");
  const paisQuiz = formQuiz.querySelector("[data-country]");
  fillCountries(paisQuiz);

  formQuiz.addEventListener("submit", async (event) => {
    event.preventDefault();
    msgQuiz.textContent = "";

    const data = Object.fromEntries(new FormData(formQuiz));
    const digitos = (data.phone || "").replace(/\D/g, "").replace(/^0+/, "");
    if (!data.country) {
      msgQuiz.textContent = "Selecciona el código de tu país.";
      paisQuiz.focus();
      return;
    }
    if (!data.name.trim() || !formQuiz.email.checkValidity() || digitos.length < 7) {
      msgQuiz.textContent = "Revisa tu nombre, correo y WhatsApp.";
      return;
    }
    data.phone = `+${data.country} ${digitos}`;
    delete data.country;

    const don = calcularDon();
    data.quiz = {
      don: DONES[don].titulo.replace(/<\/?em>/g, ""),
      prioridad: calcularPrioridad(),
    };
    preguntas.filter((p) => p.label).forEach((p) => { data.quiz[p.id] = valor(p.id)[0]; });

    btnQuiz.disabled = true;
    btnQuiz.textContent = "Revelando tu don…";
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      mostrarResultado(data.name.trim().split(/\s+/)[0], don);
    } catch {
      msgQuiz.textContent = "No pudimos guardar tus datos. Inténtalo de nuevo en un momento.";
      btnQuiz.disabled = false;
      btnQuiz.textContent = "Ver mi resultado";
    }
  });

  const mostrarResultado = (nombre, don) => {
    const r = screens.result;
    const info = DONES[don];
    r.querySelector("[data-r-name]").textContent = nombre;
    r.querySelector("[data-r-title]").innerHTML = info.titulo;
    r.querySelector("[data-r-desc]").textContent = info.desc;
    r.querySelector("[data-r-don]").textContent = info.don;
    r.querySelector("[data-r-proposito]").textContent = info.proposito;
    r.querySelector("[data-r-bridge]").textContent = PUENTES[valor("monetizar")[1]];
    show("result", r.querySelector("[data-r-title]"));
  };
}
