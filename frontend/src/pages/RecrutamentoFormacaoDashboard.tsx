import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Users, 
  GraduationCap, 
  UserCheck, 
  TrendingUp, 
  Clock, 
  BookOpen,
  Award,
  CheckCircle,
  PlayCircle
} from 'lucide-react';
import KPICard from '../components/KPICard';
import RecrutamentoFormacaoCharts from '../components/RecrutamentoFormacaoCharts';
import FilterBar from '../components/FilterBar';
import Modal from '../components/Modal';
import FuncionariosFormacaoList from '../components/FuncionariosFormacaoList';
import DashboardNavigation from '../components/DashboardNavigation';
import { recrutamentoFormacaoAPI } from '../api/client';
import {
  KPIRecrutamentoFormacao,
  Concurso,
  Formacao,
  FormacaoPorArea,
  EstatisticaFormacao,
  FuncionarioFormado,
} from '../types/recrutamento-formacao';

const ANOS = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
const ESTADOS_CONCURSO = [
  { value: 'all', label: 'Todos os Estados' },
  { value: 'Em Andamento', label: 'Em Andamento' },
  { value: 'Finalizado', label: 'Finalizado' },
  { value: 'Cancelado', label: 'Cancelado' },
];

const ESTADOS_FORMACAO = [
  { value: 'all', label: 'Todos os Estados' },
  { value: 'Concluída', label: 'Concluída' },
  { value: 'Em Andamento', label: 'Em Andamento' },
  { value: 'Cancelada', label: 'Cancelada' },
];

