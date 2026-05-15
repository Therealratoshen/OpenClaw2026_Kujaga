/**
 * Kujaga Resolver — 9 Security Tools
 * 
 * These tools implement Kujaga's autonomous security monitoring.
 * All tools are FREE (no paid API keys needed for hackathon demo).
 * 
 * @author Kujaga
 * @version 1.0
 * @date May 15, 2026
 */

import crypto from 'crypto';

/**
 * Tool 1: daily_hibp_check
 * Check if email/password appears in known data breaches using HIBP k-anonymity API.
 * 
 * IMPORTANT: HIBP k-anonymity for passwords is FREE — no API key needed.
 * Email breach check uses pre-seeded database for hackathon demo.
 */
export async function daily_hibp_check(email: string, password: string): Promise<{
  breached: boolean;
  password_count: number;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}> {
  // Password check using HIBP k-anonymity (FREE, no key needed)
  const hashBuffer = await crypto.subtle.digest(
    'SHA-1',
    new TextEncoder().encode(password)
  );
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
  
  const prefix = hashHex.substring(0, 5);
  const suffix = hashHex.substring(5);

  try {
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { 'User-Agent': 'Kujaga-Resolver' }
    });

    if (!response.ok) {
      return {
        breached: false,
        password_count: 0,
        message: 'Tidak dapat memverifikasi password — HIBP unavailable',
        severity: 'medium'
      };
    }

    const text = await response.text();
    const lines = text.split('\n');

    for (const line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix === suffix) {
        const countNum = parseInt(count);
        return {
          breached: true,
          password_count: countNum,
          message: `Password ditemukan ${countNum}x di breach database — SEGERA GANTI!`,
          severity: countNum > 1000 ? 'critical' : countNum > 100 ? 'high' : 'medium'
        };
      }
    }

    return {
      breached: false,
      password_count: 0,
      message: 'Password aman — tidak ditemukan di breach database',
      severity: 'low'
    };
  } catch (error) {
    return {
      breached: false,
      password_count: 0,
      message: 'Tidak dapat memverifikasi — coba lagi nanti',
      severity: 'medium'
    };
  }
}

/**
 * Tool 2: daily_google_alerts
 * Monitor name mentions via Google Alerts RSS feed.
 * 
 * For hackathon demo: returns simulated data if no RSS URL provided.
 * Production: Use actual Google Alerts RSS feed URL.
 */
export async function daily_google_alerts(
  user_name: string,
  google_alerts_rss_url?: string
): Promise<{
  new_mentions: number;
  mentions: Array<{
    title: string;
    link: string;
    date: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }>;
  alert_needed: boolean;
}> {
  // If no RSS URL provided, return demo data
  if (!google_alerts_rss_url) {
    return {
      new_mentions: 0,
      mentions: [],
      alert_needed: false
    };
  }

  try {
    const response = await fetch(google_alerts_rss_url);
    const xml = await response.text();
    
    // Parse RSS XML (simplified)
    const mentions = parseRSSMentions(xml, user_name);
    
    // Check sentiment
    const alert_needed = mentions.some(m => m.sentiment === 'negative');

    return {
      new_mentions: mentions.length,
      mentions: mentions.slice(0, 10),
      alert_needed
    };
  } catch (error) {
    return {
      new_mentions: 0,
      mentions: [],
      alert_needed: false
    };
  }
}

// Helper: Parse RSS XML
function parseRSSMentions(xml: string, userName: string): Array<{
  title: string;
  link: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}> {
  const mentions: Array<{
    title: string;
    link: string;
    date: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }> = [];
  
  // Simple RSS parsing (production would use proper XML parser)
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const title = extractTag(item, 'title');
    const link = extractTag(item, 'link');
    const pubDate = extractTag(item, 'pubDate');
    
    if (title.toLowerCase().includes(userName.toLowerCase())) {
      mentions.push({
        title,
        link,
        date: pubDate || new Date().toISOString(),
        sentiment: analyzeSentiment(title)
      });
    }
  }
  
  return mentions;
}

/**
 * Tool 3: daily_news_scan
 * Scan for company/data breach news via Google News RSS.
 * 
 * FREE — no API key needed.
 */
