/**
 * Command Service — Process Telegram Commands
 */

import { checkHibp } from './hibp.js';
import { checkGoogleAlerts } from './googleAlerts.js';
import { checkNews } from './news.js';
import { checkPhishing } from './phishing.js';
import { generateLetter } from './letter.js';

const COMMANDS = {
  '/start': 'Selamat datang di Kujaga! 🛡️\n\nSaya Guardian Digital 24/7 Anda.\n\nKirimkan nama Anda untuk memulai patroli keamanan.',
  '/help': '📋 Perintah Kujaga:\n\n/monitor - Cek keamanan Anda\n/breach [email] - Cek breach email\n/brand [nama] - Pantau mentions\n/status - Status langganan\n/help - Menu bantuan',
  '/status': '✅ Kujaga aktif dan patroli!'
};

export async function processUserCommand(text, user) {
  const command = text?.trim().toLowerCase();

  if (COMMANDS[command]) {
    return COMMANDS[command];
  }

  // Process as name for monitoring
  if (text && text.length > 2 && !text.startsWith('/')) {
    return await runMonitoring(text, user);
  }

  return 'Ketik /help untuk melihat perintah yang tersedia.';
}

async function runMonitoring(name, user) {
  const results = [];

  // Check brand mentions
  const alerts = await checkGoogleAlerts(name);
  results.push(`📰 Brand mentions: ${alerts.new_mentions}`);

  if (alerts.alert_needed) {
    results.push('⚠️ Ada mentions negatif yang perlu diperhatikan.');
  }

  // Generate monitoring report
  results.push('\n🛡️ Kujaga sedang patroli untuk Anda...');
  results.push('✅ Monitoring aktif. Anda akan menerima update otomatis.');

  return results.join('\n');
}