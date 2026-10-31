# Laura Restrepo · Landing

Landing para agendar llamadas de diagnóstico con Laura Restrepo, sanadora energética y mentora de dones espirituales.

> Dios te dio el regalo, te toca a ti monetizarlo.

## Estructura

```
index.html               → landing para agendar llamada (/)
styles.css               → estilos compartidos (colores y fuentes en :root)
script.js                → animaciones al hacer scroll + Calendly
masterclass/index.html   → página de captura de la masterclass (/masterclass)
masterclass/gracias.html → página de gracias (/masterclass/gracias)
masterclass/masterclass.js → fecha, cuenta regresiva, formulario, WhatsApp
api/registro.js          → envía los inscritos a n8n, que los guarda en Notion
assets/                  → fotos de Laura
```

## Masterclass: pendientes

- [ ] Confirmar hora y zona horaria (`masterclass/index.html` y `MASTERCLASS_START` en `masterclass.js`)
- [x] Grupo de WhatsApp en la página de gracias (`WHATSAPP_GROUP_URL` en `masterclass.js`)

## Inscritos

Cada inscripción crea una fila en la base de Notion **Inscritos Masterclass · Laura**
(flujo de n8n "Azul Navegante — Inscritos Masterclass"). Para Excel: en Notion, ••• → Exportar → CSV.

## Landing: pendientes

- [ ] Link de Calendly en `script.js` (`CALENDLY_URL`)
- [x] Foto principal en `assets/laura.jpg` (vertical, 4:5)
- [x] Foto secundaria en `assets/laura-about.jpg` (cuadrada)
- [x] Testimonios reales (capturas originales en `Testimonios/`, fuera de git)
- [x] Historia de Laura en la sección "Sobre mí"
- [x] Llamada: gratuita, 30 minutos
- [ ] Dominio

## Ver en local

Abre `index.html` en el navegador, o:

```bash
npx serve .
```

## Deploy

Vercel publica cada push a `main` en https://azulnavegante.com (DNS en GoDaddy: `A @ 76.76.21.21` y `CNAME www cname.vercel-dns.com`; `www` redirige al dominio raíz).
