# Deployment Guide for Ninashop

## Prerequisites
- Node.js (v14+)
- Nginx
- PM2
- Git

## 1. Clone the Repository
```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone https://github.com/your-username/ninashop.git
cd ninashop
```

## 2. Install Dependencies
```bash
npm ci
```

## 3. Configure Environment
```bash
cp server/.env.example server/.env
nano server/.env  # Edit with your actual values (SMTP creds, emails, PORT)
```

## 4. Build the Frontend
```bash
npm run build
```

## 5. Set Up PM2
```bash
# Install PM2 globally if not already installed
npm install -g pm2

# Create logs directory for PM2 logs
mkdir -p logs

# Start the server with PM2
pm2 start process.json

# Save the PM2 process list
pm2 save

# Set PM2 to start on boot
pm2 startup
# Run the command that was output from the previous command
```

## 6. Configure Nginx
Create a new Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/ninashop
```

Paste the following configuration (update server_name and SSL paths as needed):
```nginx
server {
    listen 80;
    server_name ninashop.online www.ninashop.online;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ninashop.online www.ninashop.online;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/ninashop.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ninashop.online/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    # Root directory
    root /var/www/ninashop/build;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri /index.html;
    }

    # API Proxy
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

Enable the site and test configuration:
```bash
sudo ln -s /etc/nginx/sites-available/ninashop /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 7. Set Up SSL (if not already done)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ninashop.online -d www.ninashop.online
```

## 8. Enable Automatic Renewal of SSL Certificate
```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

## 9. Verify Everything is Working
- Visit https://ninashop.online in your browser
- Test the contact form to ensure emails are being sent
- Check PM2 logs: `pm2 logs ninashop-api`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

## Updating the Application
```bash
cd /var/www/ninashop
git pull
npm ci
cd server
npm ci
cd ..
npm run build
pm2 restart process.json
```
