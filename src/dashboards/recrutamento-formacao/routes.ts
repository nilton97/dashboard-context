import express from 'express';
import { getKPIs, getConcursos, getFormacoes, getCandidatosPorConcurso, getFormacoesPorArea, getEstatisticasFormacao, getFuncionariosPorKPI } from './controller.js';

const router = express.Router();

router.get('/kpis', getKPIs);
router.get('/concursos', getConcursos);
router.get('/formacoes', getFormacoes);
router.get('/candidatos-concurso', getCandidatosPorConcurso);
router.get('/formacoes-area', getFormacoesPorArea);
router.get('/estatisticas-formacao', getEstatisticasFormacao);
router.get('/funcionarios-kpi', getFuncionariosPorKPI);

export default router;
