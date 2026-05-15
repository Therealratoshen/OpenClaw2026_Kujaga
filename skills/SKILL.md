---
name: kujaga-resolver
description: >
  Kujaga — Autonomous Identity Security Agent for Indonesian public figures.
  Monitors 24/7 with zero triggers after one-time setup. Protects against:
  - Email/password breaches (HIBP k-anonymity)
  - Impersonation & defamation (Google Alerts + News)
  - Phishing & malicious URLs (VirusTotal + WHOIS)
  - Company data breaches (pre-seeded DB for demo)
  - Subscription/payment management (mock for hackathon)

  Use when: user asks about identity security, breach check, threat detection,
  PDUPA letter generation, subscription status, or Kujaga monitoring.

  Tools (11 total):
  1. daily_hibp_check — Check email/password breach via HIBP k-anonymity (FREE)
  2. daily_google_alerts — Monitor name mentions via RSS
  3. daily_news_scan — Scan for company breach news
  4. daily_phishing_check — Check suspicious domains
  5. check_url_safety — Check URL safety via VirusTotal
  6. check_ip_reputation — Check IP reputation via AbuseIPDB
  7. generate_pdupa_letter — Generate PDUPA deletion request letter
  8. send_telegram_alert — Send alert via Telegram
  9. auto_escalate — Escalate critical threats
  10. mock_payment_request — Simulate payment (hackathon demo)
  11. check_subscription_status — Check trial/active/expired status

  Agent: kujaga-resolver (single resolver, stateless)
  Language: Indonesian (primary), English (technical)
  Mode: Background monitoring + on-demand tools
  Heartbeat: Every 6 hours
---

# Kujaga Resolver — Skill Manual

## Overview

**Kujaga** is an autonomous identity security agent. User sets up once, Kujaga protects forever.

### Kujaga's 11 Tools ("Hands")

| # | Tool | Purpose | Free? |
|---|---|---|---|
| 1 | `daily_hibp_check` | Email/password breach check | ✅ (k-anonymity) |
| 2 | `daily_google_alerts` | Name mention monitoring | ✅ (RSS) |
| 3 | `daily_news_scan` | Company breach news scan | ✅ (RSS) |
| 4 | `daily_phishing_check` | Phishing domain detection | ✅ (WHOIS) |
| 5 | `check_url_safety` | URL safety check | ✅ (VirusTotal) |
| 6 | `check_ip_reputation` | IP reputation check | ✅ (AbuseIPDB) |
| 7 | `generate_pdupa_letter` | Generate PDUPA letter | ✅ (MiniMax) |
| 8 | `send_telegram_alert` | Send Telegram notification | ✅ (Bot API) |
| 9 | `auto_escalate` | Escalate critical threats | ✅ (built-in) |
| 10 | `mock_payment_request` | Simulate payment | ✅ (mock) |
| 11 | `check_subscription_status` | Check subscription | ✅ (mock)

---

## Tool 1: daily_hibp_check

### Purpose
Check if email/password appears in known data breaches using HIBP k-anonymity API.

### API
- **Password Check**: FREE — No API key needed
- **Endpoint**: `https://api.pwnedpasswords.com/range/{hash_prefix}`
- **Method**: SHA-1 hash, send first 5 chars only

### Implementation

```typescript
// k-anonymity: only send first 5 chars of SHA-1 hash
// HIBP returns all matching hash suffixes
// Client checks locally if full hash matches

async function daily_hibp_check(email: string, password: string) {
  // Password check (FREE, no key)
  const hashBuffer = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(password));
  const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  const prefix = hashHex.substring(0, 5);
  const suffix = hashHex.substring(5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await response.text();
  const lines = text.split('\n');

  for (const line of lines) {
    const [hashSuffix, count] = line.split(':');
    if (hashSuffix === suffix) {
      return {
        breached: true,
        password_count: parseInt(count),
        message: `Password ditemukan ${count}x di breach database`
      };
    }
  }

  return { breached: false, password_count: 0, message: 'Password aman' };
}
```

### Input
- `email`: string — user's email address
- `password`: string — password to check (will be hashed client-side)

### Output
```json
{
  "breached": true,
  "password_count": 12345,
  "message": "Password ditemukan 12345x di breach database — GANTI SEKARANG",
  "severity": "critical"
}
```

### Severity Rules
- `count > 1000`: critical
- `count > 100`: high
- `count > 0`: medium

---

## Tool 2: daily_google_alerts

### Purpose
Monitor name mentions via Google Alerts RSS feed.

### API
- **Endpoint**: `https://www.google.com/alerts/feeds/{user_id}/{alert_id}.xml`
- **Method**: RSS feed polling

