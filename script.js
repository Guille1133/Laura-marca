// Link de Calendly de la llamada de diagnóstico, ej: "https://calendly.com/laura/diagnostico"
const CALENDLY_URL = "";

// Aparición suave de las secciones al hacer scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

// Calendly: solo se carga cuando hay link configurado
if (CALENDLY_URL && document.getElementById("calendly")) {
  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  script.onload = () => {
    const container = document.getElementById("calendly");
    container.innerHTML = "";
    Calendly.initInlineWidget({
      url: `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=fbf8ff&primary_color=7b3fe4`,
      parentElement: container,
    });
  };
  document.body.appendChild(script);
}
