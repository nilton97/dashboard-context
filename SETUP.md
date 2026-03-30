# 🚀 Guia de Configuração Rápida

## Passo 1: Instalar Dependências

```bash
# Instalar dependências do backend
npm install

# Instalar dependências do frontend
cd frontend
npm install
cd ..
```

Ou use o script automatizado:

```bash
npm run install:all
```

## Passo 2: Executar o Projeto

### Opção A: Executar tudo junto (recomendado)

```bash
npm run dev:all
```

Isso iniciará:
- Backend na porta 3000
- Frontend React na porta 5173

### Opção B: Executar separadamente

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

## Passo 3: Acessar o Dashboard

Abra seu navegador em: **http://localhost:5173**

## 📝 Notas

- O backend serve a API em `http://localhost:3000/api`
- O frontend React roda em `http://localhost:5173` (Vite dev server)
- Em desenvolvimento, o Vite faz proxy das chamadas `/api` para o backend
- Os dados são mockados e já estão configurados no controller

## 🎨 Tecnologias Usadas

- **React 18** - Framework frontend
- **TypeScript** - Type safety
- **Vite** - Build tool rápida
- **Tailwind CSS** - Estilização moderna
- **Recharts** - Gráficos interativos
- **Lucide React** - Ícones modernos
- **Express** - Backend API
