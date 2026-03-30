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
} from '../types/rh';

const COLORS = ['#203d64', '#3d6796', '#1e88e5', '#42a5f5', '#64b5f6', '#90caf9'];

interface RHChartsProps {
  funcionariosPorDeptData: FuncionariosPorDepartamento[];
  distribuicaoGeneroData: DistribuicaoGenero[];
  faixasEtariasData: FaixaEtaria[];
  antiguidadeData: Antiguidade[];
  habilitacoesData: HabilitacaoLiteraria[];
  rotatividadeData: RotatividadePorDepartamento[];
  satisfacaoData: SatisfacaoPorDepartamento[];
  engajamentoData: EngajamentoPorMes[];
  ausenciasPorTipoData: AusenciaPorTipo[];
  ausenciasPorDeptData: AusenciaPorDepartamento[];
}

export default function RHCharts({
  funcionariosPorDeptData,
  distribuicaoGeneroData,
  faixasEtariasData,
  antiguidadeData,
  habilitacoesData,
  rotatividadeData,
  satisfacaoData,
  engajamentoData,
  ausenciasPorTipoData,
  ausenciasPorDeptData,
}: RHChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <ChartCard title="Funcionários por Departamento">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={funcionariosPorDeptData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="departamento"
              tick={{ fill: '#666666', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
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

      <ChartCard title="Distribuição por Gênero">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distribuicaoGeneroData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ genero, percentual }) => `${genero}: ${percentual.toFixed(1)}%`}
              outerRadius={100}
              fill="#203d64"
              dataKey="quantidade"
            >
              {distribuicaoGeneroData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Faixas Etárias">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={faixasEtariasData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="faixa" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="quantidade" fill="#764ba2" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Antiguidade">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={antiguidadeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="periodo" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="quantidade" fill="#1e88e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Habilitações Literárias">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={habilitacoesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ nivel, percentual }) => `${nivel}: ${percentual.toFixed(1)}%`}
              outerRadius={100}
              fill="#203d64"
              dataKey="quantidade"
            >
              {habilitacoesData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Rotatividade por Departamento">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rotatividadeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="departamento"
              tick={{ fill: '#666666', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="taxa" fill="#e53935" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Satisfação por Departamento">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={satisfacaoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="departamento"
              tick={{ fill: '#666666', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis 
              tick={{ fill: '#666666', fontSize: 12 }}
              domain={[0, 5]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="satisfacao" fill="#42a5f5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Engajamento ao Longo do Tempo">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={engajamentoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="mes" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis 
              tick={{ fill: '#666666', fontSize: 12 }}
              domain={[70, 85]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="engajamento" 
              stroke="#203d64" 
              strokeWidth={2}
              dot={{ fill: '#203d64', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Ausências por Tipo">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ausenciasPorTipoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="tipo"
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
            <Bar dataKey="quantidade" fill="#e53935" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Ausências por Departamento">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ausenciasPorDeptData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="departamento"
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
            <Bar dataKey="totalAusencias" fill="#ff9800" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
