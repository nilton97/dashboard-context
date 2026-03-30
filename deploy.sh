#!/bin/bash

echo "🚀 Iniciando deploy do Dashboard Context..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: package.json não encontrado. Execute este script na raiz do projeto.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Instalando dependências do backend...${NC}"
npm install

echo -e "${YELLOW}📦 Instalando dependências do frontend...${NC}"
cd frontend
npm install

echo -e "${YELLOW}🔨 Construindo frontend...${NC}"
npm run build

cd ..

echo -e "${YELLOW}🔨 Compilando TypeScript do backend...${NC}"
npm run build

echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"
echo -e "${YELLOW}📝 Próximos passos:${NC}"
echo "1. Configure o arquivo .env com as variáveis de ambiente"
echo "2. Execute: pm2 start ecosystem.config.js"
echo "3. Execute: pm2 save"
echo "4. Execute: pm2 startup (para iniciar automaticamente no boot)"
