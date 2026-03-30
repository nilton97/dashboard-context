// Tipos para Avaliação de Desempenho
export interface AvaliacaoDesempenho {
  id: number;
  funcionarioId: number;
  funcionarioNome: string;
  objetivoId: number;
  objetivoNome: string;
  metaId: number;
  metaNome: string;
  grupoAlvo: string;
  equipe: string;
  avaliador: string;
  entidade: string;
  dataAvaliacao: string;
  departamentoDirecao: string;
  departamentoDirecaoId: number;
  ano: number;
  prazo: string;
  nota: number;
  comentario: string;
  comarcaId: number;
  comarcaNome: string;
  equipeId: number;
}

export interface KPIAvaliacaoDesempenho {
  totalAvaliacoes: number;
  mediaGeral: number;
  excelentes: number;
  percentualExcelentes: number;
  atencao: number;
  percentualAtencao: number;
  variacaoTotal: number;
  variacaoMedia: number;
}

export interface DesempenhoPorDepartamento {
  departamento: string;
  ano: number;
  valor: number;
}

export interface DistribuicaoNotas {
  categoria: string;
  quantidade: number;
  percentual: number;
}

export interface TopPerformers {
  funcionario: string;
  nota: number;
  departamento: string;
}

// Tipos para RH
export interface Funcionario {
  id: number;
  funcionario: string;
  nif: number;
  sexo: string;
  estadoCivil: string;
  dataNascimento: string;
  departamentoId: number;
  departamentoNome: string;
  equipaId: number;
  equipaNome: string;
  funcao: string;
  categoria: string;
  situacaoAtual: string;
  salarioBase: number;
  anoServico: number;
  email: string;
  telefone: string;
}

export interface KPIRH {
  totalFuncionarios: number;
  totalDepartamentos: number;
  totalEquipas: number;
  variacaoFuncionarios: number;
  variacaoDepartamentos: number;
  variacaoEquipas: number;
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

// Tipos para Recrutamento/Formação
export interface Concurso {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  estado: string;
  tipo: string;
  totalCandidatos: number;
}

export interface Formacao {
  id: number;
  funcionarioId: number;
  funcionarioNome: string;
  areaFormacao: string;
  tipoFormacao: string;
  dataInicio: string;
  dataFim: string;
  horas: number;
  estado: string;
}

export interface KPIRecrutamentoFormacao {
  totalConcursos: number;
  totalCandidatos: number;
  totalFormacoes: number;
  totalFuncionariosFormados: number;
  taxaSucessoConcursos: number;
  variacaoConcursos: number;
  variacaoFormacoes: number;
}
