# Kujaga VPS Setup Guide

## Prerequisites
- VPS with Ubuntu 22.04 (2 vCPU, 2 GB RAM)
- Domain name pointed to VPS IP (optional)
- SSH access to VPS

---

## Quick Setup (10 minutes)

### Step 1: Connect to VPS
```bash
ssh root@YOUR_VPS_IP
```

### Step 2: Clone & Install
```bash
# Clone repo
git clone https://github.com/Therealratoshen/OpenClaw2026_Kujaga.git
cd OpenClaw2026_Kujaga

# Install dependencies
npm install

# Copy env file
cp .env.example .env
```

### Step 3: Configure API Keys
```bash
nano .env
```

Fill in:
```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
MINIMAX_API_KEY=your_minimax_api_key
DOKU_CLIENT_ID=your_doku_client_id
DOKU_AUTHORIZATION=Basic your_base64_encoded_key
```

### Step 4: Start Server
```bash
# Install PM2 (process manager)
npm install -g pm2

# Start Kujaga
pm2 start src/server/app.js --name kujaga

# Save PM2 config (auto-restart on reboot)
pm2 startup
pm2 save

# Check status
pm2 status
```

### Step 5: (Optional) Setup Nginx + SSL
```bash
apt install -y nginx

# Create Nginx config
nano /etc/nginx/sites-available/kujaga
```

Paste:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
ln -sf /etc/nginx/sites-available/kujaga /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# SSL (certbot)
apt install -y certbot python3-certbot-nginx
certbot --nginx -d YOUR_DOMAIN.com
```

---

## Telegram Webhook Setup

After your server is running, set the Telegram webhook:

```bash
curl "https://api.telegram.org/botYOUR_TOKEN/setWebhook?url=https://YOUR_DOMAIN/telegram/webhook"
```

---

## Verify Installation

```bash
# Check server health
curl http://localhost:3000/health

# Check logs
pm2 logs kujaga

# Restart
pm2 restart kujaga
```

---

## OpenClaw Setup (Optional — For AI Agent Interface)

OpenClaw gives you a chat-based AI agent interface for Kujaga.

### Install OpenClaw:
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard
```

### Load Kujaga Skill:
```bash
cd /var/www/kujaga
openclaw skill add ./skills/SKILL.md
```

### Run OpenClaw Dashboard:
```bash
openclaw dashboard
# Opens web interface at http://localhost:8080
```

---

## VPS Commands

| Command | Description |
|---|---|
| `pm2 status` | Check if Kujaga is running |
| `pm2 logs kujaga` | View live logs |
| `pm2 restart kujaga` | Restart server |
| `pm2 stop kujaga` | Stop server |
| `pm2 delete kujaga` | Remove from PM2 |
| `pm2 save` | Save process list |
| `journalctl -u kujaga` | System logs |

---

## Troubleshooting

### Port 3000 already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### PM2 not starting on reboot
```bash
pm2 startup
# Follow instructions
pm2 save
```

### Nginx 502 Bad Gateway
```bash
# Check if Kujaga is running
pm2 status

# Check logs
pm2 logs kujaga

# Restart
pm2 restart kujaga
```