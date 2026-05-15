const JSON_HEADERS = { 'Content-Type': 'application/json' };

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Ugyldig JSON' }) };
  }

  const { name, phone, email, address, services, message } = body;

  if (!name || !email || !address || !message) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Mangler påkrævede felter' }) };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram env vars mangler');
    return { statusCode: 500, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Server ikke konfigureret' }) };
  }

  const now = new Date().toLocaleString('da-DK', {
    timeZone: 'Europe/Copenhagen',
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const lines = [
    '🌿 *Ny forespørgsel — Silke Total Service*',
    '',
    `*Navn:* ${name}`,
    phone ? `*Telefon:* ${phone}` : '*Telefon:* —',
    `*Email:* ${email}`,
    `*Adresse:* ${address}`,
    '',
    `*Ydelser:* ${services || '—'}`,
    '',
    `*Besked:*\n${message}`,
    '',
    `_Sendt: ${now}_`,
  ];

  const resp = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        parse_mode: 'Markdown',
      }),
    }
  );

  if (!resp.ok) {
    const err = await resp.text();
    console.error('Telegram API fejl:', err);
    return { statusCode: 502, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Telegram fejl' }) };
  }

  return {
    statusCode: 200,
    headers: JSON_HEADERS,
    body: JSON.stringify({ ok: true }),
  };
};
