export const mockKPIs = {
  totalFuncionarios: 428,
  totalDepartamentos: 12,
  totalEquipas: 34,
  variacaoFuncionarios: 5,
  variacaoDepartamentos: 0,
  variacaoEquipas: 2,
  taxaRotatividade: 8.5,
  taxaAbsenteismo: 3.2,
  tempoMedioContratacao: 22,
  taxaRetencao: 91.5,
  taxaPromocaoInterna: 34,
  satisfacaoFuncionarios: 78,
  custoPorContratacao: 1850,
  taxaDiversidade: 52,
  tempoMedioPermanencia: 6.4,
  taxaConclusaoTreinamentos: 87,
  taxaEngajamento: 74,
  variacaoRotatividade: -1.2,
  variacaoAbsenteismo: 0.3,
  variacaoRetencao: 2.1,
  totalAusencias: 143,
  diasAusencia: 612,
  ausenciasJustificadas: 118,
  ausenciasNaoJustificadas: 25,
  taxaAusenciasJustificadas: 82.5,
  taxaAusenciasNaoJustificadas: 17.5,
  mediaDiasAusenciaPorFuncionario: 1.4,
  funcionariosComAusencia: 98,
  variacaoTotalAusencias: -5,
  variacaoDiasAusencia: -8,
};

export const mockFuncionariosPorDepartamento = [
  { departamento: 'Recursos Humanos', quantidade: 45 },
  { departamento: 'Financeiro', quantidade: 62 },
  { departamento: 'Tecnologia', quantidade: 78 },
  { departamento: 'Jurídico', quantidade: 31 },
  { departamento: 'Administração', quantidade: 54 },
  { departamento: 'Operações', quantidade: 89 },
  { departamento: 'Comunicação', quantidade: 28 },
  { departamento: 'Planeamento', quantidade: 41 },
];

export const mockDistribuicaoGenero = [
  { genero: 'Masculino', quantidade: 228, percentual: 53 },
  { genero: 'Feminino', quantidade: 200, percentual: 47 },
];

export const mockFaixasEtarias = [
  { faixa: '18-25', quantidade: 42, percentual: 10 },
  { faixa: '26-35', quantidade: 128, percentual: 30 },
  { faixa: '36-45', quantidade: 154, percentual: 36 },
  { faixa: '46-55', quantidade: 81, percentual: 19 },
  { faixa: '56+', quantidade: 23, percentual: 5 },
];

export const mockAntiguidade = [
  { periodo: 'Menos de 1 ano', quantidade: 38 },
  { periodo: '1-3 anos', quantidade: 95 },
  { periodo: '3-5 anos', quantidade: 112 },
  { periodo: '5-10 anos', quantidade: 124 },
  { periodo: 'Mais de 10 anos', quantidade: 59 },
];

export const mockHabilitacoesLiterarias = [
  { nivel: 'Ensino Básico', quantidade: 34, percentual: 8 },
  { nivel: 'Ensino Secundário', quantidade: 89, percentual: 21 },
  { nivel: 'Bacharelato', quantidade: 67, percentual: 16 },
  { nivel: 'Licenciatura', quantidade: 178, percentual: 42 },
  { nivel: 'Mestrado', quantidade: 51, percentual: 12 },
  { nivel: 'Doutoramento', quantidade: 9, percentual: 2 },
];

export const mockRotatividadePorDepartamento = [
  { departamento: 'Recursos Humanos', taxa: 6.2 },
  { departamento: 'Financeiro', taxa: 4.8 },
  { departamento: 'Tecnologia', taxa: 12.5 },
  { departamento: 'Jurídico', taxa: 3.2 },
  { departamento: 'Administração', taxa: 5.1 },
  { departamento: 'Operações', taxa: 9.8 },
];

export const mockSatisfacaoPorDepartamento = [
  { departamento: 'Recursos Humanos', satisfacao: 82 },
  { departamento: 'Financeiro', satisfacao: 75 },
  { departamento: 'Tecnologia', satisfacao: 88 },
  { departamento: 'Jurídico', satisfacao: 71 },
  { departamento: 'Administração', satisfacao: 69 },
  { departamento: 'Operações', satisfacao: 74 },
];

