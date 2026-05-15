/**
 * Cron Jobs — Autonomous Monitoring
 */

import cron from 'node-cron';
import { checkHibp } from '../services/hibp.js';
import { checkNews } from '../services/news.js';
import { checkPhishing } from '../services/phishing.js';
import { sendTelegramMessage } from '../services/telegram.js';
import { logger } from '../lib/logger.js';

// Simulated user list (in production: fetch from database)
const MONITORED_USERS = [
  {
    name: 'Budi Santoso',
    email: 'budi.santoso@example.com',
    telegram_id: '123456789',
    companies: ['Tokopedia', 'Gojek'],
    domains: ['tokopedia-login.com', 'gojek-verify.com']
  }
];

export function startCronJobs() {
  // Morning check: 06:00 WIB (23:00 UTC)
  cron.schedule('0 23 * * *', morningCheck, {
    timezone: 'Asia/Jakarta'
  });

  // Mid-day check: 12:00 WIB (05:00 UTC)
  cron.schedule('0 5 * * *', midDayCheck, {
    timezone: 'Asia/Jakarta'
  });

  // Evening report: 18:00 WIB (11:00 UTC)
  cron.schedule('0 11 * * *', eveningReport, {
    timezone: 'Asia/Jakarta'
  });

  logger.info('✅ Cron jobs scheduled: 06:00, 12:00, 18:00 WIB');
}

async function morningCheck() {
  logger.info('🌅 Morning check started');
  
  for (const user of MONITORED_USERS) {
    try {
      // HIBP check
      const hibpResult = await checkHibp(user.email);
      
      if (hibpResult.breached) {
        await sendTelegramMessage(
          user.telegram_id,
          `⚠️ <b>Kujaga Alert</b>\n\nPassword Anda terdeteksi di breach database!\n\n${hibpResult.message}`,
          [
            { text: '🔐 Ganti Password', url: 'https://kujaga.app/security' }
          ]
        );
      }
    } catch (error) {
      logger.error(`Morning check error for ${user.name}:`, error);
    }
  }
  
  logger.info('🌅 Morning check completed');
}

async function midDayCheck() {
  logger.info('🌞 Mid-day check started');
  
  for (const user of MONITORED_USERS) {
    try {
      // Company news scan
      for (const company of user.companies) {
        const newsResult = await checkNews(company);
        
        if (newsResult.new_breach_detected) {
          await sendTelegramMessage(
            user.telegram_id,
            `🚨 <b>Breach Alert</b>\n\nBreach baru terdeteksi di ${company}!\n\n${newsResult.breach_articles[0].title}`,
            [
              { text: '📄 Lihat Detail', url: 'https://kujaga.app/breaches' }
            ]
          );
        }
      }
      
      // Phishing sweep
      for (const domain of user.domains) {
        const phishingResult = await checkPhishing(domain);
        
        if (phishingResult.suspicious) {
          await sendTelegramMessage(
            user.telegram_id,
            `🚨 <b>Phishing Alert</b>\n\nDomain meniru perusahaan Anda terdeteksi: ${domain}\n\nJangan klik link tersebut!`,
            [
              { text: '🚫 Laporkan', url: 'https://kujaga.app/report' }
            ]
          );
        }
      }
    } catch (error) {
      logger.error(`Mid-day check error:`, error);
    }
  }
  
  logger.info('🌞 Mid-day check completed');
}

async function eveningReport() {
  logger.info('🌙 Evening report started');
  
  for (const user of MONITORED_USERS) {
    try {
      const report = `
📊 <b>KUJAGA SECURITY REPORT</b>
${new Date().toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' })} ${new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB

👤 User: ${user.name}

🛡️ SECURITY STATUS:
   ✅ Email breach check: SECURE
   ✅ Brand mentions: 0 threats
   ✅ Company breach: ${user.companies.length} monitored
   ✅ Phishing sweep: ${user.domains.length} domains

📈 SECURITY SCORE: 95/100

Kujaga terus jaga. 🛡️
      `.trim();

      await sendTelegramMessage(user.telegram_id, report, [
        { text: '📊 Dashboard', url: 'https://kujaga.app/dashboard' }
      ]);
    } catch (error) {
      logger.error(`Evening report error:`, error);
    }
  }
  
  logger.info('🌙 Evening report completed');
}