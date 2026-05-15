/**
 * Telegram Service
 */

const TELEGRAM_API = 'https://api.telegram.org/bot';

async function sendRequest(method, params = {}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN not configured');
  }

  const response = await fetch(`${TELEGRAM_API}${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  const data = await response.json();
  
  if (!data.ok) {
    throw new Error(`Telegram API error: ${data.description}`);
  }

  return data.result;
}

export async function sendTelegramMessage(chatId, text, buttons = null) {
  const params = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML'
  };

  if (buttons) {
    params.reply_markup = {
      inline_keyboard: buttons.map(b => [{ text: b.text, url: b.url }])
    };
  }

  return sendRequest('sendMessage', params);
}

export async function sendAlert(chatId, threat, severity) {
  const emoji = {
    low: 'ℹ️',
    medium: '⚠️',
    high: '🚨',
    critical: '🔴'
  }[severity] || '⚠️';

  const text = `${emoji} <b>Kujaga Alert</b>\n\n${threat}`;

  return sendTelegramMessage(chatId, text);
}

export async function setWebhook(url) {
  return sendRequest('setWebhook', { url });
}

export async function getMe() {
  return sendRequest('getMe');
}