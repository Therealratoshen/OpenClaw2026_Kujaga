# Kujaga — Demo Video Script (2 Minutes)

## Demo Setup

**Product:** Kujaga — Autonomous Identity Security Agent
**Tagline:** "Kujaga menjaga namamu, data kamu, dan reputasi kamu."
**Target:** Indonesian public figures (celebrity, influencer, executive)
**Tech Stack:** OpenClaw (agent), MiniMax (AI), Telegram (alerts), Supabase (DB)

---

## Pre-Demo Checklist

- [ ] Telegram bot configured and connected
- [ ] Supabase tables created (user_profiles, threats, documents, companies)
- [ ] Sample breach data seeded
- [ ] Demo user profile set up (Budi Santoso)
- [ ] PDUPA letter template ready

---

## Demo Script (2:00)

### SCENE 1: Problem Statement (15 sec)

**[SCREEN: Black with white text]**

> "Setiap hari, data pribadi public figure Indonesia bocor."
> "Tokopedia, BPJS, BSI — jutaan data tersebar."
> "Tanpa perlindungan, nama dan reputasi mereka taruhannya."

**[VOICE]**: Narator (Bahasa Indonesia, calm but serious)

---

### SCENE 2: Solution Introduction (15 sec)

**[SCREEN: Kujaga logo animation — shield icon with "KUJAGA" text]**

> "Kujaga — Guardian Digital 24/7."
> "Sekali setup, kamu tenang selamanya."
> "Zero triggers. Kujaga yang jaga."

**[TRANSITION]**: Slide up

---

### SCENE 3: User Setup (20 sec)

**[SCREEN: Telegram bot — /start command]**

**Narasi:**
> "User daftar lewat Telegram. Masukkan nama, email, perusahaan yang dipantau."

**[DEMO]**:
1. Show Telegram message: "Selamat datang di Kujaga!"
2. Show setup wizard: "Masukkan nama lengkap"
3. Show company selection: "Pilih perusahaan yang ingin dipantau"
4. Show confirmation: "Setup complete! Kujaga mulai patroli."

**[VOICE]**: "Cukup sekali. Kujaga yang kerja."

---

### SCENE 4: Autonomous Monitoring (30 sec)

**[SCREEN: Monitoring dashboard — security score, latest checks]**

**Narasi:**
> "Setiap 6 jam, Kujaga patroli otomatis."

**[DEMO] — Show 5 monitoring loops:**

1. **06:00 — HIBP Password Check**
   - Screen: "Password checked: ✅ SECURE"
   - Voice: "Cek breach database — password aman"

2. **09:00 — Google Alerts Scan**
   - Screen: "Brand mentions: 0 threats"
   - Voice: "Pantau nama di seluruh internet"

3. **12:00 — Company News Scan**
   - Screen: "Tokopedia breach 2020 — DETECTED"
   - Voice: "Deteksi breach baru di perusahaanmu"

4. **15:00 — Phishing Domain Check**
   - Screen: "tokopedia-login.com — 🚨 PHISHING DETECTED"
   - Voice: "Blokir domain meniru perusahaanmu"

5. **18:00 — Evening Report**
   - Screen: Telegram message with daily summary
   - Voice: "Laporan harian ke Telegram"

**[TRANSITION]**: Slide up

---

### SCENE 5: Breach Response (25 sec)

**[SCREEN: Detected breach → Letter generation → Telegram alert]**

**Narasi:**
> "Deteksi breach? Kujaga langsung action."

**[DEMO]**:

1. **Breach Detected**
   - Screen: "🚨 NEW THREAT: Tokopedia 2020 breach"
   - Details: "15M accounts leaked — email, password, name"

2. **Letter Generation**
   - Screen: "📄 Generating PDUPA letter..."
   - Show MiniMax generating formal letter
   - Voice: "Surat resmi UU PDP otomatis dibuat"

3. **Letter Preview**
   - Screen: Show formal letter with:
     - Nomor: 001/KUJAGA/2026
     - Hal: Permintaan Penghapusan Data Pribadi
     - Target: Tokopedia (dpo@tokopedia.com)
     - Signature block

4. **User Alert**
   - Screen: Telegram message
   - "🔴 Kujaga Alert: Breach baru terdeteksi. Surat sudah siap. Lihat dashboard?"
   - Buttons: "📄 Lihat Surat" | "📊 Dashboard"

**[TRANSITION]**: Slide up

---

### SCENE 6: Escalation Demo (15 sec)

**[SCREEN: Critical threat → Auto-escalation]**

**Narasi:**
> "Threat kritis? Kujaga escalate ke tim."

**[DEMO]**:
1. Screen: "🚨 CRITICAL: Government data breach — 252M records"
2. Auto-escalate triggered
3. Notification: "Notified: on-call team, KOMINFO, BPDP"
4. Telegram: "🔴 ESCALATION: Government breach. Tim sudah动静."

---

### SCENE 7: Closing (20 sec)

**[SCREEN: Kujaga dashboard — full security view]**

**Narasi:**
> "Kujaga — Automated Guardian for Indonesian Public Figures."

**[SHOW]**:
- Security Score: 95/100
- Threats blocked: 3
- Letters generated: 2
- Monitoring since: 30 days

**Narasi:**
> "11 tools. 24/7 monitoring. Zero user triggers."
> "Kujaga jaga nama, data, dan reputasi kamu."

**[SCREEN: Tagline]**

> "Kujaga menjaga namamu, data kamu, dan reputasi kamu."

**[END CARD]**
> "Kujaga.id"
> "OpenClaw Hackathon 2026"

---

## Technical Callouts (for judges)

### FREE Tools Used:
| Tool | API | Rate Limit |
|---|---|---|
| HIBP Password Check | k-anonymity | Unlimited ✅ |
| Google News RSS | RSS feed | Unlimited ✅ |
| Google Alerts RSS | RSS feed | Unlimited ✅ |
| WHOIS (RDAP) | rdap.org | Unlimited ✅ |
| VirusTotal | API | 4/min (free) |
| AbuseIPDB | API | 100/day (free) |

### Agent Architecture:
- **Type**: Single resolver agent (kujaga-resolver)
- **Mode**: Background monitoring + on-demand tools
- **Heartbeat**: Every 6 hours when idle
- **Language**: Indonesian (primary), English (technical)

### 9 Tools (OpenClaw "Hands"):
1. daily_hibp_check
2. daily_google_alerts
3. daily_news_scan
4. daily_phishing_check
5. check_url_safety
6. check_ip_reputation
7. generate_pdupa_letter
8. send_telegram_alert
9. auto_escalate

---

## Recording Tips

1. **Use screen recording** with audio narration
2. **Show real Telegram messages** (demo mode)
3. **Show actual letter generation** (template-based for speed)
4. **Keep timer visible** — practice to fit 2:00 exactly
5. **End on strong note** — security score + tagline

---

## Background Music (Optional)

- Calm, professional ambient music
- No lyrics
- Volume: low (background only)

---

## End of Demo Script