import { Request, Response } from 'express';
import {
  mockKPIs,
  mockConcursos,
  mockFormacoes,
  mockFormacoesPorArea,
  mockEstatisticasFormacao,
  mockCandidatosPorConcurso,
  mockFuncionariosPorKPI,
} from './mock.js';

export const getKPIs = async (req: Request, res: Response) => {
  res.json(mockKPIs);
};

export const getConcursos = async (req: Request, res: Response) => {
  const { estado } = req.query;
  const data = estado
    ? mockConcursos.filter(c => c.estado.toLowerCase() === (estado as string).toLowerCase())
    : mockConcursos;
  res.json(data);
};

export const getFormacoes = async (req: Request, res: Response) => {
  const { estado } = req.query;
  const data = estado
    ? mockFormacoes.filter(f => f.estado.toLowerCase() === (estado as string).toLowerCase())
    : mockFormacoes;
  res.json(data);
};

export const getCandidatosPorConcurso = async (req: Request, res: Response) => {
  const { concursoId } = req.query;
  if (!concursoId) {
    return res.status(400).json({ error: 'concursoId é obrigatório' });
  }
  const candidatos = mockCandidatosPorConcurso[parseInt(concursoId as string)] || [];
  res.json(candidatos);
};

export const getFormacoesPorArea = async (req: Request, res: Response) => {
  res.json(mockFormacoesPorArea);
};

export const getEstatisticasFormacao = async (req: Request, res: Response) => {
  res.json(mockEstatisticasFormacao);
};

export const getFuncionariosPorKPI = async (req: Request, res: Response) => {
  res.json(mockFuncionariosPorKPI);
};
