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
presentacion/            → presentación comercial del programa EXPANSIÓN (/presentacion)
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

- [x] Link de Calendly en `script.js` (`CALENDLY_URL`)
- [x] Foto principal en `assets/laura.jpg` (vertical, 4:5)
- [x] Foto secundaria en `assets/laura-about.jpg` (cuadrada)
- [x] Testimonios reales (capturas originales en `Testimonios/`, fuera de git)
- [x] Historia de Laura en la sección "Sobre mí"
- [x] Llamada: gratuita, 30 minutos
- [x] Dominio: expansiondonesespirituales.com

## Ver en local

Abre `index.html` en el navegador, o:

```bash
npx serve .
```

## Deploy

Vercel publica cada push a `main` en https://expansiondonesespirituales.com (DNS en Namecheap: `A @ 216.198.79.1` y `CNAME www 7502c633041f213d.vercel-dns-017.com`; `www` redirige al dominio raíz). El dominio anterior, azulnavegante.com, venció; si se renueva, redirige al nuevo.
