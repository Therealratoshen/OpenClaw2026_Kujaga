/**
 * Kujaga Resolver — Autonomous Loop Demo (JavaScript)
 * Run with: node demo-loop.mjs
 */

const HIBP_API = 'https://api.pwnedpasswords.com/range/';
const GOOGLE_ALERTS_RSS = 'https://www.google.com alerts?output=atom&q=';
const NEWS_RSS = 'https://news.google.com/rss/search?q=';

// Simulated user profile
const user = {
  name: 'Budi Santoso',
  email: 'budi.santoso@example.com',
  telegram_id: '123456789',
  companies: ['Tokopedia', 'Gojek'],
  monitoring_targets: ['tokopedia-login.com', 'gojek-verify.com']
};

// ═══════════════════════════════════════════════════════════════
// TOOL 1: HIBP Password Check (FREE, no key)
// ═══════════════════════════════════════════════════════════════
async function daily_hibp_check(email, password) {
  console.log('   Checking HIBP database...');
  
  // Simulate breach check
  const mockBreached = email.includes('budi');
  
  return {
    breached: mockBreached,
    password_count: mockBreached ? 3 : 0,
    message: mockBreached 
      ? 'Email ditemukan di 3 breach database (Tokopedia 2020, LinkedIn 2021, Adobe 2013)'
      : 'Password tidak ditemukan di breach database manapun',
    severity: mockBreached ? 'high' : 'low'
  };
}

// ═══════════════════════════════════════════════════════════════
// TOOL 2: Google Alerts (FREE, RSS)
// ═══════════════════════════════════════════════════════════════
async function daily_google_alerts(name) {
  console.log('   Scanning Google Alerts...');
  
  // Simulate mentions
  const mentions = [
    { title: 'Budi Santoso launches new fintech startup', sentiment: 'positive', source: 'TechCrunch' },
    { title: 'Budi Santoso responds to market rumors', sentiment: 'neutral', source: 'Detik' }
  ];
  
  return {
    new_mentions: mentions.length,
    alert_needed: mentions.some(m => m.sentiment === 'negative'),
    mentions
  };
}

// ═══════════════════════════════════════════════════════════════
// TOOL 3: News Scan (FREE, RSS)
// ═══════════════════════════════════════════════════════════════
async function daily_news_scan(company) {
  console.log(`   Scanning news for: ${company}...`);
  
  // Simulate breach articles
  const breachNews = [
    {
      title: `${company} data breach 2020: 15 juta akun bocor`,
      link: `https://news.google.com/article/${Date.now()}`,
      date: '2020-05-01',
      source: 'Kompas'
    }
  ];
  
  return {
    total_articles: 5,
    breach_articles: breachNews,
    new_breach_detected: true
  };
}

// ═══════════════════════════════════════════════════════════════
// TOOL 4: Phishing Check (FREE, WHOIS)
// ═══════════════════════════════════════════════════════════════
async function daily_phishing_check(domain) {
  console.log(`   Checking domain: ${domain}...`);
  
  // Simulate phishing detection
  const isPhishing = domain.includes('login') || domain.includes('verify');
  
  return {
    suspicious: isPhishing,
    risk_score: isPhishing ? 0.85 : 0.1,
    indicators: {
      newly_registered: isPhishing,
      suspicious_nameservers: isPhishing,
      typosquatting: isPhishing
    },
    recommendation: isPhishing ? '🚨 LAPORKAN — Domain meniru perusahaan kamu' : '✅ AMAN'
  };
}

// ═══════════════════════════════════════════════════════════════
// TOOL 5: PDUPA Letter Generation (MiniMax AI)
// ═══════════════════════════════════════════════════════════════
async function generate_pdupa_letter(params) {
  console.log('   📄 Generating PDUPA letter via MiniMax AI...');
  
  // Simulate AI generation
  await new Promise(r => setTimeout(r, 500));
  
  const letter = `
NOMOR: 001/KUJAGA/${new Date().getFullYear()}
HAL: Permintaan Penghapusan Data Pribadi

Kepada Yth.
Tim Pengelola Data ${params.target_company}
Via: ${params.target_company_dpo_email}

Dengan hormat,

Saya, ${params.user_name} (${params.user_email}), dengan ini mengajukan permintaan 
penghapusan data pribadi saya yang telah terungkap dalam kejadian kebocoran data 
yang dilaporkan terjadi pada ${params.breach_date} sebagaimana diberitakan:

"${params.breach_description}"

Berdasarkan Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP),
Pasal 15 ayat (1), saya berhak meminta penghapusan data pribadi saya dari sistem 
${params.target_company}.

Saya mengajukan permintaan tersebut karena:
1. Data pribadi saya tidak lagi diperlukan oleh ${params.target_company}
2. Terdapat risiko penyalahgunaan data pribadi saya
3. Saya tidak memberikan persetujuan untuk penyimpanan lebih lanjut

Saya tunggu tanggapan dalam 1x24 jam sesuai ketentuan UU PDP.
Jika tidak ada respons, saya akan escalate ke KOMINFO dan BPDP.

Hormat saya,

${params.user_name}
Tanggal: ${new Date().toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' })}
`;

  return {
    format: 'PDF',
    status: 'ready',
    letter_text: letter,
    letter_id: `PDUPA-${Date.now()}`
  };
}

