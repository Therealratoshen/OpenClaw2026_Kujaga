#!/bin/bash
# Kujaga Deployment Script for VPS
# Run on fresh VPS: Ubuntu 22.04 recommended

set -e

echo "🛡️ Kujaga Deployment Script"
echo "============================"

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 18
echo "📦 Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 (process manager)
echo "📦 Installing PM2..."
npm install -g pm2

# Create app directory
echo "📁 Setting up app directory..."
mkdir -p /var/www/kujaga
cd /var/www/kujaga

# Clone repo (or copy files)
echo "📥 Cloning repository..."
# Replace with your repo URL
# git clone https://github.com/Therealratoshen/OpenClaw2026_Kujaga.git .

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Setup environment
echo "⚙️ Setting up environment..."
cp .env.example .env
nano .env  # Edit with your API keys

# Start with PM2
echo "🚀 Starting Kujaga with PM2..."
pm2 start src/server/app.js --name kujaga
pm2 startup
pm2 save

# Setup Nginx (optional, for HTTPS)
echo "🌐 Setting up Nginx reverse proxy..."
apt install -y nginx

cat > /etc/nginx/sites-available/kujaga << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/kujaga /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Setup SSL with Certbot
echo "🔒 Setting up SSL..."
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com

echo ""
echo "✅ Kujaga deployed!"
echo "   App: http://your-domain.com"
echo "   Health: http://your-domain.com/health"
echo ""
echo "PM2 Commands:"
echo "  pm2 status     - Check status"
echo "  pm2 logs       - View logs"
echo "  pm2 restart    - Restart"
echo "  pm2 stop       - Stop"