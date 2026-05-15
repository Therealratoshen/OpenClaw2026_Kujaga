# Kujaga 🛡️

**Autonomous Identity Security Agent for Indonesian Public Figures**

*User sets up once. Kujaga protects forever. Zero triggers needed.*

---

## Tagline

**"Kujaga menjaga namamu, data kamu, dan reputasi kamu."**

---

## Try It Now

**Telegram:** [@Kujaga_bot](https://t.me/Kujaga_bot)

Message `/start` to begin setup. It's free to try.

---

## How It Works

### 1. Connect via Telegram (2 minutes)

Start a chat with [@Kujaga_bot](https://t.me/Kujaga_bot). Send `/start`.

```
/start
→ Welcome message
→ Setup wizard begins
```

### 2. One-Time Setup (5 minutes)

Answer 4 simple questions:

```
Step 1: Your full name
Step 2: Email to monitor
Step 3: Phone number
Step 4: Connect Telegram
```

Done. Kujaga starts protecting immediately.

### 3. Kujaga Works 24/7

```
Every 6 hours automatically:
├── Check HIBP for email breaches
├── Scan Google Alerts for name mentions
├── Monitor news for company breaches
└── Detect phishing sites using your brand

On threat detected:
├── Generate PDUPA deletion letter
├── Send alert to Telegram
└── Start 30-day deadline tracker
```

### 4. You Only Receive Alerts

```
✅ Morning: "All clear - 247 monitored entries"
🚨 Alert: "Breach found in Tokopedia - generating letter..."
📄 Letter ready: [Preview] [Send Now]
⏰ Day 25: "5 days left - sending reminder"
📋 Day 30: Auto-escalate to Kominfo
```

---

## Features

### 🔐 Breach Detection
- **HIBP Integration** — Check 15B+ breach records
- **Email monitoring** — Automatic checks every 6 hours
- **Password safety** — HIBP k-anonymity (private)

### 👁️ Brand Monitoring
- **Google Alerts** — Track name across the internet
- **Social media** — Detect impersonation attempts
- **Real-time** — 24/7 monitoring, zero triggers

### 📰 News Scanner
- **Company breach news** — Automated scanning
- **Related company alerts** — Breach at services you use
- **Direct notification** — Telegram alerts

### 🎣 Phishing Block
- **URL safety check** — Google Safe Browsing API
- **Multi-antivirus** — VirusTotal 70+ engines
- **Domain age** — WHOIS for suspicious new domains

### 📄 PDUPA Letter Generation
- **AI-powered** — Generated using MiniMax
- **Indonesian PDP Law** — Pasal 35 & Pasal 36
- **30-day deadline** — Automatic tracking
- **Auto-escalate** — Kominfo complaint if no response

### 📱 Telegram Alerts
- **Real-time** — Instant notifications
- **Indonesian** — Native language responses
- **Actionable** — Buttons for quick response

### 💳 Payment (DOKU Integration)
- **QRIS** — Quick response code
- **Virtual Account** — Bank transfer
- **Credit Card** — Visa/Mastercard
- **Secure** — DOKU payment gateway

---

## Telegram Commands

| Command | Description |
|---|---|
| `/start` | Begin setup / restart |
| `/breach [email]` | Check email for breaches |
| `/brand [name]` | Monitor name mentions |
| `/phish [url]` | Check URL safety |
| `/news` | Scan recent news |
| `/status` | Your protection status |
| `/help` | Show all commands |
| `/profile` | View/edit your profile |

---

## Pricing Tiers

| Plan | Price | Features |
|---|---|---|
| **Starter** | Rp 99K/mo | 1 email, basic monitoring |
| **Professional** | Rp 199K/mo | Full monitoring, PDUPA letters |
| **Premium** | Rp 499K/mo | Priority support, multi-company |
| **Enterprise** | Rp 1.5M/mo | Agency management, API access |

---

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js + Next.js (Dashboard)
- **AI**: MiniMax API
- **Channel**: Telegram Bot (@Kujaga_bot)
- **Agent**: OpenClaw
- **Database**: Supabase
- **Payments**: DOKU API

---

## Quick Start

### Local Development

```bash
# Clone the repo
git clone https://github.com/Therealratoshen/OpenClaw2026_Kujaga.git
cd OpenClaw2026_Kujaga

# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env with your API keys

# Run server
npm start

# Or run demo loop
npm run demo
```

### VPS Deployment

```bash
# SSH to your VPS
ssh root@your-vps-ip

# Install OpenClaw
curl -fsSL https://openclaw.ai/install.sh | bash

# Configure
openclaw models configure minimax/MiniMax-M2.7-highspeed
openclaw channels enable telegram

# Check status
openclaw status
```

---

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `GET /` | GET | Health check |
| `GET /health` | GET | Detailed health |
| `POST /telegram/webhook` | POST | Telegram webhook |
| `POST /api/monitoring/hibp` | POST | HIBP breach check |
| `POST /api/monitoring/brand` | POST | Brand monitoring |
| `POST /api/monitoring/news` | POST | News scan |
| `POST /api/monitoring/phishing` | POST | Phishing check |
| `POST /api/payment/create-link` | POST | Create payment |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│              Telegram User (@Kujaga_bot)           │
│                   Setup once → Alert forever        │
└─────────────────────┬───────────────────────────────┘
                      │ Messages
                      ▼
┌─────────────────────────────────────────────────────┐
│              OPENCLAW GATEWAY (VPS)                  │
│  ┌─────────────────────────────────────────────┐    │
│  │         KUJAGA AGENT                         │    │
│  │                                              │    │
│  │  MONITORING (every 6 hours):                 │    │
│  │    • HIBP → Email/password breaches          │    │
│  │    • Google Alerts → Name mentions           │    │
│  │    • Google News → Company breaches          │    │
│  │    • Safe Browsing → Phishing sites         │    │
│  │                                              │    │
│  │  DOCUMENTS (auto-generated):                │    │
│  │    • PDUPA letters (Pasal 35, 36)           │    │
│  │    • Kominfo complaints                     │    │
│  │                                              │    │
│  │  ALERTS: Telegram → User                    │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
┌─────────────────┐     ┌─────────────────────────┐
│    SUPABASE      │     │      FREE APIs          │
│  • user_profiles │     │  • HIBP (breach check)  │
│  • threats       │     │  • Google (Alerts)     │
│  • documents    │     │  • Safe Browsing        │
│  • pg_cron      │     │  • VirusTotal           │
└─────────────────┘     │  • WHOIS                │
                        └─────────────────────────┘
```

---

## Cron Schedule (WIB)

| Time | Task |
|---|---|
| 06:00 | Morning HIBP check |
| 12:00 | Company breach scan |
| 18:00 | Phishing sweep |
| 09:00 | Deadline reminder check |

---

## Environment Variables

```bash
# AI & Agent
MINIMAX_API_KEY=your_minimax_key

# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_token

# Database
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_SERVICE_KEY=your_service_key

# Security APIs
HIBP_API_KEY=your_hibp_key
GOOGLE_SAFE_BROWSING_API_KEY=your_google_key
VIRUSTOTAL_API_KEY=your_virustotal_key
WHOIS_API_KEY=your_whois_key

# Payment
DOKU_API_KEY=your_doku_key
DOKU_CLIENT_ID=your_client_id
```

---

## OpenClaw Agent Setup

Kujaga runs as an OpenClaw agent on a VPS:

```bash
# Check status
openclaw status

# View logs
openclaw logs --follow

# Restart gateway
openclaw gateway restart

# Run diagnostics
openclaw doctor --yes
```

### OpenClaw Config Commands

```bash
# Enable LAN access (for dashboard)
openclaw config set gateway.bind lan
openclaw gateway restart

# Configure model
openclaw models configure minimax/MiniMax-M2.7-highspeed

# Check health
openclaw status --deep
```

---

## License

MIT