import express from 'express';
import { getKPIs, getDesempenhoPorDepartamento, getDistribuicaoNotas, getDesempenhoPorComarca, getTopPerformers, getDesempenhoPorObjetivo, getRadarPorGrupoAlvo, getFuncionariosPorKPI } from './controller.js';

const router = express.Router();

router.get('/kpis', getKPIs);
router.get('/desempenho-departamento', getDesempenhoPorDepartamento);
router.get('/distribuicao-notas', getDistribuicaoNotas);
router.get('/desempenho-comarca', getDesempenhoPorComarca);
router.get('/top-performers', getTopPerformers);
router.get('/desempenho-objetivo', getDesempenhoPorObjetivo);
router.get('/radar-grupo-alvo', getRadarPorGrupoAlvo);
router.get('/funcionarios-kpi', getFuncionariosPorKPI);

export default router;
