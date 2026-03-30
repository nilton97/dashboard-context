import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from './ChartCard';
import { DesempenhoPorDepartamento, DistribuicaoNotas, TopPerformers, DesempenhoPorComarca, DesempenhoPorObjetivo, RadarPorGrupoAlvo } from '../types';

const COLORS = ['#203d64', '#3d6796', '#1e88e5', '#42a5f5', '#64b5f6', '#90caf9'];

interface ChartsProps {
  departamentoData: DesempenhoPorDepartamento[];
  distribuicaoData: DistribuicaoNotas[];
  comarcaData: DesempenhoPorComarca[];
  topPerformersData: TopPerformers[];
  objetivoData: DesempenhoPorObjetivo[];
  radarData: RadarPorGrupoAlvo[];
}

export default function Charts({
  departamentoData,
  distribuicaoData,
  comarcaData,
  topPerformersData,
  objetivoData,
  radarData,
}: ChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <ChartCard title="Desempenho por Departamento">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departamentoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="departamento" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
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
            <Bar dataKey="valor" fill="#203d64" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Distribuição de Notas">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distribuicaoData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ categoria, percentual }) => `${categoria}: ${percentual.toFixed(1)}%`}
              outerRadius={100}
              fill="#203d64"
              dataKey="quantidade"
            >
              {distribuicaoData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Desempenho por Comarca">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comarcaData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="comarca" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="valor" fill="#764ba2" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Top 5 Performers">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topPerformersData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis 
              dataKey="funcionario" 
              type="category" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              width={120}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="nota" fill="#10b981" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Desempenho por Objetivo">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={objetivoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="objetivo" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
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
            <Bar dataKey="valor" fill="#1e88e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Radar por Grupo Alvo">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis 
              dataKey="grupoAlvo" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Radar
              name="Valor"
              dataKey="valor"
              stroke="#667eea"
              fill="#667eea"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
