/**
 * Kujaga Resolver — Autonomous Loop Demo
 * 
 * This script demonstrates Kujaga's autonomous monitoring loop.
 * Run with: npx ts-node demo-loop.ts
 * 
 * @date May 15, 2026
 */

import {
  daily_hibp_check,
  daily_google_alerts,
  daily_news_scan,
  daily_phishing_check,
  check_url_safety,
  generate_pdupa_letter,
  send_telegram_alert,
  auto_escalate,
  mock_payment_request,
  check_subscription_status
} from './tools/index.js';

async function runAutonomousLoop() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🛡️  KUJAGA AUTONOMOUS SECURITY AGENT — Demo Loop');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Simulated user profile
  const user = {
    name: 'Budi Santoso',
    email: 'budi.santoso@example.com',
    telegram_id: '123456789',
    companies: ['Tokopedia', 'Gojek'],
    monitoring_targets: ['tokopedia-login.com', 'gojek-verify.com']
  };

  console.log(`👤 User: ${user.name}`);
  console.log(`📧 Email: ${user.email}`);
  console.log(`🏢 Monitoring: ${user.companies.join(', ')}`);
  console.log('\n───────────────────────────────────────────────────────────\n');

  // ═══════════════════════════════════════════════════════════════
  // LOOP 1: Morning HIBP Check (06:00 WIB)
  // ═══════════════════════════════════════════════════════════════
  console.log('🌅 [06:00 WIB] Morning Security Check — HIBP Password Scan');
  console.log('───────────────────────────────────────────────────────────');

  const hibpResult = await daily_hibp_check(user.email, 'password123');
  console.log(`\n📊 HIBP Result:`);
  console.log(`   Breached: ${hibpResult.breached ? '⚠️ YES' : '✅ NO'}`);
  console.log(`   Occurrences: ${hibpResult.password_count}`);
  console.log(`   Severity: ${hibpResult.severity.toUpperCase()}`);
  console.log(`   Message: ${hibpResult.message}`);

  if (hibpResult.breached) {
    console.log('\n🚨 ACTION: Password compromised — alerting user...');
    await send_telegram_alert({
      telegram_id: user.telegram_id,
      message: `${user.name}, password kamu terdeteksi di breach database! Segera ganti password. Kujaga sudah pantau.`,
      priority: hibpResult.severity as any,
      buttons: [
        { text: '🔐 Ganti Password Sekarang', url: 'https://kujaga.app/security' },
        { text: '📄 Lihat Detail Breach', url: 'https://kujaga.app/breaches' }
      ]
    });
    console.log('   ✅ Telegram alert sent\n');
  }

  // ═══════════════════════════════════════════════════════════════
  // LOOP 2: Brand Monitoring (09:00 WIB)
  // ═══════════════════════════════════════════════════════════════
  console.log('\n🌅 [09:00 WIB] Brand Monitoring — Google Alerts Scan');
  console.log('───────────────────────────────────────────────────────────');

  const alertsResult = await daily_google_alerts(user.name);
  console.log(`\n📊 Google Alerts Result:`);
  console.log(`   New mentions: ${alertsResult.new_mentions}`);
  console.log(`   Alert needed: ${alertsResult.alert_needed ? '⚠️ YES' : '✅ NO'}`);

  if (alertsResult.mentions.length > 0) {
    alertsResult.mentions.forEach(m => {
      console.log(`   📰 "${m.title}" (${m.sentiment})`);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // LOOP 3: Company News Scan (12:00 WIB)
  // ═══════════════════════════════════════════════════════════════
  console.log('\n🌅 [12:00 WIB] Company News Scan — Breach Monitoring');
  console.log('───────────────────────────────────────────────────────────');

  for (const company of user.companies) {
    console.log(`\n   Checking: ${company}...`);
    const newsResult = await daily_news_scan(company);
    console.log(`   Total articles: ${newsResult.total_articles}`);
    console.log(`   Breach articles: ${newsResult.breach_articles.length}`);

    if (newsResult.new_breach_detected) {
      console.log(`   🚨 NEW BREACH DETECTED!`);
      newsResult.breach_articles.forEach(a => {
        console.log(`      📰 ${a.title}`);
        console.log(`         Source: ${a.source} | Date: ${a.date}`);
      });

      // Generate PDUPA letter
      console.log(`\n   📄 Generating PDUPA letter...`);
      const letter = await generate_pdupa_letter({
        user_name: user.name,
        user_email: user.email,
        target_company: company,
        target_company_dpo_email: `dpo@${company.toLowerCase()}.com`,
        breach_description: newsResult.breach_articles[0].title,
        breach_date: newsResult.breach_articles[0].date,
        request_type: 'deletion'
      });

      console.log(`   ✅ Letter generated (${letter.format})`);
      console.log(`   📋 Status: ${letter.status}`);

      // Send alert
      await send_telegram_alert({
        telegram_id: user.telegram_id,
        message: `${user.name}, ada breach baru di ${company}! Kujaga sudah siapkan surat permintaan penghapusan data. Lihat dashboard untuk detail.`,
        priority: 'high',
        buttons: [
          { text: '📄 Lihat Surat', url: 'https://kujaga.app/letter' },
          { text: '📊 Dashboard', url: 'https://kujaga.app/dashboard' }
        ]
      });
      console.log('   ✅ Telegram alert sent');
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // LOOP 4: Phishing Sweep (15:00 WIB)
  // ═══════════════════════════════════════════════════════════════
  console.log('\n🌅 [15:00 WIB] Phishing Sweep — Domain & URL Check');
  console.log('───────────────────────────────────────────────────────────');

  for (const domain of user.monitoring_targets) {
    console.log(`\n   Checking domain: ${domain}...`);
    const phishingResult = await daily_phishing_check(domain);
    console.log(`   Suspicious: ${phishingResult.suspicious ? '⚠️ YES' : '✅ NO'}`);
    console.log(`   Risk Score: ${(phishingResult.risk_score * 100).toFixed(0)}%`);
    console.log(`   Recommendation: ${phishingResult.recommendation}`);

    if (phishingResult.suspicious) {
      console.log(`\n   🚨 PHISHING DOMAIN DETECTED!`);
      console.log(`      Indicators:`);
      console.log(`        - Newly registered: ${phishingResult.indicators.newly_registered}`);
      console.log(`        - Suspicious NS: ${phishingResult.indicators.suspicious_nameservers}`);
      console.log(`        - Typosquatting: ${phishingResult.indicators.typosquatting}`);

      // Check URL safety
      console.log(`\n   🔍 Checking URL safety...`);
      const urlSafety = await check_url_safety(`https://${domain}`);
      console.log(`   Safe: ${urlSafety.safe ? '✅ YES' : '🚨 NO'}`);
      console.log(`   Malicious vendors: ${urlSafety.malicious_count}`);
      console.log(`   Recommendation: ${urlSafety.recommendation}`);

      // Alert user
      await send_telegram_alert({
        telegram_id: user.telegram_id,
        message: `⚠️ ${user.name}, ada domain phishing yang meniru perusahaan kamu: ${domain}\n\nKujaga sudah blokir dan laporkan. Jangan klik link tersebut!`,
        priority: 'critical',
        buttons: [
          { text: '🚫 Laporkan Phishing', url: 'https://kujaga.app/report' },
          { text: '🛡️ Keamanan Saya', url: 'https://kujaga.app/security' }
        ]
      });
      console.log('   ✅ Telegram alert sent');

      // Auto-escalate
      await auto_escalate({
        user_id: user.email,
        threat_type: 'phishing_domain',
        severity: 'high',
        details: { domain, risk_score: phishingResult.risk_score },
        attempted_actions: ['domain_checked', 'url_safety_checked', 'user_alerted']
      });
      console.log('   ✅ Auto-escalated to on-call team');
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // LOOP 5: Evening Report (18:00 WIB)
  // ═══════════════════════════════════════════════════════════════
  console.log('\n🌅 [18:00 WIB] Evening Security Report');
  console.log('───────────────────────────────────────────────────────────');

  const report = `
📊 KUJAGA SECURITY REPORT — ${new Date().toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' })} ${new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB

👤 User: ${user.name}

🛡️ SECURITY STATUS:
   ✅ Email breach check: ${hibpResult.breached ? 'VULNERABLE' : 'SECURE'}
   ✅ Brand mentions: ${alertsResult.new_mentions} (${alertsResult.alert_needed ? 'need attention' : 'clean'})
   ✅ Company breach scan: ${user.companies.length} companies checked
   ✅ Phishing sweep: ${user.monitoring_targets.length} domains checked

📈 SECURITY SCORE: ${hibpResult.breached ? '75/100' : '95/100'}

💡 RECOMMENDATIONS:
   1. ${hibpResult.breached ? '⚠️ Change compromised password immediately' : '✅ Password secure, keep monitoring'}
   2. ${alertsResult.alert_needed ? '⚠️ Review negative mentions about your brand' : '✅ No brand threats detected'}
   3. ✅ Enable 2FA on all accounts

Kujaga terus jaga. 🛡️
`;

  console.log(report);
  
  await send_telegram_alert({
    telegram_id: user.telegram_id,
    message: report,
    priority: 'low',
    buttons: [
      { text: '📊 View Full Dashboard', url: 'https://kujaga.app/dashboard' }
    ]
  });
  console.log('✅ Evening report sent');

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('✅ KUJAGA AUTONOMOUS LOOP COMPLETE');
  console.log('═══════════════════════════════════════════════════════════');

  // ═══════════════════════════════════════════════════════════════
  // BONUS: Payment Demo (for hackathon)
  // ═══════════════════════════════════════════════════════════════
  console.log('\n💳 [BONUS] Payment System Demo — DOKU MCP Integration');
  console.log('───────────────────────────────────────────────────────────');

  const subStatus = await check_subscription_status(user.email);
  console.log(`\n📊 Subscription Status:`);
  console.log(`   Plan: ${subStatus.plan.toUpperCase()}`);
  console.log(`   Status: ${subStatus.status.toUpperCase()}`);
  console.log(`   Days Remaining: ${subStatus.days_remaining}`);
  console.log(`   Trial End: ${new Date(subStatus.trial_end_date).toLocaleDateString('id-ID')}`);

  if (subStatus.status === 'trial') {
    console.log('\n💡 Upgrading to Professional plan...');
    const payment = await mock_payment_request({
      user_id: user.email,
      plan: 'professional',
      amount: 199000
    });
    console.log(`\n📊 Payment Result:`);
    console.log(`   Success: ${payment.success ? '✅ YES' : '❌ NO'}`);
    console.log(`   Transaction ID: ${payment.transaction_id}`);
    console.log(`   Status: ${payment.status.toUpperCase()}`);
    console.log(`   Message: ${payment.message}`);
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('✅ PAYMENT DEMO COMPLETE');
  console.log('═══════════════════════════════════════════════════════════');
}

// Run demo
runAutonomousLoop().catch(console.error);