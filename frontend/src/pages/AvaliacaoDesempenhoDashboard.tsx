import { useState, useEffect } from 'react';
import { Users, Award, AlertCircle, BarChart3 } from 'lucide-react';
import KPICard from '../components/KPICard';
import Charts from '../components/Charts';
import FilterBar from '../components/FilterBar';
import Modal from '../components/Modal';
import FuncionariosList from '../components/FuncionariosList';
import DashboardNavigation from '../components/DashboardNavigation';
import { avaliacaoDesempenhoAPI } from '../api/client';
import {
  KPIAvaliacaoDesempenho,
  DesempenhoPorDepartamento,
  DistribuicaoNotas,
  TopPerformers,
  DesempenhoPorComarca,
  DesempenhoPorObjetivo,
  RadarPorGrupoAlvo,
} from '../types';

const ANOS = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
const DEPARTAMENTOS = [
  { value: 'all', label: 'Todos os Departamentos' },
  { value: 'Direção Geral', label: 'Direção Geral' },
  { value: 'Recursos Humanos', label: 'Recursos Humanos' },
  { value: 'Financeiro', label: 'Financeiro' },
  { value: 'Jurídico', label: 'Jurídico' },
  { value: 'TI', label: 'TI' },
  { value: 'Administrativo', label: 'Administrativo' },
  { value: 'Comunicação', label: 'Comunicação' },
];
const COMARCAS = [
  { value: 'all', label: 'Todas as Comarcas' },
  { value: 'Praia', label: 'Praia' },
  { value: 'São Vicente', label: 'São Vicente' },
  { value: 'Santiago Norte', label: 'Santiago Norte' },
  { value: 'Santiago Sul', label: 'Santiago Sul' },
  { value: 'Sal', label: 'Sal' },
  { value: 'Fogo', label: 'Fogo' },
  { value: 'Brava', label: 'Brava' },
];