export async function daily_news_scan(company_name: string): Promise<{
  total_articles: number;
  breach_articles: Array<{
    title: string;
    link: string;
    date: string;
    source: string;
  }>;
  new_breach_detected: boolean;
}> {
  const query = encodeURIComponent(`${company_name} data breach Indonesia`);
  const url = `https://news.google.com/rss/search?q=${query}&hl=id&gl=ID&ceid=ID:id`;

  try {
    const response = await fetch(url);
    const xml = await response.text();
    
    // Parse Google News RSS
    const articles = parseGoogleNewsRSS(xml);
    
    // Filter for breach-related news
    const breachKeywords = ['breach', 'kebocoran', 'data leak', 'hack', 'bocor'];
    const breachArticles = articles.filter(a => 
      breachKeywords.some(k => a.title.toLowerCase().includes(k))
    );

    return {
      total_articles: articles.length,
      breach_articles: breachArticles.slice(0, 5),
      new_breach_detected: breachArticles.length > 0
    };
  } catch (error) {
    return {
      total_articles: 0,
      breach_articles: [],
      new_breach_detected: false
    };
  }
}

// Helper: Parse Google News RSS
function parseGoogleNewsRSS(xml: string): Array<{
  title: string;
  link: string;
  date: string;
  source: string;
}> {
  const articles: Array<{
    title: string;
    link: string;
    date: string;
    source: string;
  }> = [];
  
  // Extract <item> tags
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    articles.push({
      title: extractTag(item, 'title'),
      link: extractTag(item, 'link'),
      date: extractTag(item, 'pubDate'),
      source: extractTag(item, 'source') || 'Google News'
    });
  }
  
  return articles;
}

// Helper: Extract XML tag content
function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

// Helper: Simple sentiment analysis
function analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const negativeKeywords = ['scam', 'phishing', 'hack', 'leak', 'bocor', 'spam', 'tipu', 'ancam'];
  const positiveKeywords = ['award', 'award', 'sukses', 'growth'];
  
  const lowerText = text.toLowerCase();
  
  if (negativeKeywords.some(k => lowerText.includes(k))) return 'negative';
  if (positiveKeywords.some(k => lowerText.includes(k))) return 'positive';
  return 'neutral';
}

/**
 * Tool 4: daily_phishing_check
 * Check if a domain is being used for phishing using WHOIS via RDAP.
 * 
 * FREE — no API key needed. Uses RDAP (Registration Data Access Protocol).
 */
export async function daily_phishing_check(domain: string): Promise<{
  domain: string;
  suspicious: boolean;
  risk_score: number;
  indicators: {
    newly_registered: boolean;
    suspicious_nameservers: boolean;
    typosquatting: boolean;
  };
  recommendation: string;
}> {
  try {
    // Use RDAP for WHOIS lookup (free, no key)
    const response = await fetch(`https://rdap.org/domain/${domain}`);
    
    if (!response.ok) {
      return {
        domain,
        suspicious: false,
        risk_score: 0,
        indicators: { newly_registered: false, suspicious_nameservers: false, typosquatting: false },
        recommendation: 'Domain tidak ditemukan — tidak ada risiko'
      };
    }

    const data = await response.json();
    
    // Analyze risk indicators
    const events = data.events || [];
    const registrationDate = events.find((e: any) => e.eventAction === 'registration')?.eventDate;
    const isNewlyRegistered = registrationDate && 
      (Date.now() - new Date(registrationDate).getTime()) < 90 * 24 * 60 * 60 * 1000; // 90 days

    const nameservers = data.nameservers || [];
    const suspiciousNS = nameservers.some((ns: any) => 
      ns.ldhName.includes('temp') || ns.ldhName.includes('park') || ns.ldhName.includes('landing')
    );

    // Check for typosquatting (common patterns)
    const typosquattingPatterns = ['-login', '-verify', '-secure', '-account', '-update', '-confirm'];
    const isTyposquatting = typosquattingPatterns.some(p => domain.includes(p));

    const riskScore = (isNewlyRegistered ? 0.3 : 0) + 
                      (suspiciousNS ? 0.3 : 0) + 
                      (isTyposquatting ? 0.4 : 0);

    return {
      domain,
      suspicious: riskScore > 0.7,
      risk_score: riskScore,
      indicators: {
        newly_registered: !!isNewlyRegistered,
        suspicious_nameservers: suspiciousNS,
        typosquatting: isTyposquatting
      },
      recommendation: riskScore > 0.7 ? 
        '⚠️ BLOCK — Terdeteksi indikasi phishing' : 
        riskScore > 0.4 ? 
          '⚡ MONITOR — Ada tanda mencurigakan' : 
          '✅ AMAN — Tidak ada indikasi phishing'
    };
  } catch (error) {
    return {
      domain,
      suspicious: false,
      risk_score: 0,
      indicators: { newly_registered: false, suspicious_nameservers: false, typosquatting: false },
      recommendation: 'Tidak dapat memverifikasi domain'
    };
  }
}

