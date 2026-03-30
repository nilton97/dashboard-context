import { Request, Response } from 'express';
import {
  mockKPIs,
  mockDesempenhoPorDepartamento,
  mockDistribuicaoNotas,
  mockDesempenhoPorComarca,
  mockTopPerformers,
  mockDesempenhoPorObjetivo,
  mockRadarGrupoAlvo,
} from './mock.js';

export const getKPIs = async (req: Request, res: Response) => {
  res.json(mockKPIs);
};

export const getDesempenhoPorDepartamento = async (req: Request, res: Response) => {
  res.json(mockDesempenhoPorDepartamento);
};

export const getDistribuicaoNotas = async (req: Request, res: Response) => {
  res.json(mockDistribuicaoNotas);
};

export const getDesempenhoPorComarca = async (req: Request, res: Response) => {
  res.json(mockDesempenhoPorComarca);
};

export const getTopPerformers = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 5;
  res.json(mockTopPerformers.slice(0, limit));
};

export const getDesempenhoPorObjetivo = async (req: Request, res: Response) => {
  res.json(mockDesempenhoPorObjetivo);
};

export const getRadarPorGrupoAlvo = async (req: Request, res: Response) => {
  res.json(mockRadarGrupoAlvo);
};

export const getFuncionariosPorKPI = async (req: Request, res: Response) => {
  res.json([]);
};