// ═══════════════════════════════════════════════════════════════
// TOOL 6: Telegram Alert (FREE, Bot API)
// ═══════════════════════════════════════════════════════════════
async function send_telegram_alert(params) {
  console.log(`   📱 Sending Telegram alert (${params.priority})...`);
  console.log(`   Message: ${params.message.substring(0, 50)}...`);
  
  if (params.buttons) {
    console.log(`   Buttons: ${params.buttons.map(b => b.text).join(', ')}`);
  }
  
  return {
    sent: true,
    message_id: `MSG-${Date.now()}`,
    timestamp: new Date().toISOString()
  };
}

// ═══════════════════════════════════════════════════════════════
// TOOL 7: Auto Escalate
// ═══════════════════════════════════════════════════════════════
async function auto_escalate(params) {
  console.log(`   🚨 Escalating: ${params.threat_type} (${params.severity})`);
  console.log(`   Notified: on-call team, KOMINFO, BPDP`);
  
  return {
    escalated: true,
    escalation_id: `ESC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-001`,
    notified: ['oncall_team', 'kominfo', 'bpdp']
  };
}

// ═══════════════════════════════════════════════════════════════
// TOOL 8: Payment Request (Mock for hackathon)
// ═══════════════════════════════════════════════════════════════
async function mock_payment_request(params) {
  console.log(`   💳 Processing payment: ${params.plan} (Rp ${params.amount.toLocaleString()})...`);
  
  await new Promise(r => setTimeout(r, 500));
  
  return {
    success: true,
    transaction_id: `MOCK-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`,
    status: 'completed',
    message: 'Payment simulated for hackathon demo'
  };
}

// ═══════════════════════════════════════════════════════════════
// TOOL 9: Subscription Status (Mock)
// ═══════════════════════════════════════════════════════════════
async function check_subscription_status(user_id) {
  console.log(`   📊 Checking subscription for: ${user_id}...`);
  
  return {
    plan: 'professional',
    status: 'trial',
    days_remaining: 14,
    trial_end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    next_billing_date: null
  };
}

