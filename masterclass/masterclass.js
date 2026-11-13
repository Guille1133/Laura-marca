// TODO: confirmar hora y zona horaria (-05:00 = Colombia)
const MASTERCLASS_START = new Date("2026-11-15T19:00:00-05:00");
const MASTERCLASS_DURATION_MIN = 90;
// Grupo de WhatsApp (botón en la página de gracias)
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/HB2Q6lFJp5Y2kCvXkfGQo2";

// Códigos de país para el WhatsApp (el valor es el código sin "+")
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
function fillCountries(select) {
  PAISES.forEach(([nombre, codigo], i) => {
    if (i === 4) select.append(new Option("──────────", "", false, false));
    select.append(new Option(`+${codigo} ${nombre}`, codigo));
  });
  select.options[5].disabled = true; // separador
}

// Cuenta regresiva
const countdown = document.querySelector("[data-countdown]");
if (countdown) {
  const units = {
    days: 86400000,
    hours: 3600000,
    minutes: 60000,
    seconds: 1000,
  };
  const tick = () => {
    let remaining = Math.max(0, MASTERCLASS_START - Date.now());
    for (const [unit, ms] of Object.entries(units)) {
      const value = Math.floor(remaining / ms);
      remaining -= value * ms;
      countdown.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, "0");
    }
  };
  tick();
  setInterval(tick, 1000);
}

// Registro
const form = document.querySelector("[data-signup]");
if (form) {
  const msg = form.querySelector("[data-form-msg]");
  const button = form.querySelector("button");

  const country = form.querySelector("[data-country]");
  fillCountries(country);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    msg.textContent = "";

    const data = Object.fromEntries(new FormData(form));
    const digitos = (data.phone || "").replace(/\D/g, "").replace(/^0+/, "");
    if (!data.country) {
      msg.textContent = "Selecciona el código de tu país.";
      country.focus();
      return;
    }
    if (!data.name.trim() || !form.email.checkValidity() || digitos.length < 7) {
      msg.textContent = "Revisa tu nombre, correo y WhatsApp.";
      return;
    }
    // Se guarda completo, listo para WhatsApp: +57 3001234567
    data.phone = `+${data.country} ${digitos}`;
    delete data.country;

    button.disabled = true;
    button.textContent = "Reservando…";
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      window.location.href = "/masterclass/gracias";
    } catch {
      msg.textContent = "No pudimos registrarte. Inténtalo de nuevo en un momento.";
      button.disabled = false;
      button.textContent = "Quiero mi lugar";
    }
  });
}

// Página de gracias
const whatsapp = document.querySelector("[data-whatsapp]");
if (whatsapp) {
  if (WHATSAPP_GROUP_URL) {
    whatsapp.href = WHATSAPP_GROUP_URL;
  } else {
    whatsapp.closest("li").remove();
  }
}

const calendar = document.querySelector("[data-calendar]");
if (calendar) {
  const fmt = (date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const end = new Date(MASTERCLASS_START.getTime() + MASTERCLASS_DURATION_MIN * 60000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Masterclass: Monetiza tus dones espirituales · Laura Restrepo",
    dates: `${fmt(MASTERCLASS_START)}/${fmt(end)}`,
    details: "Masterclass en vivo con Laura Restrepo. El enlace de acceso llegará por el grupo de WhatsApp.",
  });
  calendar.href = `https://calendar.google.com/calendar/render?${params}`;
}
