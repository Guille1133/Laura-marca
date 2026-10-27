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
api/registro.js          → guarda los inscritos en MailerLite
assets/                  → fotos de Laura
```

## Masterclass: pendientes

- [ ] Confirmar hora y zona horaria (`masterclass/index.html` y `MASTERCLASS_START` en `masterclass.js`)
- [ ] Link del grupo de WhatsApp (`WHATSAPP_GROUP_URL` en `masterclass.js`)
- [ ] En Vercel → Settings → Environment Variables: `MAILERLITE_API_KEY` y `MAILERLITE_GROUP_ID`

## Landing: pendientes

- [ ] Link de Calendly en `script.js` (`CALENDLY_URL`)
- [ ] Foto principal en `assets/laura.jpg` (vertical, 4:5)
- [ ] Foto secundaria en `assets/laura-about.jpg` (cuadrada)
- [ ] Testimonios reales
- [ ] Historia de Laura en la sección "Sobre mí"
- [ ] Confirmar duración de la llamada y si es gratuita (FAQ)

## Ver en local

Abre `index.html` en el navegador, o:

```bash
npx serve .
```

## Deploy

Sitio estático: se importa el repo en Vercel sin configuración adicional y se conecta el dominio en *Settings → Domains*.