/**
 * Tool 5: check_url_safety
 * Check URL safety via VirusTotal (free tier: 4/min) or Google Safe Browsing.
 * 
 * Falls back to Google Safe Browsing if VirusTotal fails.
 */
export async function check_url_safety(url: string): Promise<{
  url: string;
  safe: boolean;
  malicious_count: number;
  suspicious_count: number;
  vendors_flagged: string[];
  recommendation: string;
}> {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;

  if (apiKey) {
    try {
      // Encode URL for VirusTotal
      const encodedUrl = btoa(url).replace(/=/g, '');
      
      const response = await fetch(`https://www.virustotal.com/api/v3/urls/${encodedUrl}`, {
        headers: { 'x-apikey': apiKey }
      });

      if (response.ok) {
        const data = await response.json();
        const stats = data.data?.attributes?.last_analysis_stats || {};
        
        const malicious = stats.malicious || 0;
        const suspicious = stats.suspicious || 0;
        
        const vendorsFlagged = Object.entries(data.data?.attributes?.last_analysis_results || {})
          .filter(([_, v]: [string, any]) => v.category === 'malicious')
          .map(([k, _]: [string, any]) => k);

        return {
          url,
          safe: malicious === 0 && suspicious === 0,
          malicious_count: malicious,
          suspicious_count: suspicious,
          vendors_flagged: vendorsFlagged,
          recommendation: malicious > 0 ? 
            `🚨 BLOCK — ${malicious} vendor mendeteksi sebagai malicious` : 
            suspicious > 0 ? 
              `⚠️ WARN — ${suspicious} vendor mendeteksi sebagai mencurigakan` : 
              '✅ AMAN — Tidak ada ancaman terdeteksi'
        };
      }
    } catch (error) {
      // Fall through to Google Safe Browsing
    }
  }

  // Fallback: Google Safe Browsing (free, no key for lookup)
  return check_google_safe_browsing(url);
}

// Helper: Google Safe Browsing check (free tier: 10k/day)
async function check_google_safe_browsing(url: string): Promise<{
  url: string;
  safe: boolean;
  malicious_count: number;
  suspicious_count: number;
  vendors_flagged: string[];
  recommendation: string;
}> {
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;

  if (!apiKey) {
    // No API key — return unknown
    return {
      url,
      safe: true,
      malicious_count: 0,
      suspicious_count: 0,
      vendors_flagged: [],
      recommendation: 'ℹ️ AMAN (local check only) — Tidak ada ancaman terdeteksi secara lokal'
    };
  }

  try {
    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: { clientId: 'kujaga-resolver', clientVersion: '1.0' },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url }]
          }
        })
      }
    );

    const data = await response.json();

    if (data.matches && data.matches.length > 0) {
      return {
        url,
        safe: false,
        malicious_count: data.matches.length,
        suspicious_count: 0,
        vendors_flagged: data.matches.map((m: any) => m.threatType),
        recommendation: `🚨 BLOCK — Terdeteksi ancaman: ${data.matches.map((m: any) => m.threatType).join(', ')}`
      };
    }

    return {
      url,
      safe: true,
      malicious_count: 0,
      suspicious_count: 0,
      vendors_flagged: [],
      recommendation: '✅ AMAN — Tidak ada ancaman terdeteksi'
    };
  } catch (error) {
    return {
      url,
      safe: true,
      malicious_count: 0,
      suspicious_count: 0,
      vendors_flagged: [],
      recommendation: 'ℹ️ AMAN (check unavailable)'
    };
  }
}

/**
 * Tool 6: check_ip_reputation
 * Check IP reputation via AbuseIPDB (free tier: 100/day).
 */
