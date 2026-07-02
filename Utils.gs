/**
 * Parse description to extract phone, app, price, service
 */
function parseDescription(description) {
  if (!description) return ['', '', 0, 0, ''];

  const lines = description.split('\n')
    .map(line => line.trim())
    .filter(l => /^[-·]/.test(l));

  let sdt = '', app = '', price = 0, service = 0, serviceNotes = [];
  let foundPrice = false;

  lines.forEach(line => {
    const content = line.replace(/^[-·]/, '').trim();

    // SĐT
    const phoneMatch = content.match(/0\d{8,10}/);
    if (phoneMatch) {
      sdt = "'" + phoneMatch[0];
      return;
    }

    // App
    if (/^[a-zA-Z]{2,}$/.test(content)) {
      app = content;
      return;
    }

    // Numbers with k or +/- signs
    if (/\d+(\.\d+)?[kK]/.test(content) || /[+-]/.test(content)) {
      const parts = content.split(/(?=[+-])/);

      parts.forEach(part => {
        part = part.trim();

        if (part.startsWith('+')) {
          const m = part.match(/\d+(\.\d+)?[kK]/);
          if (m) {
            const val = parseFloat(m[0].replace(/k/i, ''));
            service += Math.round(val * 1000);
          }
        } else if (part.startsWith('-')) {
          const m = part.match(/\d+(\.\d+)?[kK]/);
          if (m) {
            const val = parseFloat(m[0].replace(/k/i, ''));
            service += Math.round(val * 1000);
            const txt = part.replace(m[0], '').replace('-', '').trim();
            if (txt) serviceNotes.push(txt);
          } else {
            serviceNotes.push(part.replace('-', '').trim());
          }
        } else if (/\d+(\.\d+)?[kK]/.test(part)) {
          const m = part.match(/\d+(\.\d+)?[kK]/)[0];
          const val = parseFloat(m.replace(/k/i, ''));
          const amount = Math.round(val * 1000);

          if (!foundPrice) {
            price = amount;
            foundPrice = true;
          } else {
            service += amount;
          }
        }
      });
    }
  });

  return [sdt, app, price, service, serviceNotes.join(', ')];
}

/**
 * Format date time as DD/MM/YYYY HH:MM
 */
function formatDateTime(dt) {
  if (!dt) return '';
  const date = new Date(dt);
  const pad = n => n.toString().padStart(2, '0');
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  return `${day}/${month}/${year} ${hour}:${minute}`;
}

/**
 * Format date time in reverse as HH:MM DD/MM/YYYY
 */
function formatDateTimeReverse(dt) {
  if (!dt) return '';
  const date = new Date(dt);
  const pad = n => n.toString().padStart(2, '0');
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  return `${hour}:${minute} ${day}/${month}/${year}`;
}

/**
 * Generate Google Calendar event link
 */
function generateEventLink(eventId, calendarId) {
  const combined = `${eventId} ${calendarId}`;
  const encoded = Utilities.base64EncodeWebSafe(combined);
  return `https://www.google.com/calendar/event?eid=${encoded}`;
}

/**
 * Test function to verify all functions work
 */
function testFunctions() {
  Logger.log('Testing parseDescription:');
  const desc = '- 0123456789\n- tt\n- 379k\n- +15k dịch vụ';
  const result = parseDescription(desc);
  Logger.log(`Phone: ${result[0]}, App: ${result[1]}, Price: ${result[2]}, Service: ${result[3]}, Note: ${result[4]}`);

  Logger.log('\nTesting formatDateTime:');
  Logger.log(formatDateTime(new Date('2025-07-15T14:30:00')));

  Logger.log('\nAll room configs:');
  Object.keys(CONFIG).forEach(room => {
    Logger.log(`- ${room}`);
  });
}
