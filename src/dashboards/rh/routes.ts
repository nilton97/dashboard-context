import express from 'express';
import { 
  getKPIs, 
  getFuncionariosPorDepartamento, 
  getDistribuicaoGenero, 
  getFaixasEtarias, 
  getDetalhesAntiguidade, 
  getHabilitacoesLiterarias,
  getRotatividadePorDepartamento,
  getSatisfacaoPorDepartamento,
  getEngajamentoPorMes,
  getAusenciasPorTipo,
  getAusenciasPorDepartamento,
  getFuncionariosComAusencias,
  getOrcamentoPorDepartamento,
  getNotificacoes,
  marcarNotificacaoLida,
  removerNotificacao
} from './controller.js';

const router = express.Router();

router.get('/kpis', getKPIs);
router.get('/funcionarios-departamento', getFuncionariosPorDepartamento);
router.get('/distribuicao-genero', getDistribuicaoGenero);
router.get('/faixas-etarias', getFaixasEtarias);
router.get('/antiguidade', getDetalhesAntiguidade);
router.get('/habilitacoes-literarias', getHabilitacoesLiterarias);
router.get('/rotatividade-departamento', getRotatividadePorDepartamento);
router.get('/satisfacao-departamento', getSatisfacaoPorDepartamento);
router.get('/engajamento-mes', getEngajamentoPorMes);
router.get('/ausencias-tipo', getAusenciasPorTipo);
router.get('/ausencias-departamento', getAusenciasPorDepartamento);
router.get('/funcionarios-ausencias', getFuncionariosComAusencias);
router.get('/orcamento-departamento', getOrcamentoPorDepartamento);
router.get('/notificacoes', getNotificacoes);
router.put('/notificacoes/:id/lida', marcarNotificacaoLida);
router.delete('/notificacoes/:id', removerNotificacao);

export default router;
