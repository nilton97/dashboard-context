import { Request, Response } from 'express';
import {
  mockKPIs,
  mockFuncionariosPorDepartamento,
  mockDistribuicaoGenero,
  mockFaixasEtarias,
  mockAntiguidade,
  mockHabilitacoesLiterarias,
  mockRotatividadePorDepartamento,
  mockSatisfacaoPorDepartamento,
  mockEngajamentoPorMes,
  mockAusenciasPorTipo,
  mockAusenciasPorDepartamento,
  mockFuncionariosComAusencias,
  mockOrcamentoPorDepartamento,
  mockNotificacoes,
} from './mock.js';

export const getKPIs = async (req: Request, res: Response) => {
  res.json(mockKPIs);
};

export const getFuncionariosPorDepartamento = async (req: Request, res: Response) => {
  res.json(mockFuncionariosPorDepartamento);
};

export const getDistribuicaoGenero = async (req: Request, res: Response) => {
  res.json(mockDistribuicaoGenero);
};

export const getFaixasEtarias = async (req: Request, res: Response) => {
  res.json(mockFaixasEtarias);
};

export const getDetalhesAntiguidade = async (req: Request, res: Response) => {
  res.json(mockAntiguidade);
};

export const getHabilitacoesLiterarias = async (req: Request, res: Response) => {
  res.json(mockHabilitacoesLiterarias);
};

export const getRotatividadePorDepartamento = async (req: Request, res: Response) => {
  res.json(mockRotatividadePorDepartamento);
};

export const getSatisfacaoPorDepartamento = async (req: Request, res: Response) => {
  res.json(mockSatisfacaoPorDepartamento);
};

export const getEngajamentoPorMes = async (req: Request, res: Response) => {
  res.json(mockEngajamentoPorMes);
};

export const getAusenciasPorTipo = async (req: Request, res: Response) => {
  res.json(mockAusenciasPorTipo);
};

export const getAusenciasPorDepartamento = async (req: Request, res: Response) => {
  res.json(mockAusenciasPorDepartamento);
};

export const getFuncionariosComAusencias = async (req: Request, res: Response) => {
  res.json(mockFuncionariosComAusencias);
};

export const getOrcamentoPorDepartamento = async (req: Request, res: Response) => {
  res.json(mockOrcamentoPorDepartamento);
};

export const getNotificacoes = async (req: Request, res: Response) => {
  res.json(mockNotificacoes);
};

export const marcarNotificacaoLida = async (req: Request, res: Response) => {
  res.json({ success: true, id: parseInt(req.params.id) });
};

export const removerNotificacao = async (req: Request, res: Response) => {
  res.json({ success: true, id: parseInt(req.params.id) });
};