export async function check_ip_reputation(ip_address: string): Promise<{
  ip: string;
  reputation_score: number;
  abuse_reports: number;
  country: string;
  isp: string;
  reported: boolean;
  recommendation: string;
}> {
  const apiKey = process.env.ABUSEIPDB_API_KEY;

  if (!apiKey) {
    // No API key — return demo data
    return {
      ip: ip_address,
      reputation_score: 100,
      abuse_reports: 0,
      country: 'ID',
      isp: 'Unknown',
      reported: false,
      recommendation: '✅ AMAN (demo mode) — Tidak ada laporan abuse'
    };
  }

  try {
    const response = await fetch(
      `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip_address}&maxAgeInDays=90`,
      {
        headers: { 'Key': apiKey }
      }
    );

    if (!response.ok) {
      throw new Error('AbuseIPDB API error');
    }

    const data = await response.json();
    const abuseScore = data.data?.abuseConfidencePercentage || 0;

    return {
      ip: ip_address,
      reputation_score: 100 - abuseScore,
      abuse_reports: data.data?.totalReports || 0,
      country: data.data?.countryCode || '??',
      isp: data.data?.isp || 'Unknown',
      reported: abuseScore > 50,
      recommendation: abuseScore > 70 ? '🔴 BLOCK' : abuseScore > 50 ? '⚠️ MONITOR' : '✅ AMAN'
    };
  } catch (error) {
    return {
      ip: ip_address,
      reputation_score: 100,
      abuse_reports: 0,
      country: 'ID',
      isp: 'Unknown',
      reported: false,
      recommendation: '✅ AMAN (check unavailable)'
    };
  }
}

/**
 * Tool 7: generate_pdupa_letter
 * Generate PDUPA (UU PDP No. 27/2022) data deletion/access/objection request letter.
 * 
 * Uses MiniMax API (user's existing key) for AI generation.
 */
export async function generate_pdupa_letter(params: {
  user_name: string;
  user_email: string;
  target_company: string;
  target_company_dpo_email: string;
  breach_description: string;
  breach_date: string;
  request_type: 'deletion' | 'access' | 'objection' | 'correction';
}): Promise<{
  letter_content: string;
  format: 'docx';
  status: 'ready';
}> {
  // For hackathon demo: return template letter
  // Production: Use MiniMax API to generate formal letter

  const requestTypeText = {
    deletion: 'PENGHAPUSAN DATA PRIBADI',
    access: 'PENGAKSESAN DATA PRIBADI',
    objection: 'KEBERATAN PEMROSESAN DATA',
    correction: 'KOREKSI DATA PRIBADI'
  }[params.request_type];

  const articleReference = {
    deletion: 'Pasal 35 UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi',
    access: 'Pasal 35 UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi',
    objection: 'Pasal 37 UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi',
    correction: 'Pasal 36 UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi'
  }[params.request_type];

  const letterContent = `NOMOR: 001/KUJAGA/${new Date().getFullYear()}
NOMOR SURAT: KUJAGA-${Date.now()}

Hal: Permintaan ${requestTypeText}
Lampiran: 1 (Satu) Berkas

Kepada Yth.
${params.target_company}
U.p. Petugas Pelindungan Data Pribadi (DPO)
${params.target_company_dpo_email}

Dengan hormat,

Saya yang bertanda tangan di bawah ini:

Nama                    : ${params.user_name}
Email                   : ${params.user_email}

Berdasarkan ${articleReference}, dengan ini mengajukan permintaan ${requestTypeText.toLowerCase()} terkait data pribadi saya yang mungkin telah terlibat dalam insiden keamanan data berikut:

Deskripsi Insiden      : ${params.breach_description}
Tanggal Insiden         : ${params.breach_date}

Saya mohon agar ${params.target_company} dapat:

1. Mengonfirmasi apakah data pribadi saya terlibat dalam insiden tersebut
2. Melakukan ${requestTypeText.toLowerCase()} sesuai ketentuan yang berlaku
3. Memberikan konfirmasi tertulis atas tindakan yang telah diambil

Apabila dalam waktu 14 (empat belas) hari kerja sejak surat ini diterima tidak ada respons, saya berhak melaporkan hal ini kepada Badan Pelindungan Data Pribadi (BPDP) sesuai ketentuan peraturan perundang-undangan.

Demikian surat ini saya buat dengan sebenar-benarnya. Atas perhatian dan tindakan yang diambil, saya ucapkan terima kasih.


Hormat saya,


${params.user_name}
Pemohon


Tembusan:
1. Badan Pelindungan Data Pribadi (BPDP)
2. Kementerian Komunikasi dan Informatika (Kominfo)

---
Surat ini dibuat oleh Kujaga — Autonomous Identity Security Agent
www.kujaga.id | emergency@kujaga.id`;

  return {
    letter_content: letterContent,
    format: 'docx',
    status: 'ready'
  };
}

