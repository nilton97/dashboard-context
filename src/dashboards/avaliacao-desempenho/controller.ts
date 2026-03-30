import { Request, Response } from 'express';
import apiGateway from '../../api/gateway.js';

export const getKPIs = async (req: Request, res: Response) => {
  try {
    const data = await apiGateway.proxy('/api/rh/avaliacao-desempenho/kpis');
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching KPIs:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar KPIs',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getDesempenhoPorDepartamento = async (req: Request, res: Response) => {
  try {
    const { ano } = req.query;
    const data = await apiGateway.proxy('/api/rh/avaliacao-desempenho/desempenho-departamento', { ano });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching desempenho por departamento:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getDistribuicaoNotas = async (req: Request, res: Response) => {
  try {
    const data = await apiGateway.proxy('/api/rh/avaliacao-desempenho/distribuicao-notas');
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching distribuição de notas:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getDesempenhoPorComarca = async (req: Request, res: Response) => {
  try {
    const { ano } = req.query;
    const data = await apiGateway.proxy('/api/rh/avaliacao-desempenho/desempenho-comarca', { ano });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching desempenho por comarca:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getTopPerformers = async (req: Request, res: Response) => {
  try {
    const { limit = 5 } = req.query;
    const data = await apiGateway.proxy('/api/rh/avaliacao-desempenho/top-performers', { limit });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching top performers:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getDesempenhoPorObjetivo = async (req: Request, res: Response) => {
  try {
    const { ano } = req.query;
    const data = await apiGateway.proxy('/api/rh/avaliacao-desempenho/desempenho-objetivo', { ano });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching desempenho por objetivo:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getRadarPorGrupoAlvo = async (req: Request, res: Response) => {
  try {
    const { ano } = req.query;
    const data = await apiGateway.proxy('/api/rh/avaliacao-desempenho/radar-grupo-alvo', { ano });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching radar por grupo alvo:', error);
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
    // Este endpoint pode não existir no backend ainda, então retorna vazio
    // ou pode ser implementado no backend IGRP
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
