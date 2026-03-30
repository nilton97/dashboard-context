# Estrutura do Projeto Dashboard-Context

## Arquivos Criados

### Configuração
- `package.json` - Dependências e scripts do projeto
- `tsconfig.json` - Configuração TypeScript
- `.env.example` - Exemplo de variáveis de ambiente
- `.gitignore` - Arquivos ignorados pelo git

### Código Fonte (src/)
- `src/index.ts` - Servidor Express principal
- `src/api/client.ts` - Cliente HTTP para APIs
- `src/types/index.ts` - Definições TypeScript

### Dashboards (src/dashboards/)
- `src/dashboards/avaliacao-desempenho/`
  - `routes.ts` - Rotas do dashboard
  - `controller.ts` - Controller do dashboard
- `src/dashboards/rh/`
  - `routes.ts` - Rotas do dashboard
  - `controller.ts` - Controller do dashboard
- `src/dashboards/recrutamento-formacao/`
  - `routes.ts` - Rotas do dashboard
  - `controller.ts` - Controller do dashboard

### Frontend (public/)
- `public/index.html` - Página inicial
- `public/avaliacao-desempenho.html` - Dashboard de avaliação
- `public/rh.html` - Dashboard de RH
- `public/recrutamento-formacao.html` - Dashboard de recrutamento/formação
- `public/css/style.css` - Estilos CSS
- `public/js/api.js` - Cliente API JavaScript

### Documentação
- `README.md` - Documentação principal

## Como Usar

1. Instalar dependências:
```bash
cd dashboard-context
npm install
```

2. Configurar ambiente:
```bash
cp .env.example .env
# Editar .env com as configurações corretas
```

3. Executar em desenvolvimento:
```bash
npm run dev
```

4. Compilar para produção:
```bash
npm run build
npm start
```

## Estrutura de Diretórios

```
dashboard-context/
├── src/
│   ├── index.ts
│   ├── api/
│   │   └── client.ts
│   ├── types/
│   │   └── index.ts
│   └── dashboards/
│       ├── avaliacao-desempenho/
│       │   ├── routes.ts
│       │   └── controller.ts
│       ├── rh/
│       │   ├── routes.ts
│       │   └── controller.ts
│       └── recrutamento-formacao/
│           ├── routes.ts
│           └── controller.ts
├── public/
│   ├── index.html
│   ├── avaliacao-desempenho.html
│   ├── rh.html
│   ├── recrutamento-formacao.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── api.js
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```
