# Guia de Deploy - Contabo

Este guia explica como fazer o deploy do Dashboard Context na Contabo.

## 📋 Pré-requisitos

- Servidor Contabo com acesso SSH
- Node.js 18+ instalado
- PM2 instalado globalmente (`npm install -g pm2`)
- Git instalado

## 🚀 Passos para Deploy

### 1. Preparar o Servidor

```bash
# Conectar ao servidor via SSH
ssh usuario@seu-servidor-contabo.com

# Atualizar o sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18+ (se não estiver instalado)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2 globalmente
sudo npm install -g pm2

# Criar diretório para o projeto
mkdir -p ~/dashboard-context
cd ~/dashboard-context
```

### 2. Fazer Upload do Código

**Opção A: Via Git (Recomendado)**

```bash
# Clonar o repositório
git clone seu-repositorio.git .
```

**Opção B: Via SCP**

```bash
# No seu computador local
scp -r /caminho/do/projeto/* usuario@seu-servidor-contabo.com:~/dashboard-context/
```

### 3. Instalar Dependências e Build

```bash
cd ~/dashboard-context

# Tornar o script de deploy executável
chmod +x deploy.sh

# Executar o script de deploy
./deploy.sh
```

Ou manualmente:

```bash
# Instalar dependências do backend
npm install

# Instalar dependências do frontend
cd frontend
npm install

# Build do frontend
npm run build

# Voltar para raiz e build do backend
cd ..
npm run build
```

### 4. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.production .env

# Editar o arquivo .env
nano .env
```

Configure as seguintes variáveis:

```env
PORT=3000
NODE_ENV=production
API_BASE_URL=http://localhost:8080/IGRP-Template
API_USERNAME=admin
API_PASSWORD=admin
```

### 5. Criar Diretório de Logs

```bash
mkdir -p logs
```

### 6. Iniciar a Aplicação com PM2

```bash
# Iniciar a aplicação
pm2 start ecosystem.config.js

# Salvar a configuração do PM2
pm2 save

# Configurar PM2 para iniciar no boot
pm2 startup
# Execute o comando que aparecer na tela (geralmente algo como: sudo env PATH=...)
```

### 7. Verificar Status

```bash
# Ver status da aplicação
pm2 status

# Ver logs
pm2 logs dashboard-context

# Ver informações detalhadas
pm2 info dashboard-context
```

### 8. Configurar Firewall

```bash
# Permitir porta 3000 (ou a porta que você configurou)
sudo ufw allow 3000/tcp
sudo ufw reload
```

### 9. Configurar Nginx (Opcional mas Recomendado)

Se quiser usar um domínio e HTTPS, configure o Nginx como reverse proxy:

```bash
# Instalar Nginx
sudo apt install nginx

# Criar configuração
sudo nano /etc/nginx/sites-available/dashboard
```

Adicione a seguinte configuração:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Ativar o site
sudo ln -s /etc/nginx/sites-available/dashboard /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### 10. Configurar SSL com Let's Encrypt (Opcional)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d seu-dominio.com

# O certificado será renovado automaticamente
```

## 🔧 Comandos Úteis do PM2

```bash
# Parar a aplicação
pm2 stop dashboard-context

# Reiniciar a aplicação
pm2 restart dashboard-context

# Ver logs em tempo real
pm2 logs dashboard-context

# Ver logs apenas de erro
pm2 logs dashboard-context --err

# Monitorar recursos
pm2 monit

# Deletar a aplicação do PM2
pm2 delete dashboard-context
```

## 🔄 Atualizar a Aplicação

```bash
cd ~/dashboard-context

# Se usar Git
git pull origin main

# Executar deploy novamente
./deploy.sh

# Reiniciar com PM2
pm2 restart dashboard-context
```

## 🐛 Troubleshooting

### Aplicação não inicia

```bash
# Verificar logs
pm2 logs dashboard-context --lines 50

# Verificar se a porta está em uso
sudo lsof -i :3000

# Verificar permissões
ls -la dist/
```

### Erro de permissão

```bash
# Dar permissões ao diretório
chmod -R 755 ~/dashboard-context
```

### Porta já em uso

```bash
# Encontrar processo usando a porta
sudo lsof -i :3000

# Matar o processo
sudo kill -9 <PID>
```

## 📊 Monitoramento

O PM2 fornece monitoramento básico. Para monitoramento avançado:

```bash
# Instalar PM2 Plus (opcional)
pm2 link <secret_key> <public_key>
```

## 🔒 Segurança

1. **Firewall**: Configure o firewall para permitir apenas portas necessárias
2. **HTTPS**: Use SSL/TLS em produção
3. **Variáveis de Ambiente**: Nunca commite o arquivo `.env`
4. **Atualizações**: Mantenha o Node.js e dependências atualizadas

## 📝 Notas

- A aplicação roda na porta 3000 por padrão
- Os arquivos estáticos do React são servidos pelo Express em produção
- O PM2 gerencia o processo automaticamente e reinicia em caso de crash
- Logs são salvos em `./logs/`

## 🆘 Suporte

Em caso de problemas, verifique:
1. Logs do PM2: `pm2 logs dashboard-context`
2. Logs do sistema: `journalctl -u pm2-*`
3. Status do PM2: `pm2 status`
4. Porta disponível: `netstat -tulpn | grep 3000`
