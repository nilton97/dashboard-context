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

export interface DesempenhoPorComarca {
  comarca: string;
  valor: number;
}

export interface DesempenhoPorObjetivo {
  objetivo: string;
  valor: number;
}

export interface RadarPorGrupoAlvo {
  grupoAlvo: string;
  valor: number;
}
