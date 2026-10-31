// TODO: confirmar hora y zona horaria (-05:00 = Colombia)
const MASTERCLASS_START = new Date("2026-11-15T19:00:00-05:00");
const MASTERCLASS_DURATION_MIN = 90;
// Grupo de WhatsApp (botón en la página de gracias)
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/HB2Q6lFJp5Y2kCvXkfGQo2";

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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    msg.textContent = "";

    const data = Object.fromEntries(new FormData(form));
    if (!data.name.trim() || !form.email.checkValidity() || data.phone.replace(/\D/g, "").length < 7) {
      msg.textContent = "Revisa tu nombre, correo y WhatsApp.";
      return;
    }

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