export default function AvaliacaoDesempenhoDashboard() {
  const [ano, setAno] = useState<number>(new Date().getFullYear());
  const [departamento, setDepartamento] = useState<string>('all');
  const [comarca, setComarca] = useState<string>('all');
  const [dataInicio, setDataInicio] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 12);
    return date.toISOString().split('T')[0];
  });
  const [dataFim, setDataFim] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [kpis, setKPIs] = useState<KPIAvaliacaoDesempenho | null>(null);
  const [departamentoData, setDepartamentoData] = useState<DesempenhoPorDepartamento[]>([]);
  const [distribuicaoData, setDistribuicaoData] = useState<DistribuicaoNotas[]>([]);
  const [comarcaData, setComarcaData] = useState<DesempenhoPorComarca[]>([]);
  const [topPerformersData, setTopPerformersData] = useState<TopPerformers[]>([]);
  const [objetivoData, setObjetivoData] = useState<DesempenhoPorObjetivo[]>([]);
  const [radarData, setRadarData] = useState<RadarPorGrupoAlvo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [_modalTipo, setModalTipo] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [loadingFuncionarios, setLoadingFuncionarios] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [
        kpisData,
        deptData,
        distData,
        comarcaDataRes,
        topData,
        objData,
        radarDataRes,
      ] = await Promise.all([
        avaliacaoDesempenhoAPI.getKPIs(),
        avaliacaoDesempenhoAPI.getDesempenhoPorDepartamento(ano),
        avaliacaoDesempenhoAPI.getDistribuicaoNotas(),
        avaliacaoDesempenhoAPI.getDesempenhoPorComarca(ano),
        avaliacaoDesempenhoAPI.getTopPerformers(5),
        avaliacaoDesempenhoAPI.getDesempenhoPorObjetivo(ano),
        avaliacaoDesempenhoAPI.getRadarPorGrupoAlvo(ano),
      ]);

      // Aplicar filtros
      let filteredDeptData: DesempenhoPorDepartamento[] = deptData;
      let filteredComarcaData: DesempenhoPorComarca[] = comarcaDataRes;
      let filteredTopData: TopPerformers[] = topData;

      if (departamento !== 'all') {
        filteredDeptData = deptData.filter((d: DesempenhoPorDepartamento) => d.departamento === departamento);
        filteredTopData = topData.filter((t: TopPerformers) => t.departamento === departamento);
      }

      if (comarca !== 'all') {
        filteredComarcaData = comarcaDataRes.filter((c: DesempenhoPorComarca) => c.comarca === comarca);
      }

      setKPIs(kpisData);
      setDepartamentoData(filteredDeptData);
      setDistribuicaoData(distData);
      setComarcaData(filteredComarcaData);
      setTopPerformersData(filteredTopData);
      setObjetivoData(objData);
      setRadarData(radarDataRes);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [ano, departamento, comarca, dataInicio, dataFim]);

  const handleResetFilters = () => {
    setAno(new Date().getFullYear());
    setDepartamento('all');
    setComarca('all');
    const dateStart = new Date();
    dateStart.setMonth(dateStart.getMonth() - 12);
    setDataInicio(dateStart.toISOString().split('T')[0]);
    setDataFim(new Date().toISOString().split('T')[0]);
  };

  const handleKPIClick = async (tipo: string, title: string) => {
    setModalTipo(tipo);
    setModalTitle(title);
    setModalOpen(true);
    setLoadingFuncionarios(true);
    
    try {
      const data = await avaliacaoDesempenhoAPI.getFuncionariosPorKPI(tipo, ano);
      setFuncionarios(data);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
      setFuncionarios([]);
    } finally {
      setLoadingFuncionarios(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4" style={{ borderColor: '#203d64' }}></div>
          <p className="text-cofre-gray text-base font-normal">Carregando dados...</p>
        </div>
      </div>
    );
  }

  const filterConfigs = [
    {
      label: 'Ano',
      name: 'ano',
      options: ANOS.map(a => ({ value: a, label: a.toString() })),
      value: ano,
      onChange: (value: string | number) => setAno(Number(value)),
    },
    {
      label: 'Departamento',
      name: 'departamento',
      options: DEPARTAMENTOS,
      value: departamento,
      onChange: (value: string | number) => setDepartamento(String(value)),
    },
    {
      label: 'Comarca',
      name: 'comarca',
      options: COMARCAS,
      value: comarca,
      onChange: (value: string | number) => setComarca(String(value)),
    },
  ];

  const dateRangeConfig = {
    startDate: dataInicio,
    endDate: dataFim,
    onStartDateChange: setDataInicio,
    onEndDateChange: setDataFim,
    label: 'Período',
  };

  return (
    <div className="min-h-screen p-5 bg-white">
      <div className="max-w-full mx-auto px-4">
        {/* Header */}
        <div className="section-title mb-6">
          AVALIAÇÃO DE DESEMPENHO
        </div>

        {/* Navegação entre Dashboards */}
        <DashboardNavigation />

        {/* Filtros */}
        <FilterBar 
          filters={filterConfigs} 
          dateRange={dateRangeConfig}
          onReset={handleResetFilters} 
        />

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <KPICard
              title="Total Avaliações"
              value={kpis?.totalAvaliacoes.toLocaleString() || '0'}
              variation={kpis?.variacaoTotal}
              icon={<Users className="w-5 h-5" />}
              onClick={() => handleKPIClick('total-avaliacoes', 'Funcionários - Total de Avaliações')}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <KPICard
              title="Média Geral"
              value={kpis?.mediaGeral.toFixed(1) || '0'}
              variation={kpis?.variacaoMedia}
              icon={<BarChart3 className="w-5 h-5" />}
              onClick={() => handleKPIClick('media-geral', 'Funcionários - Média Geral')}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <KPICard
              title="Excelentes (90+)"
              value={kpis?.excelentes.toLocaleString() || '0'}
              subtitle={`${kpis?.percentualExcelentes.toFixed(1)}% do total`}
              icon={<Award className="w-5 h-5" />}
              onClick={() => handleKPIClick('excelentes', 'Funcionários - Excelentes (90+)')}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <KPICard
              title="Atenção"
              value={kpis?.atencao.toLocaleString() || '0'}
              subtitle={`${kpis?.percentualAtencao.toFixed(1)}% requerem acompanhamento`}
              icon={<AlertCircle className="w-5 h-5" />}
              onClick={() => handleKPIClick('atencao', 'Funcionários - Requerem Atenção')}
            />
          </div>
        </div>

        {/* Charts */}
        <Charts
          departamentoData={departamentoData}
          distribuicaoData={distribuicaoData}
          comarcaData={comarcaData}
          topPerformersData={topPerformersData}
          objetivoData={objetivoData}
          radarData={radarData}
        />
      </div>

      {/* Modal de Funcionários */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      >
        <FuncionariosList 
          funcionarios={funcionarios} 
          loading={loadingFuncionarios}
        />
      </Modal>
    </div>
  );
}
