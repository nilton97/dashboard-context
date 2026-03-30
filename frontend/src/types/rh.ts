export interface KPIRH {
  totalFuncionarios: number;
  totalDepartamentos: number;
  totalEquipas: number;
  variacaoFuncionarios: number;
  variacaoDepartamentos: number;
  variacaoEquipas: number;
  // Novos indicadores avançados
  taxaRotatividade: number;
  taxaAbsenteismo: number;
  tempoMedioContratacao: number;
  taxaRetencao: number;
  taxaPromocaoInterna: number;
  satisfacaoFuncionarios: number;
  custoPorContratacao: number;
  taxaDiversidade: number;
  tempoMedioPermanencia: number;
  taxaConclusaoTreinamentos: number;
  taxaEngajamento: number;
  variacaoRotatividade: number;
  variacaoAbsenteismo: number;
  variacaoRetencao: number;
  // Indicadores de Ausências
  totalAusencias: number;
  diasAusencia: number;
  ausenciasJustificadas: number;
  ausenciasNaoJustificadas: number;
  taxaAusenciasJustificadas: number;
  taxaAusenciasNaoJustificadas: number;
  mediaDiasAusenciaPorFuncionario: number;
  funcionariosComAusencia: number;
  variacaoTotalAusencias: number;
  variacaoDiasAusencia: number;
}

export interface FuncionariosPorDepartamento {
  departamento: string;
  quantidade: number;
}

export interface DistribuicaoGenero {
  genero: string;
  quantidade: number;
  percentual: number;
}

export interface FaixaEtaria {
  faixa: string;
  quantidade: number;
  percentual: number;
}

export interface Antiguidade {
  periodo: string;
  quantidade: number;
}

export interface HabilitacaoLiteraria {
  nivel: string;
  quantidade: number;
  percentual: number;
}

export interface RotatividadePorDepartamento {
  departamento: string;
  taxa: number;
}

export interface SatisfacaoPorDepartamento {
  departamento: string;
  satisfacao: number;
}

export interface EngajamentoPorMes {
  mes: string;
  engajamento: number;
}

export interface AusenciaPorTipo {
  tipo: string;
  quantidade: number;
  dias: number;
  percentual: number;
}

export interface AusenciaPorDepartamento {
  departamento: string;
  totalAusencias: number;
  diasAusencia: number;
  taxa: number;
}

export interface FuncionarioComAusencia {
  id: number;
  nome: string;
  departamento: string;
  totalAusencias: number;
  diasAusencia: number;
  tipoAusencia: string;
  foto?: string;
  dataInicio?: string;
  dataFim?: string;
}

export interface OrcamentoPorDepartamento {
  departamento: string;
  orcamentoAprovado: number;
  orcamentoExecutado: number;
  percentualExecucao: number;
  saldo: number;
}

export interface Notificacao {
  id: number;
  tipo: 'info' | 'warning' | 'success' | 'error';
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
  departamento?: string;
  funcionarioNome?: string;
  funcionarioFoto?: string;
  acao?: string;
}