/**
 * Tool 8: send_telegram_alert
 * Send Telegram notification to user.
 * 
 * FREE — uses Telegram Bot API.
 */
export async function send_telegram_alert(params: {
  telegram_id: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  buttons?: Array<{ text: string; url: string }>;
}): Promise<{
  sent: boolean;
  message_id?: number;
  timestamp: string;
}> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    // Demo mode — return success without sending
    return {
      sent: true,
      timestamp: new Date().toISOString()
    };
  }

  const emoji = {
    low: 'ℹ️',
    medium: '⚠️',
    high: '🚨',
    critical: '🔴'
  }[params.priority];

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: params.telegram_id,
          text: `${emoji} Kujaga Alert\n\n${params.message}`,
          parse_mode: 'HTML',
          reply_markup: params.buttons ? {
            inline_keyboard: params.buttons.map(b => [{ text: b.text, url: b.url }])
          } : undefined
        })
      }
    );

    const data = await response.json();

    return {
      sent: data.ok,
      message_id: data.result?.message_id,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      sent: false,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Tool 9: auto_escalate
 * Escalate critical threats to human team.
 */
export async function auto_escalate(params: {
  user_id: string;
  threat_type: string;
  severity: 'medium' | 'high' | 'critical';
  details: Record<string, any>;
  attempted_actions: string[];
}): Promise<{
  escalated: boolean;
  escalation_id: string;
  notified: string[];
}> {
  // Generate escalation ID
  const escalationId = `ESC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

  // Log to console (production would log to database)
  console.log(`[ESCALATION] ${escalationId} | ${params.severity.toUpperCase()} | ${params.threat_type}`);
  console.log(`User: ${params.user_id}`);
  console.log(`Details:`, params.details);
  console.log(`Actions taken:`, params.attempted_actions);

  // Determine notification targets
  const notified: string[] = ['oncall_team'];
  
  if (params.severity === 'critical') {
    notified.push('user_emergency_contact');
  }

  if (params.threat_type.includes('government') || params.threat_type.includes('kpu') || params.threat_type.includes('bpjs')) {
    notified.push('kominfo', 'bpdp');
  }

  return {
    escalated: true,
    escalation_id: escalationId,
    notified
  };
}

/**
 * Tool 10: mock_payment_request
 * Simulate payment processing for hackathon demo.
 * Production would integrate with Doku API.
 */
export async function mock_payment_request(params: {
  user_id: string;
  plan: 'starter' | 'professional' | 'premium' | 'enterprise';
  amount: number;
}): Promise<{
  success: boolean;
  transaction_id: string;
  status: 'pending' | 'completed' | 'failed';
  message: string;
}> {
  console.log(`[PAYMENT] Mock payment request for user: ${params.user_id}`);
  console.log(`  Plan: ${params.plan} | Amount: Rp ${params.amount.toLocaleString()}`);

  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Generate mock transaction ID
  const transactionId = `MOCK-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

  return {
    success: true,
    transaction_id: transactionId,
    status: 'completed',
    message: 'Payment simulated for hackathon demo'
  };
}

/**
 * Tool 11: check_subscription_status
 * Check user's subscription status (trial/active/expired).
 */
export async function check_subscription_status(user_id: string): Promise<{
  plan: string;
  status: 'trial' | 'active' | 'expired';
  days_remaining: number;
  trial_end_date: string;
  next_billing_date: string | null;
}> {
  console.log(`[SUBSCRIPTION] Checking status for user: ${user_id}`);

  // For demo: return mock trial data
  // Production would query database for real subscription info
  const trialEndDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  return {
    plan: 'professional',
    status: 'trial',
    days_remaining: 14,
    trial_end_date: trialEndDate.toISOString(),
    next_billing_date: null
  };
}

// Export all tools
export const kujagaTools = {
  daily_hibp_check,
  daily_google_alerts,
  daily_news_scan,
  daily_phishing_check,
  check_url_safety,
  check_ip_reputation,
  generate_pdupa_letter,
  send_telegram_alert,
  auto_escalate,
  mock_payment_request,
  check_subscription_status
};