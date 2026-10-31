// Recibe los inscritos de la masterclass y los agrega como filas en esta hoja.
// Pégalo en la hoja: Extensiones → Apps Script. Instrucciones en el README.

// Debe coincidir con SHEETS_SECRET en Vercel.
const SECRET = "CAMBIA-ESTA-CLAVE";

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.secret !== SECRET) return respond({ ok: false, error: "unauthorized" });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Fecha", "Nombre", "Correo", "WhatsApp", "Página"]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date(), text(data.name), text(data.email), text(data.phone), text(data.source)]);
  } finally {
    lock.releaseLock();
  }
  return respond({ ok: true });
}

// Guarda todo como texto: evita que "+57 300…" o "=algo" se lean como fórmula.
function text(value) {
  return "'" + String(value || "").trim();
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
