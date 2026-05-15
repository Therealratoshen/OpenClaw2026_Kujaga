# Kujaga 🛡️

**Autonomous Identity Security Agent for Indonesian Public Figures**

*User sets up once. Kujaga protects forever. Zero triggers needed.*

## Tagline

"Kujaga menjaga namamu, data kamu, dan reputasi kamu."

## Features

- **24/7 Autonomous Monitoring** — No user triggers needed
- **Email/Password Breach Check** — HIBP k-anonymity (FREE)
- **Brand Mention Monitoring** — Google Alerts RSS (FREE)
- **Company Breach News Scan** — Real-time threat detection
- **Phishing Domain Detection** — WHOIS/RDAP (FREE)
- **PDUPA Letter Generation** — MiniMax AI (Indonesian PDP Law)
- **Telegram Alerts** — Real-time notifications
- **DOKU Payment Integration** — QRIS, VA, credit card

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **AI**: MiniMax
- **Payments**: DOKU MCP
- **Channel**: Telegram Bot
- **Agent**: OpenClaw

## Quick Start

```bash
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

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `GET /` | GET | Health check |
| `GET /health` | GET | Detailed health |
| `POST /telegram/webhook` | POST | Telegram webhook |
| `POST /api/monitoring/hibp` | POST | HIBP check |
| `POST /api/monitoring/brand` | POST | Brand monitoring |
| `POST /api/monitoring/news` | POST | News scan |
| `POST /api/monitoring/phishing` | POST | Phishing check |
| `POST /api/payment/create-link` | POST | Create payment |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Telegram User                      │
└─────────────────────┬───────────────────────────────┘
                      │ Messages
                      ▼
┌─────────────────────────────────────────────────────┐
│              Kujaga Server (Express)                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Telegram   │  │  Monitoring │  │   Payment   │  │
│  │   Router    │  │    Router   │  │   Router    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │    HIBP     │  │  Google     │  │    DOKU     │  │
│  │   Service   │  │  Alerts     │  │   MCP       │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Phishing   │  │   News      │  │  Telegram   │  │
│  │  Service    │  │  Service    │  │  Service    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
│  ┌─────────────┐  ┌─────────────┐                   │
│  │    Cron     │  │   Letter    │                   │
│  │    Jobs     │  │  Generator  │                   │
│  └─────────────┘  └─────────────┘                   │
└─────────────────────────────────────────────────────┘
```

## Cron Schedule

| Time (WIB) | Task |
|---|---|
| 06:00 | Morning HIBP check |
| 12:00 | Company breach scan + phishing sweep |
| 18:00 | Daily security report |

## Pricing Tiers

| Plan | Price | Features |
|---|---|---|
| Starter | Rp 99K/mo | 1 email, basic monitoring |
| Professional | Rp 199K/mo | Full monitoring, PDUPA letters |
| Premium | Rp 499K/mo | Priority support, multi-company |
| Enterprise | Rp 1.5M/mo | Agency management, API access |

## License

MIT