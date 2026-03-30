export const mockKPIs = {
  totalConcursos: 18,
  totalCandidatos: 342,
  totalFormacoes: 56,
  totalFuncionariosFormados: 214,
  taxaSucessoConcursos: 72,
  variacaoConcursos: 3,
  variacaoFormacoes: 8,
  concursosEmAndamento: 5,
  concursosFinalizados: 13,
  formacoesEmAndamento: 12,
  formacoesConcluidas: 44,
  taxaConclusaoFormacoes: 87,
  mediaHorasFormacao: 24,
  totalHorasFormacao: 5136,
  variacaoCandidatos: 15,
};

export const mockConcursos = [
  { id: 1, nome: 'Técnico de Informática', tipo: 'Externo', estado: 'Em andamento', totalCandidatos: 48, dataInicio: '2025-01-10', dataFim: '2025-03-10' },
  { id: 2, nome: 'Gestor Financeiro', tipo: 'Interno', estado: 'Finalizado', totalCandidatos: 12, dataInicio: '2024-11-01', dataFim: '2025-01-15' },
  { id: 3, nome: 'Técnico Jurídico', tipo: 'Externo', estado: 'Em andamento', totalCandidatos: 31, dataInicio: '2025-02-01', dataFim: '2025-04-01' },
  { id: 4, nome: 'Assistente Administrativo', tipo: 'Externo', estado: 'Finalizado', totalCandidatos: 67, dataInicio: '2024-09-15', dataFim: '2024-12-15' },
  { id: 5, nome: 'Analista de Dados', tipo: 'Interno', estado: 'Em andamento', totalCandidatos: 8, dataInicio: '2025-03-01', dataFim: '2025-04-30' },
  { id: 6, nome: 'Técnico de RH', tipo: 'Externo', estado: 'Finalizado', totalCandidatos: 24, dataInicio: '2024-10-01', dataFim: '2024-12-01' },
];

export const mockFormacoes = [
  { id: 1, funcionarioNome: 'Ana Silva', areaFormacao: 'Tecnologia', tipoFormacao: 'Presencial', horas: 40, estado: 'Concluída', dataInicio: '2025-01-15', dataFim: '2025-02-15' },
  { id: 2, funcionarioNome: 'Carlos Mendes', areaFormacao: 'Gestão', tipoFormacao: 'Online', horas: 20, estado: 'Em andamento', dataInicio: '2025-03-01', dataFim: '2025-04-01' },
  { id: 3, funcionarioNome: 'Maria Tavares', areaFormacao: 'Direito', tipoFormacao: 'Presencial', horas: 60, estado: 'Concluída', dataInicio: '2024-11-01', dataFim: '2025-01-31' },
  { id: 4, funcionarioNome: 'João Fonseca', areaFormacao: 'Finanças', tipoFormacao: 'Online', horas: 30, estado: 'Concluída', dataInicio: '2025-01-01', dataFim: '2025-02-01' },
  { id: 5, funcionarioNome: 'Sofia Lopes', areaFormacao: 'Recursos Humanos', tipoFormacao: 'Presencial', horas: 24, estado: 'Em andamento', dataInicio: '2025-03-10', dataFim: '2025-04-10' },
  { id: 6, funcionarioNome: 'Bruno Alves', areaFormacao: 'Tecnologia', tipoFormacao: 'Online', horas: 16, estado: 'Concluída', dataInicio: '2025-02-01', dataFim: '2025-02-28' },
];

export const mockFormacoesPorArea = [
  { area: 'Tecnologia', quantidade: 18, horas: 1440, funcionarios: 62 },
  { area: 'Gestão', quantidade: 12, horas: 720, funcionarios: 48 },
  { area: 'Finanças', quantidade: 9, horas: 540, funcionarios: 34 },
  { area: 'Direito', quantidade: 7, horas: 840, funcionarios: 28 },
  { area: 'Recursos Humanos', quantidade: 6, horas: 288, funcionarios: 22 },
  { area: 'Operações', quantidade: 4, horas: 192, funcionarios: 20 },
];

export const mockEstatisticasFormacao = [
  { mes: 'Jan', formacoes: 4, funcionarios: 18 },
  { mes: 'Fev', formacoes: 6, funcionarios: 24 },
  { mes: 'Mar', formacoes: 5, funcionarios: 21 },
  { mes: 'Abr', formacoes: 8, funcionarios: 32 },
  { mes: 'Mai', formacoes: 7, funcionarios: 28 },
  { mes: 'Jun', formacoes: 9, funcionarios: 36 },
  { mes: 'Jul', formacoes: 5, funcionarios: 20 },
  { mes: 'Ago', formacoes: 3, funcionarios: 12 },
  { mes: 'Set', formacoes: 6, funcionarios: 24 },
  { mes: 'Out', formacoes: 8, funcionarios: 31 },
  { mes: 'Nov', formacoes: 7, funcionarios: 27 },
  { mes: 'Dez', formacoes: 4, funcionarios: 16 },
];

export const mockCandidatosPorConcurso: Record<number, any[]> = {
  1: [
    { id: 1, nome: 'Rui Barbosa', nif: 123456789, nota: 18.5, classificacao: 1 },
    { id: 2, nome: 'Filipa Neves', nif: 234567890, nota: 17.8, classificacao: 2 },
    { id: 3, nome: 'Marco Silva', nif: 345678901, nota: 17.2, classificacao: 3 },
  ],
  2: [
    { id: 4, nome: 'Carla Duarte', nif: 456789012, nota: 19.0, classificacao: 1 },
    { id: 5, nome: 'Tiago Melo', nif: 567890123, nota: 16.5, classificacao: 2 },
  ],
};

export const mockFuncionariosPorKPI = [
  { id: 1, nome: 'Ana Silva', departamento: 'Tecnologia', formacoesConcluidas: 5, totalHoras: 120 },
  { id: 2, nome: 'Carlos Mendes', departamento: 'Financeiro', formacoesConcluidas: 4, totalHoras: 96 },
  { id: 3, nome: 'Maria Tavares', departamento: 'Recursos Humanos', formacoesConcluidas: 4, totalHoras: 88 },
  { id: 4, nome: 'João Fonseca', departamento: 'Jurídico', formacoesConcluidas: 3, totalHoras: 72 },
  { id: 5, nome: 'Sofia Lopes', departamento: 'Administração', formacoesConcluidas: 3, totalHoras: 64 },
];
