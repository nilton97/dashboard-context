import { Request, Response } from 'express';
import apiGateway from '../../api/gateway.js';

export const getKPIs = async (req: Request, res: Response) => {
  try {
    const data = await apiGateway.proxy('/api/rh/kpis');
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching RH KPIs:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar KPIs',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getFuncionariosPorDepartamento = async (req: Request, res: Response) => {
  try {
    const { ano } = req.query;
    const data = await apiGateway.proxy('/api/rh/funcionarios-departamento', { ano });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching funcionários por departamento:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getDistribuicaoGenero = async (req: Request, res: Response) => {
  try {
    const data = await apiGateway.proxy('/api/rh/distribuicao-genero');
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching distribuição por gênero:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getFaixasEtarias = async (req: Request, res: Response) => {
  try {
    const data = await apiGateway.proxy('/api/rh/faixas-etarias');
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching faixas etárias:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getDetalhesAntiguidade = async (req: Request, res: Response) => {
  try {
    const { ano } = req.query;
    const data = await apiGateway.proxy('/api/rh/antiguidade', { ano });
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching detalhes de antiguidade:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

export const getHabilitacoesLiterarias = async (req: Request, res: Response) => {
  try {
    const data = await apiGateway.proxy('/api/rh/habilitacoes-literarias');
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching habilitações literárias:', error);
    res.status(error.status || 500).json({ 
      error: error.message || 'Erro ao buscar dados',
      backend: error.backend,
      path: error.path
    });
  }
};

// Endpoints adicionais que podem não existir no backend ainda
// Retornam array vazio se não implementados no backend

export const getRotatividadePorDepartamento = async (req: Request, res: Response) => {
  try {
    // Tentar buscar do backend, se não existir retorna vazio
    const data = await apiGateway.proxy('/api/rh/rotatividade-departamento').catch(() => []);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching rotatividade:', error);
    res.json([]);
  }
};

export const getSatisfacaoPorDepartamento = async (req: Request, res: Response) => {
  try {
    const data = await apiGateway.proxy('/api/rh/satisfacao-departamento').catch(() => []);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching satisfação:', error);
    res.json([]);
  }
};

export const getEngajamentoPorMes = async (req: Request, res: Response) => {
  try {
    const { dataInicio, dataFim } = req.query;
    const data = await apiGateway.proxy('/api/rh/engajamento-mes', { dataInicio, dataFim }).catch(() => []);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching engajamento:', error);
    res.json([]);
  }
};

export const getAusenciasPorTipo = async (req: Request, res: Response) => {
  try {
    const data = await apiGateway.proxy('/api/rh/ausencias-tipo').catch(() => []);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching ausências por tipo:', error);
    res.json([]);
  }
};

export const getAusenciasPorDepartamento = async (req: Request, res: Response) => {
  try {
    const data = await apiGateway.proxy('/api/rh/ausencias-departamento').catch(() => []);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching ausências por departamento:', error);
    res.json([]);
  }
};

export const getFuncionariosComAusencias = async (req: Request, res: Response) => {
  try {
    const { tipo, departamento, dataInicio, dataFim } = req.query;
    const data = await apiGateway.proxy('/api/rh/funcionarios-ausencias', { tipo, departamento, dataInicio, dataFim }).catch(() => []);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching funcionários com ausências:', error);
    res.json([]);
  }
};

export const getOrcamentoPorDepartamento = async (req: Request, res: Response) => {
  try {
    const { ano } = req.query;
    const data = await apiGateway.proxy('/api/rh/orcamento-departamento', { ano }).catch(() => []);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching orçamento:', error);
    res.json([]);
  }
};

export const getNotificacoes = async (req: Request, res: Response) => {
  try {
    const data = await apiGateway.proxy('/api/rh/notificacoes').catch(() => []);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching notificações:', error);
    res.json([]);
  }
};

export const marcarNotificacaoLida = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Implementar no backend se necessário
    res.json({ success: true, id: parseInt(id) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const removerNotificacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Implementar no backend se necessário
    res.json({ success: true, id: parseInt(id) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
