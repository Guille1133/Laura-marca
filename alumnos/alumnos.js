// Links de alumnos (/alumnos): lista la página de onboarding de cada alumno de Expansión.
// Los datos vienen de /api/alumnos (Notion "Admisión Expansión · Alumnos"), con clave.

// Mensaje de WhatsApp que se abre listo para enviar
const mensaje = (nombre, link) =>
  `Hola ${nombre} ✨ Te doy la bienvenida a Expansión. Esta es tu página personal: ahí está tu mapa de 5 meses y puedes anotar las fechas de tus mentorías. Guárdala y no la compartas, es solo tuya:\n${link}`;

const $ = (s) => document.querySelector(s);
const linkDe = (a) => `${location.origin}/bienvenida/${a.id}`;
const fechaCorta = (v) => new Date(v).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });
const fechaHora = (v) =>
  new Date(v).toLocaleString("es", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
const simple = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

let alumnos = [];

// ---------- Pantallas ----------
function ver(cual) {
  $("[data-cargando]").hidden = cual !== "cargando";
  $("[data-entrada]").hidden = cual !== "entrada";
  $("[data-panel]").hidden = cual !== "panel";
  $("[data-salir]").hidden = cual !== "panel";
}
const pedir = (cuerpo) =>
  fetch("/api/alumnos", cuerpo && { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) });

async function cargar() {
  try {
    const r = await pedir();
    const datos = await r.json().catch(() => ({}));
    if (r.ok) {
      alumnos = datos.alumnos;
      pintar();
      return ver("panel");
    }
    if (r.status === 401 || !alumnos.length) {
      $("[data-error]").textContent = datos.error ?? "No se pudo abrir la lista. Inténtalo de nuevo.";
      return ver("entrada");
    }
    $("[data-conteo]").textContent = datos.error || "No se pudo actualizar. Inténtalo de nuevo.";
  } catch {
    if (alumnos.length) return ($("[data-conteo]").textContent = "Sin conexión. Inténtalo de nuevo.");
    $("[data-error]").textContent = "Sin conexión. Inténtalo de nuevo.";
    ver("entrada");
  }
}

// ---------- Lista ----------
// Se arma con textContent: los nombres los escribe cada persona en el formulario
function el(tag, clase, texto) {
  const n = document.createElement(tag);
  if (clase) n.className = clase;
  if (texto) n.textContent = texto;
  return n;
}

function tarjeta(a) {
  const link = linkDe(a);
  const li = el("li", "alumno");
  li.append(el("h2", "", a.nombre));

  const datos = el("p", "alumno__datos");
  datos.append(
    el("span", "", `Ingresó el ${fechaCorta(a.fecha)}`),
    el("span", "", `${a.realizadas} de 15 mentorías`),
    el("span", "", a.proxima && new Date(a.proxima) > Date.now() ? `Próxima: ${fechaHora(a.proxima)}` : "Sin próxima fecha")
  );
  li.append(datos);

  const acciones = el("div", "acciones");
  const numero = a.whatsapp.replace(/\D/g, "");
  if (numero.length >= 7) {
    const wa = el("a", "accion accion--principal", "Enviar por WhatsApp");
    wa.href = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje(a.nombre.split(/\s+/)[0], link))}`;
    wa.target = "_blank";
    wa.rel = "noopener";
    acciones.append(wa);
  }
  const copiar = el("button", "accion", "Copiar link");
  copiar.type = "button";
  copiar.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(link);
      copiar.textContent = "Link copiado ✓";
      setTimeout(() => (copiar.textContent = "Copiar link"), 2000);
    } catch {
      window.prompt("Copia este link:", link);
    }
  });
  const abrir = el("a", "accion", "Abrir página");
  abrir.href = link;
  abrir.target = "_blank";
  abrir.rel = "noopener";
  acciones.append(copiar, abrir);
  acciones.querySelectorAll(".accion").forEach((b) => b.setAttribute("aria-label", `${b.textContent}: ${a.nombre}`));
  copiar.removeAttribute("aria-label"); // su texto cambia al copiar
  li.append(acciones);
  return li;
}

function pintar() {
  const q = simple($("[data-buscar]").value.trim());
  const visibles = alumnos.filter((a) => simple(a.nombre).includes(q));
  $("[data-lista]").replaceChildren(...visibles.map(tarjeta));
  $("[data-conteo]").textContent = !alumnos.length
    ? "Todavía no hay alumnos. Aparecerán aquí cuando llenen la admisión."
    : !visibles.length
      ? "Nadie coincide con esa búsqueda."
      : `${visibles.length} ${visibles.length === 1 ? "alumno" : "alumnos"}`;
}

// ---------- Eventos ----------
$("[data-buscar]").addEventListener("input", pintar);
$("[data-actualizar]").addEventListener("click", () => {
  $("[data-conteo]").textContent = "Actualizando…";
  cargar();
});
$("[data-entrada]").addEventListener("submit", async (e) => {
  e.preventDefault();
  const boton = $("[data-entrar]");
  boton.disabled = true;
  $("[data-error]").textContent = "";
  try {
    const r = await pedir({ accion: "entrar", clave: $("[data-clave]").value });
    if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error);
    $("[data-clave]").value = "";
    await cargar();
  } catch (err) {
    $("[data-error]").textContent = err.message && !(err instanceof TypeError) ? err.message : "Sin conexión. Inténtalo de nuevo.";
  }
  boton.disabled = false;
});
$("[data-salir]").addEventListener("click", async () => {
  await pedir({ accion: "salir" }).catch(() => {});
  alumnos = [];
  $("[data-lista]").replaceChildren();
  ver("entrada");
});

cargar();
