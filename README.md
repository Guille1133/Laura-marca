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
api/registro.js          → envía los inscritos a Google Sheets
google-sheets/registro.gs → script que se pega en la hoja (Apps Script)
assets/                  → fotos de Laura
```

## Masterclass: pendientes

- [ ] Confirmar hora y zona horaria (`masterclass/index.html` y `MASTERCLASS_START` en `masterclass.js`)
- [ ] Link del grupo de WhatsApp (`WHATSAPP_GROUP_URL` en `masterclass.js`)
- [ ] Conectar la hoja de inscritos (ver abajo)

## Inscritos en Google Sheets

1. Crea una hoja de Google Sheets vacía (por ejemplo "Inscritos masterclass").
2. Extensiones → Apps Script → borra lo que haya y pega `google-sheets/registro.gs`.
   Cambia `SECRET` por una clave larga y guarda.
3. Implementar → Nueva implementación → tipo "Aplicación web".
   Ejecutar como: **Yo** · Quién tiene acceso: **Cualquier usuario**. Autoriza y copia la URL (`.../exec`).
4. En Vercel → Settings → Environment Variables: `SHEETS_WEBHOOK_URL` (la URL) y `SHEETS_SECRET` (la misma clave).
5. Redeploy. Cada inscripción agrega una fila: Fecha, Nombre, Correo, WhatsApp, Página.
   Para Excel: Archivo → Descargar → Microsoft Excel (.xlsx).

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