// ═══════════════════════════════════════════════════════════════
// MAIN: Autonomous Loop
// ═══════════════════════════════════════════════════════════════
async function runAutonomousLoop() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🛡️  KUJAGA AUTONOMOUS SECURITY AGENT — Demo Loop');
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log(`👤 User: ${user.name}`);
  console.log(`📧 Email: ${user.email}`);
  console.log(`🏢 Monitoring: ${user.companies.join(', ')}`);
  console.log('\n───────────────────────────────────────────────────────────\n');

  // ─────────────────────────────────────────────────────────
  // LOOP 1: Morning HIBP Check (06:00 WIB)
  // ─────────────────────────────────────────────────────────
  console.log('🌅 [06:00 WIB] Morning Security Check — HIBP Password Scan');
  console.log('───────────────────────────────────────────────────────────');

  const hibpResult = await daily_hibp_check(user.email, 'password123');
  console.log(`\n📊 HIBP Result:`);
  console.log(`   Breached: ${hibpResult.breached ? '⚠️ YES' : '✅ NO'}`);
  console.log(`   Severity: ${hibpResult.severity.toUpperCase()}`);
  console.log(`   Message: ${hibpResult.message}`);

  if (hibpResult.breached) {
    console.log('\n🚨 ACTION: Password compromised — alerting user...');
    await send_telegram_alert({
      telegram_id: user.telegram_id,
      message: `⚠️ ${user.name}, password kamu terdeteksi di breach database!`,
      priority: hibpResult.severity
    });
  }

  // ─────────────────────────────────────────────────────────
  // LOOP 2: Brand Monitoring (09:00 WIB)
  // ─────────────────────────────────────────────────────────
  console.log('\n🌅 [09:00 WIB] Brand Monitoring — Google Alerts Scan');
  console.log('───────────────────────────────────────────────────────────');

  const alertsResult = await daily_google_alerts(user.name);
  console.log(`\n📊 Google Alerts Result:`);
  console.log(`   New mentions: ${alertsResult.new_mentions}`);
  alertsResult.mentions.forEach(m => {
    console.log(`   📰 "${m.title}" (${m.sentiment})`);
  });

  // ─────────────────────────────────────────────────────────
  // LOOP 3: Company News Scan (12:00 WIB)
  // ─────────────────────────────────────────────────────────
  console.log('\n🌅 [12:00 WIB] Company News Scan — Breach Monitoring');
  console.log('───────────────────────────────────────────────────────────');

  for (const company of user.companies) {
    console.log(`\n   Checking: ${company}...`);
    const newsResult = await daily_news_scan(company);

    if (newsResult.new_breach_detected) {
      console.log(`   🚨 NEW BREACH DETECTED!`);
      
      // Generate PDUPA letter via MiniMax
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
      console.log(`   Letter ID: ${letter.letter_id}`);

      // Send alert
      await send_telegram_alert({
        telegram_id: user.telegram_id,
        message: `🚨 ${user.name}, ada breach baru di ${company}!`,
        priority: 'high'
      });
    }
  }

  // ─────────────────────────────────────────────────────────
  // LOOP 4: Phishing Sweep (15:00 WIB)
  // ─────────────────────────────────────────────────────────
  console.log('\n🌅 [15:00 WIB] Phishing Sweep — Domain Check');
  console.log('───────────────────────────────────────────────────────────');

  for (const domain of user.monitoring_targets) {
    const phishingResult = await daily_phishing_check(domain);

    if (phishingResult.suspicious) {
      console.log(`   🚨 PHISHING DOMAIN DETECTED: ${domain}`);
      
      // Auto-escalate
      await auto_escalate({
        user_id: user.email,
        threat_type: 'phishing_domain',
        severity: 'high',
        details: { domain, risk_score: phishingResult.risk_score },
        attempted_actions: ['domain_checked', 'user_alerted']
      });
    }
  }

  // ─────────────────────────────────────────────────────────
  // LOOP 5: Evening Report (18:00 WIB)
  // ─────────────────────────────────────────────────────────
  console.log('\n🌅 [18:00 WIB] Evening Security Report');
  console.log('───────────────────────────────────────────────────────────');

  console.log(`
📊 KUJAGA SECURITY REPORT — ${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB

👤 User: ${user.name}

🛡️ SECURITY STATUS:
   ✅ Email breach: ${hibpResult.breached ? 'VULNERABLE' : 'SECURE'}
   ✅ Brand mentions: ${alertsResult.new_mentions} checked
   ✅ Company breach: ${user.companies.length} companies monitored
   ✅ Phishing sweep: ${user.monitoring_targets.length} domains checked

📈 SECURITY SCORE: ${hibpResult.breached ? '75/100' : '95/100'}

Kujaga terus jaga. 🛡️
  `);

  await send_telegram_alert({
    telegram_id: user.telegram_id,
    message: '📊 Daily security report sent. No critical issues.',
    priority: 'low'
  });

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('✅ KUJAGA AUTONOMOUS LOOP COMPLETE');
  console.log('═══════════════════════════════════════════════════════════');

  // ─────────────────────────────────────────────────────────
  // BONUS: Payment Demo
  // ─────────────────────────────────────────────────────────
  console.log('\n💳 [BONUS] Payment System Demo — DOKU MCP Integration');
  console.log('───────────────────────────────────────────────────────────');

  const subStatus = await check_subscription_status(user.email);
  console.log(`\n📊 Subscription Status:`);
  console.log(`   Plan: ${subStatus.plan.toUpperCase()}`);
  console.log(`   Status: ${subStatus.status.toUpperCase()}`);
  console.log(`   Days Remaining: ${subStatus.days_remaining}`);

  if (subStatus.status === 'trial') {
    console.log('\n💡 Upgrading to Professional plan...');
    const payment = await mock_payment_request({
      user_id: user.email,
      plan: 'professional',
      amount: 199000
    });
    console.log(`\n📊 Payment Result:`);
    console.log(`   Success: ✅ YES`);
    console.log(`   Transaction ID: ${payment.transaction_id}`);
    console.log(`   Status: ${payment.status.toUpperCase()}`);
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('✅ PAYMENT DEMO COMPLETE');
  console.log('═══════════════════════════════════════════════════════════');
}

// Run demo
runAutonomousLoop().catch(console.error);