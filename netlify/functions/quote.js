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

  const { name, phone, email, address, services, message, images } = body;

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

  const hasImages = Array.isArray(images) && images.length > 0;

  const lines = [
    '\u{1F33F} *Ny forespørgsel — Silkehave*',
    '',
    `*Navn:* ${name}`,
    phone ? `*Telefon:* ${phone}` : '*Telefon:* —',
    `*Email:* ${email}`,
    `*Adresse:* ${address}`,
    '',
    `*Ydelser:* ${services || '—'}`,
    '',
    `*Besked:*\n${message}`,
    hasImages ? `\n_${images.length} billede${images.length > 1 ? 'r' : ''} vedhæftet_` : '',
    '',
    `_Sendt: ${now}_`,
  ].filter((l) => l !== undefined);

  const msgResp = await fetch(
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

  if (!msgResp.ok) {
    const err = await msgResp.text();
    console.error('Telegram sendMessage fejl:', err);
    return { statusCode: 502, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Telegram fejl' }) };
  }

  if (hasImages) {
    for (const b64 of images.slice(0, 3)) {
      try {
        const buffer = Buffer.from(b64, 'base64');
        const fd = new FormData();
        fd.append('chat_id', String(chatId));
        fd.append('photo', new Blob([buffer], { type: 'image/jpeg' }), 'foto.jpg');
        await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
          method: 'POST',
          body: fd,
        });
      } catch (err) {
        console.error('Telegram sendPhoto fejl:', err);
      }
    }
  }

  return {
    statusCode: 200,
    headers: JSON_HEADERS,
    body: JSON.stringify({ ok: true }),
  };
};
