# Dockerfile para deploy (opcional)
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Instalar dependências
RUN npm install
RUN cd frontend && npm install

# Copiar código fonte
COPY . .

# Build
RUN npm run build:all

# Expor porta
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "run", "start:prod"]
