export interface KPIRecrutamentoFormacao {
  totalConcursos: number;
  totalCandidatos: number;
  totalFormacoes: number;
  totalFuncionariosFormados: number;
  taxaSucessoConcursos: number;
  variacaoConcursos: number;
  variacaoFormacoes: number;
  concursosEmAndamento: number;
  concursosFinalizados: number;
  formacoesEmAndamento: number;
  formacoesConcluidas: number;
  taxaConclusaoFormacoes: number;
  mediaHorasFormacao: number;
  totalHorasFormacao: number;
  variacaoCandidatos: number;
}

export interface Concurso {
  id: number;
  nome: string;
  tipo: string;
  estado: string;
  totalCandidatos: number;
  dataInicio: string;
  dataFim: string;
}

export interface Formacao {
  id: number;
  funcionarioNome: string;
  areaFormacao: string;
  tipoFormacao: string;
  horas: number;
  estado: string;
  dataInicio: string;
  dataFim: string;
}

export interface FormacaoPorArea {
  area: string;
  quantidade: number;
  horas: number;
  funcionarios: number;
}

export interface EstatisticaFormacao {
  mes: string;
  formacoes: number;
  funcionarios: number;
}

export interface Candidato {
  id: number;
  nome: string;
  nif: number;
  nota: number;
  classificacao: number;
  foto?: string;
}

export interface FuncionarioFormado {
  id: number;
  nome: string;
  departamento: string;
  formacoesConcluidas: number;
  totalHoras: number;
  foto?: string;
}