### Implementation

```typescript
async function daily_google_alerts(user_name: string, google_alerts_rss_url: string) {
  // Poll RSS feed for new mentions
  const response = await fetch(google_alerts_rss_url);
  const xml = await response.text();
  
  // Parse RSS XML
  const mentions = parseRSS(xml);
  
  // Filter for relevant mentions
  const relevant = mentions.filter(m => 
    m.title.toLowerCase().includes(user_name.toLowerCase()) ||
    m.description.toLowerCase().includes(user_name.toLowerCase())
  );

  return {
    new_mentions: relevant.length,
    mentions: relevant.slice(0, 10),
    sentiment: analyzeSentiment(relevant)
  };
}
```

### Input
- `user_name`: string — user's full name
- `google_alerts_rss_url`: string — RSS feed URL from Google Alerts

### Output
```json
{
  "new_mentions": 3,
  "mentions": [
    {
      "title": "Public figure XYZ diancam",
      "link": "https://news.com/article",
      "date": "2026-05-15",
      "sentiment": "negative"
    }
  ],
  "alert_needed": true
}
```

---

## Tool 3: daily_news_scan

### Purpose
Scan for company/data breach news via Google News RSS.

### API
- **Endpoint**: `https://news.google.com/rss/search?q={query}&hl=id&gl=ID`
- **Method**: RSS feed polling

### Implementation

```typescript
async function daily_news_scan(company_name: string) {
  const query = encodeURIComponent(`${company_name} data breach`);
  const url = `https://news.google.com/rss/search?q=${query}&hl=id&gl=ID&ceid=ID:id`;
  
  const response = await fetch(url);
  const xml = await response.text();
  const articles = parseGoogleNewsRSS(xml);

  // Filter for breach-related news
  const breachNews = articles.filter(a =>
    a.title.toLowerCase().includes('breach') ||
    a.title.toLowerCase().includes('kebocoran') ||
    a.title.toLowerCase().includes('data leak')
  );

  return {
    total_articles: articles.length,
    breach_articles: breachNews,
    latest_breach: breachNews[0] || null
  };
}
```

### Input
- `company_name`: string — company name to monitor

### Output
```json
{
  "total_articles": 5,
  "breach_articles": [
    {
      "title": "Tokopedia breach 2020: 15 juta akun bocor",
      "link": "https://news.google.com/article",
      "date": "2026-05-14",
      "source": "Kompas"
    }
  ],
  "new_breach_detected": true
}
```

---

## Tool 4: daily_phishing_check

### Purpose
Check if a domain is being used for phishing using WHOIS.

### API
- **Endpoint**: `https://rdap.org/domain/{domain}`
- **Method**: WHOIS lookup via RDAP

### Implementation

```typescript
async function daily_phishing_check(domain: string) {
  // Check WHOIS via RDAP (free, no key)
  const response = await fetch(`https://rdap.org/domain/${domain}`);
  
  if (!response.ok) {
    return { suspicious: false, reason: 'Domain not found in RDAP' };
  }

  const data = await response.json();
  
  // Analyze for phishing indicators
  const indicators = {
    newly_registered: isRecentlyRegistered(data.events),
    suspicious_nameservers: checkNameServers(data.nameservers),
    privacy_hidden: checkRegistrar(data.registrar)
  };

  const risk_score = calculateRiskScore(indicators);

  return {
    domain,
    suspicious: risk_score > 0.7,
    risk_score,
    indicators,
    registered_date: data.events?.find(e => e.eventAction === 'registration')?.eventDate,
    registrar: data.registrar
  };
}
```

### Input
- `domain`: string — domain to check (e.g., "tokopedia.com")

### Output
```json
{
  "domain": "tokopedia-login.com",
  "suspicious": true,
  "risk_score": 0.85,
  "indicators": {
    "newly_registered": true,
    "suspicious_nameservers": true,
    "typosquatting": true
  },
  "recommendation": "BLOCK — mirip dengan Tokopedia, kemungkinan phishing"
}
```

---

## Tool 5: check_url_safety

### Purpose
Check URL safety via VirusTotal API (free tier: 4 requests/min).

### API
- **Endpoint**: `https://www.virustotal.com/api/v3/urls`
- **Method**: POST URL, get analysis
- **Rate Limit**: 4/min (free tier)

### Implementation

