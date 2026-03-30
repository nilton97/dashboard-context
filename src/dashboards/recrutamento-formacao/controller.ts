import { Request, Response } from 'express';
import apiGateway from '../../api/gateway.js';

export const getKPIs = async (req: Request, res: Response) => {
  try {
    const data = await apiGateway.proxy('/api/rh/recrutamento-formacao/kpis');
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching recrutamento/formacao KPIs:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar KPIs',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getConcursos = async (req: Request, res: Response) => {
  try {
    const { estado, ano } = req.query;
    const data = await apiGateway.proxy('/api/rh/recrutamento-formacao/concursos', { estado, ano });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching concursos:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getFormacoes = async (req: Request, res: Response) => {
  try {
    const { estado, ano } = req.query;
    const data = await apiGateway.proxy('/api/rh/recrutamento-formacao/formacoes', { estado, ano });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching formações:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getCandidatosPorConcurso = async (req: Request, res: Response) => {
  try {
    const { concursoId } = req.query;
    if (!concursoId) {
      return res.status(400).json({ error: 'concursoId é obrigatório' });
    }
    const data = await apiGateway.proxy('/api/rh/recrutamento-formacao/candidatos-concurso', { concursoId });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching candidatos por concurso:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getFormacoesPorArea = async (req: Request, res: Response) => {
  try {
    const { ano } = req.query;
    const data = await apiGateway.proxy('/api/rh/recrutamento-formacao/formacoes-area', { ano });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching formações por área:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getEstatisticasFormacao = async (req: Request, res: Response) => {
  try {
    const { ano } = req.query;
    const data = await apiGateway.proxy('/api/rh/recrutamento-formacao/estatisticas-formacao', { ano });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching estatísticas de formação:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getFuncionariosPorKPI = async (req: Request, res: Response) => {
  try {
    const { tipo, ano } = req.query;
    // Este endpoint pode não existir no backend ainda
    res.json([]);
  } catch (error: any) {
    console.error('Error fetching funcionários por KPI:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};