export default function RecrutamentoFormacaoDashboard() {
  const [ano, setAno] = useState<number>(new Date().getFullYear());
  const [estadoConcurso, setEstadoConcurso] = useState<string>('all');
  const [estadoFormacao, setEstadoFormacao] = useState<string>('all');
  const [dataInicio, setDataInicio] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 12);
    return date.toISOString().split('T')[0];
  });
  const [dataFim, setDataFim] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [kpis, setKPIs] = useState<KPIRecrutamentoFormacao | null>(null);
  const [concursosData, setConcursosData] = useState<Concurso[]>([]);
  const [formacoesData, setFormacoesData] = useState<Formacao[]>([]);
  const [formacoesPorAreaData, setFormacoesPorAreaData] = useState<FormacaoPorArea[]>([]);
  const [estatisticasFormacaoData, setEstatisticasFormacaoData] = useState<EstatisticaFormacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [_modalTipo, setModalTipo] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');
  const [funcionariosFormacao, setFuncionariosFormacao] = useState<FuncionarioFormado[]>([]);
  const [loadingFuncionarios, setLoadingFuncionarios] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [
        kpisData,
        concursosDataRes,
        formacoesDataRes,
        formacoesPorAreaDataRes,
        estatisticasFormacaoDataRes,
      ] = await Promise.all([
        recrutamentoFormacaoAPI.getKPIs(),
        recrutamentoFormacaoAPI.getConcursos(estadoConcurso !== 'all' ? estadoConcurso : undefined, ano),
        recrutamentoFormacaoAPI.getFormacoes(estadoFormacao !== 'all' ? estadoFormacao : undefined, ano),
        recrutamentoFormacaoAPI.getFormacoesPorArea(ano),
        recrutamentoFormacaoAPI.getEstatisticasFormacao(ano),
      ]);

      setKPIs(kpisData);
      setConcursosData(concursosDataRes);
      setFormacoesData(formacoesDataRes);
      setFormacoesPorAreaData(formacoesPorAreaDataRes);
      setEstatisticasFormacaoData(estatisticasFormacaoDataRes);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [ano, estadoConcurso, estadoFormacao, dataInicio, dataFim]);

  const handleResetFilters = () => {
    setAno(new Date().getFullYear());
    setEstadoConcurso('all');
    setEstadoFormacao('all');
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
      const data = await recrutamentoFormacaoAPI.getFuncionariosPorKPI(tipo, ano);
      setFuncionariosFormacao(data);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
      setFuncionariosFormacao([]);
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
      label: 'Estado Concurso',
      name: 'estadoConcurso',
      options: ESTADOS_CONCURSO,
      value: estadoConcurso,
      onChange: (value: string | number) => setEstadoConcurso(String(value)),
    },
    {
      label: 'Estado Formação',
      name: 'estadoFormacao',
      options: ESTADOS_FORMACAO,
      value: estadoFormacao,
      onChange: (value: string | number) => setEstadoFormacao(String(value)),
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
          RECRUTAMENTO E FORMAÇÃO
        </div>

        {/* Navegação entre Dashboards */}
        <DashboardNavigation />

        {/* Filtros */}
        <FilterBar 
          filters={filterConfigs} 
          dateRange={dateRangeConfig}
          onReset={handleResetFilters} 
        />

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <KPICard
              title="Total Concursos"
              value={kpis?.totalConcursos.toLocaleString() || '0'}
              variation={kpis?.variacaoConcursos}
              icon={<Briefcase className="w-5 h-5" />}
              onClick={() => handleKPIClick('total-concursos', 'Concursos')}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <KPICard
              title="Total Candidatos"
              value={kpis?.totalCandidatos.toLocaleString() || '0'}
              variation={kpis?.variacaoCandidatos}
              icon={<Users className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <KPICard
              title="Total Formações"
              value={kpis?.totalFormacoes.toLocaleString() || '0'}
              variation={kpis?.variacaoFormacoes}
              icon={<GraduationCap className="w-5 h-5" />}
              onClick={() => handleKPIClick('total-formacoes', 'Formações')}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <KPICard
              title="Taxa Sucesso Concursos"
              value={`${kpis?.taxaSucessoConcursos.toFixed(1) || '0'}%`}
              icon={<Award className="w-5 h-5" />}
            />
          </div>
        </div>

        {/* KPIs Secundários */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <KPICard
              title="Funcionários Formados"
              value={kpis?.totalFuncionariosFormados.toLocaleString() || '0'}
              icon={<UserCheck className="w-5 h-5" />}
              onClick={() => handleKPIClick('funcionarios-formados', 'Funcionários Formados')}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <KPICard
              title="Concursos Em Andamento"
              value={kpis?.concursosEmAndamento.toLocaleString() || '0'}
              icon={<PlayCircle className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <KPICard
              title="Concursos Finalizados"
              value={kpis?.concursosFinalizados.toLocaleString() || '0'}
              icon={<CheckCircle className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <KPICard
              title="Taxa Conclusão Formações"
              value={`${kpis?.taxaConclusaoFormacoes.toFixed(1) || '0'}%`}
              icon={<TrendingUp className="w-5 h-5" />}
            />
          </div>
        </div>

        {/* KPIs Terciários */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <KPICard
              title="Formações Em Andamento"
              value={kpis?.formacoesEmAndamento.toLocaleString() || '0'}
              icon={<PlayCircle className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '1.0s' }}>
            <KPICard
              title="Formações Concluídas"
              value={kpis?.formacoesConcluidas.toLocaleString() || '0'}
              icon={<CheckCircle className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '1.1s' }}>
            <KPICard
              title="Média Horas/Formação"
              value={`${kpis?.mediaHorasFormacao.toFixed(1) || '0'} horas`}
              icon={<Clock className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '1.2s' }}>
            <KPICard
              title="Total Horas Formação"
              value={kpis?.totalHorasFormacao.toLocaleString() || '0'}
              icon={<BookOpen className="w-5 h-5" />}
            />
          </div>
        </div>

        {/* Charts */}
        <RecrutamentoFormacaoCharts
          concursosData={concursosData}
          formacoesData={formacoesData}
          formacoesPorAreaData={formacoesPorAreaData}
          estatisticasFormacaoData={estatisticasFormacaoData}
        />
      </div>

      {/* Modal de Funcionários Formados */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      >
        <FuncionariosFormacaoList 
          funcionarios={funcionariosFormacao} 
          loading={loadingFuncionarios}
        />
      </Modal>
    </div>
  );
}
