# 🚀 Deploy Rápido - Contabo

## Comandos Rápidos

```bash
# 1. Conectar ao servidor
ssh usuario@seu-servidor-contabo.com

# 2. Instalar Node.js e PM2 (se necessário)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# 3. Clonar/Upload do projeto
cd ~
git clone seu-repositorio.git dashboard-context
cd dashboard-context

# 4. Executar deploy
chmod +x deploy.sh
./deploy.sh

# 5. Configurar ambiente
cp .env.production .env
nano .env  # Editar conforme necessário

# 6. Criar logs e iniciar
mkdir -p logs
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Seguir instruções na tela

# 7. Verificar
pm2 status
pm2 logs dashboard-context
```

## Configuração do .env

```env
PORT=3000
NODE_ENV=production
API_BASE_URL=http://localhost:8080/IGRP-Template
API_USERNAME=admin
API_PASSWORD=admin
```

## Comandos PM2 Úteis

```bash
pm2 status              # Ver status
pm2 logs dashboard-context  # Ver logs
pm2 restart dashboard-context  # Reiniciar
pm2 stop dashboard-context     # Parar
pm2 delete dashboard-context   # Remover
```

## Firewall

```bash
sudo ufw allow 3000/tcp
sudo ufw reload
```

## Acesso

Após o deploy, acesse: `http://seu-ip-contabo:3000`
