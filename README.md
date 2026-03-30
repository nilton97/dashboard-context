# Dashboard Context - Avaliação de Desempenho

Dashboard moderno construído com React, TypeScript, Tailwind CSS e Express.

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Recharts
- **Backend**: Express + TypeScript
- **Design**: Tailwind CSS com glassmorphism e animações modernas

## 📦 Instalação

### Instalar todas as dependências

```bash
npm run install:all
```

Ou manualmente:

```bash
# Backend
npm install

# Frontend
cd frontend
npm install
```

## 🛠️ Desenvolvimento

### Executar backend e frontend separadamente

```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
npm run dev:frontend
```

### Executar tudo junto

```bash
npm run dev:all
```

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173

## 🏗️ Build

```bash
# Build do backend
npm run build

# Build do frontend (gera arquivos em public/)
npm run build:frontend
```

## 📁 Estrutura

```
dashboard-context/
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── api/          # Cliente API
│   │   ├── types/        # Tipos TypeScript
│   │   └── App.tsx       # Componente principal
│   └── package.json
├── src/               # Backend Express
│   ├── dashboards/    # Controllers e rotas
│   └── index.ts       # Servidor Express
└── public/            # Arquivos estáticos (build do React)
```

## 🎨 Features

- ✅ Dashboard moderno com design glassmorphism
- ✅ Gráficos interativos com Recharts
- ✅ Animações suaves
- ✅ Responsivo (mobile, tablet, desktop)
- ✅ Dados mockados prontos para uso
- ✅ TypeScript para type safety
- ✅ Tailwind CSS para estilização

## 📊 Endpoints API

- `GET /api/avaliacao-desempenho/kpis`
- `GET /api/avaliacao-desempenho/desempenho-departamento?ano=2025`
- `GET /api/avaliacao-desempenho/distribuicao-notas`
- `GET /api/avaliacao-desempenho/desempenho-comarca?ano=2025`
- `GET /api/avaliacao-desempenho/top-performers?limit=5`
- `GET /api/avaliacao-desempenho/desempenho-objetivo?ano=2025`
- `GET /api/avaliacao-desempenho/radar-grupo-alvo?ano=2025`
