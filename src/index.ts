import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../public')));

// Importar rotas dos dashboards
import avaliacaoDesempenhoRoutes from './dashboards/avaliacao-desempenho/routes.js';
import rhRoutes from './dashboards/rh/routes.js';
import recrutamentoFormacaoRoutes from './dashboards/recrutamento-formacao/routes.js';

// Rotas de API (devem vir antes do SPA fallback)
app.use('/api/avaliacao-desempenho', avaliacaoDesempenhoRoutes);
app.use('/api/rh', rhRoutes);
app.use('/api/recrutamento-formacao', recrutamentoFormacaoRoutes);

// SPA fallback - deve vir depois de todas as rotas de API
app.get('*', (req, res) => {
  // Se for uma rota de API, não servir o index.html
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  // Para todas as outras rotas, servir o index.html (SPA)
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// SPA fallback - deve vir depois de todas as rotas de API
app.get('*', (req, res) => {
  // Se for uma rota de API, não servir o index.html
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  // Para todas as outras rotas, servir o index.html (SPA)
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dashboard server running on http://0.0.0.0:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
