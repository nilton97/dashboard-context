# 📦 Checklist de Deploy - Contabo

## ✅ Antes do Deploy

- [x] Script de build criado (`deploy.sh`)
- [x] Configuração PM2 criada (`ecosystem.config.js`)
- [x] Arquivo `.env.production` criado
- [x] Documentação de deploy criada (`DEPLOY.md`)
- [x] Servidor configurado para ouvir em `0.0.0.0`
- [x] SPA fallback configurado para React Router
- [x] Build do frontend configurado para `public/`

## 🚀 Passos no Servidor Contabo

### 1. Preparação Inicial

```bash
# Conectar ao servidor
ssh usuario@seu-servidor-contabo.com

# Instalar Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Verificar instalação
node --version  # Deve ser 18+
npm --version
pm2 --version
```

### 2. Upload do Projeto

```bash
# Criar diretório
mkdir -p ~/dashboard-context
cd ~/dashboard-context

# Opção A: Git
git clone seu-repositorio.git .

# Opção B: SCP (do seu computador local)
# scp -r /caminho/projeto/* usuario@servidor:~/dashboard-context/
```

### 3. Build e Deploy

```bash
cd ~/dashboard-context

# Dar permissão ao script
chmod +x deploy.sh

# Executar deploy
./deploy.sh
```

### 4. Configuração

```bash
# Copiar e editar .env
cp .env.production .env
nano .env

# Criar diretório de logs
mkdir -p logs
```

### 5. Iniciar com PM2

```bash
# Iniciar aplicação
pm2 start ecosystem.config.js

# Salvar configuração
pm2 save

# Configurar startup automático
pm2 startup
# Executar o comando que aparecer (ex: sudo env PATH=...)
```

### 6. Firewall

```bash
# Permitir porta 3000
sudo ufw allow 3000/tcp
sudo ufw reload

# Verificar
sudo ufw status
```

### 7. Verificar

```bash
# Status
pm2 status

# Logs
pm2 logs dashboard-context

# Testar localmente no servidor
curl http://localhost:3000
```

## 🔧 Comandos Úteis

```bash
# Ver logs em tempo real
pm2 logs dashboard-context --lines 50

# Reiniciar após mudanças
pm2 restart dashboard-context

# Parar aplicação
pm2 stop dashboard-context

# Ver uso de recursos
pm2 monit
```

## 🌐 Configurar Domínio (Opcional)

Se quiser usar um domínio, configure Nginx como reverse proxy (veja `DEPLOY.md`).

## 📝 Variáveis de Ambiente

Edite o arquivo `.env`:

```env
PORT=3000
NODE_ENV=production
API_BASE_URL=http://localhost:8080/IGRP-Template
API_USERNAME=admin
API_PASSWORD=admin
```

## ⚠️ Troubleshooting

**Porta em uso:**
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
```

**Erro de permissão:**
```bash
chmod -R 755 ~/dashboard-context
```

**Ver logs de erro:**
```bash
pm2 logs dashboard-context --err
tail -f logs/err.log
```

## 📊 Monitoramento

A aplicação estará disponível em: `http://seu-ip-contabo:3000`

Para verificar se está funcionando:
```bash
pm2 status
pm2 logs dashboard-context
curl http://localhost:3000/api/rh/kpis
```