export const mockEngajamentoPorMes = [
  { mes: 'Jan', engajamento: 72 },
  { mes: 'Fev', engajamento: 74 },
  { mes: 'Mar', engajamento: 71 },
  { mes: 'Abr', engajamento: 76 },
  { mes: 'Mai', engajamento: 78 },
  { mes: 'Jun', engajamento: 75 },
  { mes: 'Jul', engajamento: 73 },
  { mes: 'Ago', engajamento: 70 },
  { mes: 'Set', engajamento: 77 },
  { mes: 'Out', engajamento: 79 },
  { mes: 'Nov', engajamento: 81 },
  { mes: 'Dez', engajamento: 74 },
];

export const mockAusenciasPorTipo = [
  { tipo: 'Doença', quantidade: 68, dias: 312, percentual: 47.6 },
  { tipo: 'Férias', quantidade: 35, dias: 175, percentual: 24.5 },
  { tipo: 'Licença', quantidade: 18, dias: 72, percentual: 12.6 },
  { tipo: 'Injustificada', quantidade: 22, dias: 53, percentual: 15.4 },
];

export const mockAusenciasPorDepartamento = [
  { departamento: 'Operações', totalAusencias: 38, diasAusencia: 162, taxa: 4.2 },
  { departamento: 'Tecnologia', totalAusencias: 29, diasAusencia: 124, taxa: 3.7 },
  { departamento: 'Administração', totalAusencias: 24, diasAusencia: 98, taxa: 4.4 },
  { departamento: 'Financeiro', totalAusencias: 21, diasAusencia: 89, taxa: 3.4 },
  { departamento: 'Recursos Humanos', totalAusencias: 18, diasAusencia: 76, taxa: 4.0 },
  { departamento: 'Jurídico', totalAusencias: 13, diasAusencia: 63, taxa: 4.2 },
];

export const mockFuncionariosComAusencias = [
  { id: 1, nome: 'António Ferreira', departamento: 'Operações', totalAusencias: 8, diasAusencia: 34, tipoAusencia: 'Doença' },
  { id: 2, nome: 'Beatriz Monteiro', departamento: 'Administração', totalAusencias: 6, diasAusencia: 28, tipoAusencia: 'Licença' },
  { id: 3, nome: 'César Rodrigues', departamento: 'Tecnologia', totalAusencias: 5, diasAusencia: 22, tipoAusencia: 'Doença' },
  { id: 4, nome: 'Diana Costa', departamento: 'Financeiro', totalAusencias: 5, diasAusencia: 20, tipoAusencia: 'Injustificada' },
  { id: 5, nome: 'Eduardo Lima', departamento: 'Recursos Humanos', totalAusencias: 4, diasAusencia: 18, tipoAusencia: 'Doença' },
];

export const mockOrcamentoPorDepartamento = [
  { departamento: 'Recursos Humanos', orcamentoAprovado: 850000, orcamentoExecutado: 712000, percentualExecucao: 83.8, saldo: 138000 },
  { departamento: 'Financeiro', orcamentoAprovado: 1200000, orcamentoExecutado: 1089000, percentualExecucao: 90.8, saldo: 111000 },
  { departamento: 'Tecnologia', orcamentoAprovado: 2100000, orcamentoExecutado: 1876000, percentualExecucao: 89.3, saldo: 224000 },
  { departamento: 'Jurídico', orcamentoAprovado: 650000, orcamentoExecutado: 598000, percentualExecucao: 92.0, saldo: 52000 },
  { departamento: 'Administração', orcamentoAprovado: 950000, orcamentoExecutado: 821000, percentualExecucao: 86.4, saldo: 129000 },
  { departamento: 'Operações', orcamentoAprovado: 3200000, orcamentoExecutado: 2987000, percentualExecucao: 93.3, saldo: 213000 },
];

export const mockNotificacoes = [
  {
    id: 1,
    tipo: 'warning' as const,
    titulo: 'Contratos a expirar',
    mensagem: '5 contratos expiram nos próximos 30 dias.',
    data: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    lida: false,
    departamento: 'Recursos Humanos',
  },
  {
    id: 2,
    tipo: 'info' as const,
    titulo: 'Avaliações pendentes',
    mensagem: '12 avaliações de desempenho aguardam conclusão.',
    data: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    lida: false,
    departamento: 'Gestão',
  },
  {
    id: 3,
    tipo: 'success' as const,
    titulo: 'Meta de formação atingida',
    mensagem: 'O departamento de Tecnologia atingiu 100% da meta de formação.',
    data: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    lida: true,
    departamento: 'Tecnologia',
  },
  {
    id: 4,
    tipo: 'error' as const,
    titulo: 'Ausências não justificadas',
    mensagem: '3 funcionários têm ausências por justificar há mais de 5 dias.',
    data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lida: false,
    departamento: 'Operações',
  },
];
