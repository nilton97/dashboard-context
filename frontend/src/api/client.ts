import type {
  KPIAvaliacaoDesempenho,
  DesempenhoPorDepartamento,
  DistribuicaoNotas,
  DesempenhoPorComarca,
  TopPerformers,
  DesempenhoPorObjetivo,
  RadarPorGrupoAlvo,
} from '../types';
import type {
  KPIRH,
  FuncionariosPorDepartamento,
  DistribuicaoGenero,
  FaixaEtaria,
  Antiguidade,
  HabilitacaoLiteraria,
  RotatividadePorDepartamento,
  SatisfacaoPorDepartamento,
  EngajamentoPorMes,
  AusenciaPorTipo,
  AusenciaPorDepartamento,
  FuncionarioComAusencia,
  OrcamentoPorDepartamento,
  Notificacao,
} from '../types/rh';
import type {
  KPIRecrutamentoFormacao,
  Concurso,
  Formacao,
  FormacaoPorArea,
  EstatisticaFormacao,
  FuncionarioFormado,
} from '../types/recrutamento-formacao';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function fetchAPI<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
  try {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    
    const url = `${API_BASE_URL}${endpoint}${queryString ? '?' + queryString : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const avaliacaoDesempenhoAPI = {
  getKPIs: () => fetchAPI<KPIAvaliacaoDesempenho>('/api/avaliacao-desempenho/kpis'),
  getDesempenhoPorDepartamento: (ano: number) => 
    fetchAPI<DesempenhoPorDepartamento[]>('/api/avaliacao-desempenho/desempenho-departamento', { ano }),
  getDistribuicaoNotas: () => 
    fetchAPI<DistribuicaoNotas[]>('/api/avaliacao-desempenho/distribuicao-notas'),
  getDesempenhoPorComarca: (ano: number) => 
    fetchAPI<DesempenhoPorComarca[]>('/api/avaliacao-desempenho/desempenho-comarca', { ano }),
  getTopPerformers: (limit: number = 5) => 
    fetchAPI<TopPerformers[]>('/api/avaliacao-desempenho/top-performers', { limit }),
  getDesempenhoPorObjetivo: (ano: number) => 
    fetchAPI<DesempenhoPorObjetivo[]>('/api/avaliacao-desempenho/desempenho-objetivo', { ano }),
  getRadarPorGrupoAlvo: (ano: number) => 
    fetchAPI<RadarPorGrupoAlvo[]>('/api/avaliacao-desempenho/radar-grupo-alvo', { ano }),
  getFuncionariosPorKPI: (tipo: string, ano?: number) => 
    fetchAPI<any[]>('/api/avaliacao-desempenho/funcionarios-kpi', { tipo, ano }),
};

export const rhAPI = {
  getKPIs: () => fetchAPI<KPIRH>('/api/rh/kpis'),
  getFuncionariosPorDepartamento: (ano: number) => 
    fetchAPI<FuncionariosPorDepartamento[]>('/api/rh/funcionarios-departamento', { ano }),
  getDistribuicaoGenero: () => 
    fetchAPI<DistribuicaoGenero[]>('/api/rh/distribuicao-genero'),
  getFaixasEtarias: () => 
    fetchAPI<FaixaEtaria[]>('/api/rh/faixas-etarias'),
  getDetalhesAntiguidade: (ano: number) => 
    fetchAPI<Antiguidade[]>('/api/rh/antiguidade', { ano }),
  getHabilitacoesLiterarias: () => 
    fetchAPI<HabilitacaoLiteraria[]>('/api/rh/habilitacoes-literarias'),
  getRotatividadePorDepartamento: () => 
    fetchAPI<RotatividadePorDepartamento[]>('/api/rh/rotatividade-departamento'),
  getSatisfacaoPorDepartamento: () => 
    fetchAPI<SatisfacaoPorDepartamento[]>('/api/rh/satisfacao-departamento'),
  getEngajamentoPorMes: (dataInicio?: string, dataFim?: string) => 
    fetchAPI<EngajamentoPorMes[]>('/api/rh/engajamento-mes', { dataInicio, dataFim }),
  getAusenciasPorTipo: () => 
    fetchAPI<AusenciaPorTipo[]>('/api/rh/ausencias-tipo'),
  getAusenciasPorDepartamento: () => 
    fetchAPI<AusenciaPorDepartamento[]>('/api/rh/ausencias-departamento'),
  getFuncionariosComAusencias: (tipo?: string, departamento?: string, dataInicio?: string, dataFim?: string) => 
    fetchAPI<FuncionarioComAusencia[]>('/api/rh/funcionarios-ausencias', { tipo, departamento, dataInicio, dataFim }),
  getOrcamentoPorDepartamento: (ano?: number) => 
    fetchAPI<OrcamentoPorDepartamento[]>('/api/rh/orcamento-departamento', { ano }),
  getNotificacoes: () => fetchAPI<Notificacao[]>('/api/rh/notificacoes'),
  marcarNotificacaoLida: (id: number) => 
    fetch(`${API_BASE_URL}/api/rh/notificacoes/${id}/lida`, { method: 'PUT' }).then(r => r.json()),
  removerNotificacao: (id: number) => 
    fetch(`${API_BASE_URL}/api/rh/notificacoes/${id}`, { method: 'DELETE' }).then(r => r.json()),
};

export const recrutamentoFormacaoAPI = {
  getKPIs: () => fetchAPI<KPIRecrutamentoFormacao>('/api/recrutamento-formacao/kpis'),
  getConcursos: (estado?: string, ano?: number) => 
    fetchAPI<Concurso[]>('/api/recrutamento-formacao/concursos', { estado, ano }),
  getFormacoes: (estado?: string, ano?: number) => 
    fetchAPI<Formacao[]>('/api/recrutamento-formacao/formacoes', { estado, ano }),
  getCandidatosPorConcurso: (concursoId: number) => 
    fetchAPI<any[]>('/api/recrutamento-formacao/candidatos-concurso', { concursoId }),
  getFormacoesPorArea: (ano?: number) => 
    fetchAPI<FormacaoPorArea[]>('/api/recrutamento-formacao/formacoes-area', { ano }),
  getEstatisticasFormacao: (ano?: number) => 
    fetchAPI<EstatisticaFormacao[]>('/api/recrutamento-formacao/estatisticas-formacao', { ano }),
  getFuncionariosPorKPI: (tipo: string, ano?: number) => 
    fetchAPI<FuncionarioFormado[]>('/api/recrutamento-formacao/funcionarios-kpi', { tipo, ano }),
};