```typescript
async function check_url_safety(url: string) {
  // Encode URL for VirusTotal
  const encodedUrl = btoa(url).replace(/=/g, '');
  
  const response = await fetch(`https://www.virustotal.com/api/v3/urls/${encodedUrl}`, {
    headers: { 'x-apikey': process.env.VIRUSTOTAL_API_KEY }
  });

  if (!response.ok) {
    // Fallback: check Google Safe Browsing
    return check_google_safe_browsing(url);
  }

  const data = await response.json();
  const stats = data.data.attributes.last_analysis_stats;

  return {
    url,
    safe: stats.malicious === 0 && stats.suspicious === 0,
    malicious_count: stats.malicious,
    suspicious_count: stats.suspicious,
    vendors_flagged: Object.keys(data.data.attributes.last_analysis_results)
      .filter(k => data.data.attributes.last_analysis_results[k].category === 'malicious')
  };
}
```

### Input
- `url`: string — URL to check

### Output
```json
{
  "url": "https://tokopedia-login.malicious.com",
  "safe": false,
  "malicious_count": 15,
  "suspicious_count": 3,
  "vendors_flagged": ["Microsoft", "Google", "Norton"],
  "recommendation": "BLOCK — 15 vendor mendeteksi sebagai malicious"
}
```

---

## Tool 6: check_ip_reputation

### Purpose
Check IP reputation via AbuseIPDB (free tier: 100/day).

### API
- **Endpoint**: `https://api.abuseipdb.com/api/v2/check`
- **Method**: GET with IP address
- **Rate Limit**: 100/day (free tier)

### Implementation

```typescript
async function check_ip_reputation(ip_address: string) {
  const response = await fetch(
    `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip_address}&maxAgeInDays=90`,
    {
      headers: { 'Key': process.env.ABUSEIPDB_API_KEY }
    }
  );

  const data = await response.json();
  const abuse_score = data.data.abuseConfidencePercentage;

  return {
    ip: ip_address,
    reputation_score: 100 - abuse_score,
    abuse_reports: data.data.totalReports,
    country: data.data.countryCode,
    isp: data.data.isp,
    domain: data.data.domain,
    reported: abuse_score > 50,
    recommendation: abuse_score > 70 ? 'BLOCK' : 'MONITOR'
  };
}
```

### Input
- `ip_address`: string — IP address to check

### Output
```json
{
  "ip": "192.168.1.1",
  "reputation_score": 85,
  "abuse_reports": 5,
  "country": "ID",
  "isp": "Telkom Indonesia",
  "reported": false,
  "recommendation": "MONITOR"
}
```

---

## Tool 7: generate_pdupa_letter

### Purpose
Generate PDUPA (UU PDP No. 27/2022) data deletion request letter.

### AI
- **Model**: MiniMax via OpenClaw
- **Language**: Indonesian formal

### Implementation

```typescript
async function generate_pdupa_letter(params: {
  user_name: string;
  user_email: string;
  target_company: string;
  target_company_dpo_email: string;
  breach_description: string;
  breach_date: string;
  request_type: 'deletion' | 'access' | 'objection' | 'correction';
}) {
  // Use MiniMax to generate formal letter
  const prompt = `Generate a formal PDUPA (UU No. 27 Tahun 2022) data deletion/access/objection request letter.

User Details:
- Name: ${params.user_name}
- Email: ${params.user_email}

Target Company:
- Name: ${params.target_company}
- DPO Email: ${params.target_company_dpo_email}

Breach Information:
- Description: ${params.breach_description}
- Date: ${params.breach_date}

Request Type: ${params.request_type}

The letter must:
1. Be in formal Indonesian (Bahasa Indonesia resmi)
2. Reference relevant PDUPA articles (Pasal 35, 36, 37, 38)
3. Include date, signature block
4. Be ready to send

Format as formal letter with:
- Letter header (nomor, lampiran, hal)
- Body paragraphs
- Closing with signature
- CC: KOMINFO if breach involves government`;

  const letter = await minimax_generate(prompt);

  return {
    letter_content: letter,
    format: 'docx',
    signature_block: true,
    cc_kominfo: params.target_company.includes('Pemerintah') || params.target_company.includes('KPU') || params.target_company.includes('BPJS')
  };
}
```

### Input
```json
{
  "user_name": "Budi Santoso",
  "user_email": "budi@email.com",
  "target_company": "Tokopedia",
  "target_company_dpo_email": "dpo@tokopedia.com",
  "breach_description": "Data breach 2020: email, password, nama",
  "breach_date": "2020-04-01",
  "request_type": "deletion"
}
```

### Output
```json
{
  "letter_content": "Nomor: 001/KUJAGA/2026\n\nDengan hormat,\n\nSaya yang bertanda tangan di bawah ini...\n\n[Full letter content]",
  "format": "docx",
  "status": "ready"
}
```

