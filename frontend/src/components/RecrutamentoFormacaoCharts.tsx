import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import ChartCard from './ChartCard';
import {
  Concurso,
  Formacao,
  FormacaoPorArea,
  EstatisticaFormacao,
} from '../types/recrutamento-formacao';

const COLORS = ['#203d64', '#3d6796', '#1e88e5', '#42a5f5', '#64b5f6', '#90caf9'];

interface RecrutamentoFormacaoChartsProps {
  concursosData: Concurso[];
  formacoesData: Formacao[];
  formacoesPorAreaData: FormacaoPorArea[];
  estatisticasFormacaoData: EstatisticaFormacao[];
}

export default function RecrutamentoFormacaoCharts({
  concursosData,
  formacoesData,
  formacoesPorAreaData,
  estatisticasFormacaoData,
}: RecrutamentoFormacaoChartsProps) {
  const concursosPorEstado = (concursosData || []).reduce((acc: any, item) => {
    acc[item.estado] = (acc[item.estado] || 0) + 1;
    return acc;
  }, {});

  const concursosPorEstadoArray = Object.entries(concursosPorEstado).map(([estado, quantidade]) => ({
    estado,
    quantidade,
  }));

  const formacoesPorEstado = (formacoesData || []).reduce((acc: any, item) => {
    acc[item.estado] = (acc[item.estado] || 0) + 1;
    return acc;
  }, {});

  const formacoesPorEstadoArray = Object.entries(formacoesPorEstado).map(([estado, quantidade]) => ({
    estado,
    quantidade,
  }));

  // Garantir arrays não vazios para evitar erros
  const safeFormacoesPorAreaData = formacoesPorAreaData || [];
  const safeEstatisticasFormacaoData = estatisticasFormacaoData || [];
  const safeConcursosData = concursosData || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {concursosPorEstadoArray.length > 0 ? (
        <ChartCard title="Concursos por Estado">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={concursosPorEstadoArray}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ estado, quantidade }) => `${estado}: ${quantidade}`}
                outerRadius={100}
                fill="#203d64"
                dataKey="quantidade"
              >
                {concursosPorEstadoArray.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      ) : (
        <ChartCard title="Concursos por Estado">
          <div className="flex items-center justify-center h-full">
            <p className="text-cofre-grayLight">Sem dados disponíveis</p>
          </div>
        </ChartCard>
      )}

      {formacoesPorEstadoArray.length > 0 ? (
        <ChartCard title="Formações por Estado">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formacoesPorEstadoArray}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ estado, quantidade }) => `${estado}: ${quantidade}`}
                outerRadius={100}
                fill="#203d64"
                dataKey="quantidade"
              >
                {formacoesPorEstadoArray.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      ) : (
        <ChartCard title="Formações por Estado">
          <div className="flex items-center justify-center h-full">
            <p className="text-cofre-grayLight">Sem dados disponíveis</p>
          </div>
        </ChartCard>
      )}

      {safeFormacoesPorAreaData.length > 0 ? (
        <ChartCard title="Formações por Área">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={safeFormacoesPorAreaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="area"
                tick={{ fill: '#666666', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis tick={{ fill: '#666666', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="quantidade" fill="#203d64" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      ) : (
        <ChartCard title="Formações por Área">
          <div className="flex items-center justify-center h-full">
            <p className="text-cofre-grayLight">Sem dados disponíveis</p>
          </div>
        </ChartCard>
      )}

      {safeEstatisticasFormacaoData.length > 0 ? (
        <ChartCard title="Estatísticas de Formação ao Longo do Tempo">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={safeEstatisticasFormacaoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fill: '#666666', fontSize: 12 }} />
              <YAxis tick={{ fill: '#666666', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="formacoes" 
                stroke="#203d64" 
                strokeWidth={2}
                dot={{ fill: '#203d64', r: 4 }}
                activeDot={{ r: 6 }}
                name="Formações"
              />
              <Line 
                type="monotone" 
                dataKey="funcionarios" 
                stroke="#42a5f5" 
                strokeWidth={2}
                dot={{ fill: '#42a5f5', r: 4 }}
                activeDot={{ r: 6 }}
                name="Funcionários"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      ) : (
        <ChartCard title="Estatísticas de Formação ao Longo do Tempo">
          <div className="flex items-center justify-center h-full">
            <p className="text-cofre-grayLight">Sem dados disponíveis</p>
          </div>
        </ChartCard>
      )}

      {safeFormacoesPorAreaData.length > 0 ? (
        <ChartCard title="Horas de Formação por Área">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={safeFormacoesPorAreaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="area"
                tick={{ fill: '#666666', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis tick={{ fill: '#666666', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="horas" fill="#42a5f5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      ) : (
        <ChartCard title="Horas de Formação por Área">
          <div className="flex items-center justify-center h-full">
            <p className="text-cofre-grayLight">Sem dados disponíveis</p>
          </div>
        </ChartCard>
      )}

      {safeConcursosData.length > 0 ? (
        <ChartCard title="Candidatos por Concurso">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={safeConcursosData.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="nome"
                tick={{ fill: '#666666', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={120}
              />
              <YAxis tick={{ fill: '#666666', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="totalCandidatos" fill="#1e88e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      ) : (
        <ChartCard title="Candidatos por Concurso">
          <div className="flex items-center justify-center h-full">
            <p className="text-cofre-grayLight">Sem dados disponíveis</p>
          </div>
        </ChartCard>
      )}
    </div>
  );
}
