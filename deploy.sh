#!/bin/bash
# Kujaga + OpenClaw Deployment Script

set -e

echo "🛡️ Kujaga + OpenClaw Deployment"
echo "================================"

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 18
echo "📦 Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs npm

# Install PM2
echo "📦 Installing PM2..."
npm install -g pm2

# Install OpenClaw
echo "📦 Installing OpenClaw..."
curl -fsSL https://openclaw.ai/install.sh | bash

# Create app directory
echo "📁 Setting up app directory..."
mkdir -p /var/www/kujaga
cd /var/www/kujaga

# Clone repo (or copy files manually)
echo "📥 Cloning repository..."
# git clone https://github.com/Therealratoshen/OpenClaw2026_Kujaga.git .

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# Setup environment
echo "⚙️ Setting up environment..."
cat > .env << 'EOF'
PORT=3000
LOG_LEVEL=info
TELEGRAM_BOT_TOKEN=your_telegram_token
MINIMAX_API_KEY=your_minimax_key
DOKU_CLIENT_ID=your_doku_client_id
DOKU_AUTHORIZATION=Basic your_base64_encoded_key
DOKU_MCP_URL=https://api-sandbox.doku.com/doku-mcp-server/mcp
EOF

echo "⚠️ Please edit .env with your API keys: nano .env"

# Initialize OpenClaw
echo "🤖 Initializing OpenClaw..."
openclaw onboard || echo "OpenClaw setup skipped"

# Load Kujaga skill
echo "📚 Loading Kujaga skill..."
openclaw skill add ./skills/SKILL.md || echo "Skill load skipped"

# Start Express server with PM2
echo "🚀 Starting Kujaga server..."
pm2 start src/server/app.js --name kujaga
pm2 startup
pm2 save

# Setup Nginx (optional, for HTTPS later)
echo "🌐 Setting up Nginx..."
apt install -y nginx

cat > /etc/nginx/sites-available/kujaga << 'NGINX'
server {
    listen 80;
    server_name YOUR_DOMAIN.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/kujaga /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

echo ""
echo "✅ Deployment Complete!"
echo "   Express API: http://YOUR_IP:3000"
echo "   OpenClaw: openclaw dashboard"
echo ""
echo "Next steps:"
echo "  1. Edit .env with your keys"
echo "  2. Set Telegram webhook"
echo "  3. pm2 logs kujaga"