---

## Tool 8: send_telegram_alert

### Purpose
Send Telegram notification to user.

### API
- **Endpoint**: `https://api.telegram.org/bot{TOKEN}/sendMessage`
- **Method**: POST

### Implementation

```typescript
async function send_telegram_alert(params: {
  telegram_id: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  buttons?: { text: string; url: string }[];
}) {
  const emoji = {
    low: 'ℹ️',
    medium: '⚠️',
    high: '🚨',
    critical: '🔴'
  }[params.priority];

  const response = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
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
}
```

### Input
```json
{
  "telegram_id": "123456789",
  "message": "Budi, ada breach baru terdeteksi di Tokopedia. Email kamu mungkin bocor. Saya sudah siapkan surat permintaan. Lihat dashboard?",
  "priority": "high",
  "buttons": [
    { "text": "📄 Lihat Surat", "url": "https://kujaga.app/dashboard" },
    { "text": "✅ Konfirmasi", "url": "https://kujaga.app/confirm" }
  ]
}
```

### Output
```json
{
  "sent": true,
  "message_id": 123,
  "timestamp": "2026-05-15T00:45:00Z"
}
```

---

## Tool 9: auto_escalate

### Purpose
Escalate critical threats to human team.

### Triggers
- Severity: critical
- User not responding for 24 hours
- Threat involves government/institutional data

### Implementation

```typescript
async function auto_escalate(params: {
  user_id: string;
  threat_type: string;
  severity: 'medium' | 'high' | 'critical';
  details: object;
  attempted_actions: string[];
}) {
  // Log escalation to database
  await supabase.from('escalations').insert({
    user_id: params.user_id,
    threat_type: params.threat_type,
    severity: params.severity,
    details: params.details,
    attempted_actions: params.attempted_actions,
    escalated_at: new Date().toISOString(),
    status: 'pending_review'
  });

  // Send to on-call team (placeholder)
  await notify_oncall_team({
    title: `[${params.severity.toUpperCase()}] ${params.threat_type}`,
    details: params.details,
    user_id: params.user_id
  });

  // If critical, also notify authorities (if applicable)
  if (params.severity === 'critical' && params.threat_type.includes('government')) {
    await notify_kominfo({
      incident: params.details,
      reported_by: 'Kujaga Automated System'
    });
  }

  return {
    escalated: true,
    escalation_id: generate_escalation_id(),
    notified: ['oncall_team', 'user_emergency_contact']
  };
}
```

### Input
```json
{
  "user_id": "user_123",
  "threat_type": "government_data_breach",
  "severity": "critical",
  "details": {
    "company": "KPU",
    "breach_date": "2023-07-15",
    "records_affected": "252000000",
    "data_types": ["name", "NIK", "address"]
  },
  "attempted_actions": [
    "Generated PDUPA letter",
    "Sent Telegram alert (no response)",
    "Attempted follow-up (no response)"
  ]
}
```

### Output
```json
{
  "escalated": true,
  "escalation_id": "ESC-20260515-001",
  "notified": ["oncall_team", "user_emergency_contact", "kominfo"]
}
```

---

## Autonomous Loop

### Monitoring Schedule

| Time | Action | Tool |
|---|---|---|
| 06:00 | Morning patrol | daily_hibp_check |
| 09:00 | Brand check | daily_google_alerts |
| 12:00 | Company news | daily_news_scan |
| 15:00 | Phishing sweep | daily_phishing_check |
| 18:00 | Evening report | send_telegram_alert |
| 00:00 | Midnight scan | daily_hibp_check |

### Decision Tree

```
THREAT DETECTED
    │
    ├─ severity = critical
    │       ├─ generate_pdupa_letter
    │       ├─ send_telegram_alert (priority: critical)
    │       └─ auto_escalate
    │
    ├─ severity = high
    │       ├─ generate_pdupa_letter
    │       └─ send_telegram_alert (priority: high)
    │
    └─ severity = medium
            ├─ log threat
            └─ send_telegram_alert (priority: medium)
```

---

## Status Codes

| Status | Meaning |
|---|---|
| `monitoring` | Active monitoring |
| `alert_sent` | Alert sent to user |
| `letter_generated` | PDUPA letter ready |
| `escalated` | Escalated to human team |
| `resolved` | Threat resolved |

---

## Error Handling

| Error | Response |
|---|---|
| API rate limit | Wait and retry with backoff |
| API down | Skip tool, log, continue |
| Invalid input | Return error message |
| Unknown threat | Log for review, notify team |

---

*Last updated: May 15, 2026*