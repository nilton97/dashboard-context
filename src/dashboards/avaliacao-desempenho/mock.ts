export const mockKPIs = {
  totalAvaliacoes: 342,
  mediaGeral: 3.8,
  excelentes: 89,
  percentualExcelentes: 26,
  atencao: 34,
  percentualAtencao: 10,
  variacaoTotal: 12,
  variacaoMedia: 5,
};

export const mockDesempenhoPorDepartamento = [
  { departamento: 'Recursos Humanos', ano: 2025, valor: 4.1 },
  { departamento: 'Financeiro', ano: 2025, valor: 3.9 },
  { departamento: 'Tecnologia', ano: 2025, valor: 4.3 },
  { departamento: 'Jurídico', ano: 2025, valor: 3.7 },
  { departamento: 'Administração', ano: 2025, valor: 3.5 },
  { departamento: 'Operações', ano: 2025, valor: 3.8 },
];

export const mockDistribuicaoNotas = [
  { categoria: 'Excelente (4.5-5.0)', quantidade: 89, percentual: 26 },
  { categoria: 'Bom (3.5-4.4)', quantidade: 152, percentual: 44 },
  { categoria: 'Regular (2.5-3.4)', quantidade: 67, percentual: 20 },
  { categoria: 'Atenção (1.0-2.4)', quantidade: 34, percentual: 10 },
];

export const mockDesempenhoPorComarca = [
  { departamento: 'Praia', ano: 2025, valor: 4.0 },
  { departamento: 'Mindelo', ano: 2025, valor: 3.8 },
  { departamento: 'Santa Cruz', ano: 2025, valor: 3.6 },
  { departamento: 'Assomada', ano: 2025, valor: 3.9 },
  { departamento: 'Sal', ano: 2025, valor: 4.1 },
];

export const mockTopPerformers = [
  { funcionario: 'Ana Silva', nota: 4.9, departamento: 'Tecnologia' },
  { funcionario: 'Carlos Mendes', nota: 4.8, departamento: 'Financeiro' },
  { funcionario: 'Maria Tavares', nota: 4.7, departamento: 'Recursos Humanos' },
  { funcionario: 'João Fonseca', nota: 4.7, departamento: 'Jurídico' },
  { funcionario: 'Sofia Lopes', nota: 4.6, departamento: 'Administração' },
];

export const mockDesempenhoPorObjetivo = [
  { departamento: 'Objetivo 1 - Produtividade', ano: 2025, valor: 4.2 },
  { departamento: 'Objetivo 2 - Qualidade', ano: 2025, valor: 3.9 },
  { departamento: 'Objetivo 3 - Inovação', ano: 2025, valor: 3.7 },
  { departamento: 'Objetivo 4 - Atendimento', ano: 2025, valor: 4.0 },
  { departamento: 'Objetivo 5 - Cumprimento', ano: 2025, valor: 4.3 },
];

export const mockRadarGrupoAlvo = [
  { departamento: 'Técnicos', ano: 2025, valor: 4.1 },
  { departamento: 'Gestores', ano: 2025, valor: 4.3 },
  { departamento: 'Administrativos', ano: 2025, valor: 3.7 },
  { departamento: 'Operacionais', ano: 2025, valor: 3.5 },
];
