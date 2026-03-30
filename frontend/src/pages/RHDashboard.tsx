import { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingDown, 
  Clock, 
  Heart, 
  Award, 
  Smile, 
  DollarSign, 
  Target, 
  BookOpen, 
  Zap,
  Calendar,
  FileX,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Bell,
  BarChart3
} from 'lucide-react';
import KPICard from '../components/KPICard';
import RHCharts from '../components/RHCharts';
import FilterBar from '../components/FilterBar';
import Modal from '../components/Modal';
import FuncionariosAusenciasList from '../components/FuncionariosAusenciasList';
import OrcamentoTable from '../components/OrcamentoTable';
import Tabs from '../components/Tabs';
import NotificationsList from '../components/NotificationsList';
import NotificationDetails from '../components/NotificationDetails';
import NotificacoesImportantesTable from '../components/NotificacoesImportantesTable';
import DashboardNavigation from '../components/DashboardNavigation';
import type { Notificacao } from '../components/NotificationsList';
import { rhAPI } from '../api/client';
import {
  KPIRH,
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
  FuncionarioComAusencia,
  OrcamentoPorDepartamento,
} from '../types/rh';

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

export default function RHDashboard() {
  const [ano, setAno] = useState<number>(new Date().getFullYear());
  const [departamento, setDepartamento] = useState<string>('all');
  const [dataInicio, setDataInicio] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 12);
    return date.toISOString().split('T')[0];
  });
  const [dataFim, setDataFim] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [kpis, setKPIs] = useState<KPIRH | null>(null);
  const [funcionariosPorDeptData, setFuncionariosPorDeptData] = useState<FuncionariosPorDepartamento[]>([]);
  const [distribuicaoGeneroData, setDistribuicaoGeneroData] = useState<DistribuicaoGenero[]>([]);
  const [faixasEtariasData, setFaixasEtariasData] = useState<FaixaEtaria[]>([]);
  const [antiguidadeData, setAntiguidadeData] = useState<Antiguidade[]>([]);
  const [habilitacoesData, setHabilitacoesData] = useState<HabilitacaoLiteraria[]>([]);
  const [rotatividadeData, setRotatividadeData] = useState<RotatividadePorDepartamento[]>([]);
  const [satisfacaoData, setSatisfacaoData] = useState<SatisfacaoPorDepartamento[]>([]);
  const [engajamentoData, setEngajamentoData] = useState<EngajamentoPorMes[]>([]);
  const [ausenciasPorTipoData, setAusenciasPorTipoData] = useState<AusenciaPorTipo[]>([]);
  const [ausenciasPorDeptData, setAusenciasPorDeptData] = useState<AusenciaPorDepartamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [funcionariosAusencias, setFuncionariosAusencias] = useState<FuncionarioComAusencia[]>([]);
  const [loadingFuncionarios, setLoadingFuncionarios] = useState(false);
  const [orcamentoData, setOrcamentoData] = useState<OrcamentoPorDepartamento[]>([]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loadingNotificacoes, setLoadingNotificacoes] = useState(false);
  const [notificacaoDetalhes, setNotificacaoDetalhes] = useState<Notificacao | null>(null);
  const [modalNotificacaoOpen, setModalNotificacaoOpen] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [
        kpisData,
        funcionariosData,
        generoData,
        faixasData,
        antiguidadeDataRes,
        habilitacoesDataRes,
        rotatividadeDataRes,
        satisfacaoDataRes,
        engajamentoDataRes,
        ausenciasPorTipoDataRes,
        ausenciasPorDeptDataRes,
        orcamentoDataRes,
      ] = await Promise.all([
        rhAPI.getKPIs(),
        rhAPI.getFuncionariosPorDepartamento(ano),
        rhAPI.getDistribuicaoGenero(),
        rhAPI.getFaixasEtarias(),
        rhAPI.getDetalhesAntiguidade(ano),
        rhAPI.getHabilitacoesLiterarias(),
        rhAPI.getRotatividadePorDepartamento(),
        rhAPI.getSatisfacaoPorDepartamento(),
        rhAPI.getEngajamentoPorMes(dataInicio, dataFim),
        rhAPI.getAusenciasPorTipo(),
        rhAPI.getAusenciasPorDepartamento(),
        rhAPI.getOrcamentoPorDepartamento(ano),
      ]);

      // Aplicar filtros
      let filteredFuncionariosData = funcionariosData;
      if (departamento !== 'all') {
        filteredFuncionariosData = funcionariosData.filter((f) => f.departamento === departamento);
      }

      setKPIs(kpisData);
      setFuncionariosPorDeptData(filteredFuncionariosData);
      setDistribuicaoGeneroData(generoData);
      setFaixasEtariasData(faixasData);
      setAntiguidadeData(antiguidadeDataRes);
      setHabilitacoesData(habilitacoesDataRes);
      setRotatividadeData(rotatividadeDataRes);
      setSatisfacaoData(satisfacaoDataRes);
      setEngajamentoData(engajamentoDataRes);
      setAusenciasPorTipoData(ausenciasPorTipoDataRes);
      setAusenciasPorDeptData(ausenciasPorDeptDataRes);
      setOrcamentoData(orcamentoDataRes);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ano, departamento, dataInicio, dataFim]);

  const handleKPIClick = async (tipo: string, titulo: string) => {
    try {
      setModalTitle(titulo);
      setModalOpen(true);
      setLoadingFuncionarios(true);
      
      // Carregar funcionários baseado no tipo
      const data = await rhAPI.getFuncionariosComAusencias(tipo, departamento !== 'all' ? departamento : undefined, dataInicio, dataFim);
      setFuncionariosAusencias(data);
    } catch (error) {
      console.error('Erro ao carregar dados do KPI:', error);
      setFuncionariosAusencias([]);
    } finally {
      setLoadingFuncionarios(false);
    }
  };

  const loadNotificacoes = async () => {
    try {
      setLoadingNotificacoes(true);
      const data = await rhAPI.getNotificacoes();
      setNotificacoes(data);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    } finally {
      setLoadingNotificacoes(false);
    }
  };

  // Carregar notificações sempre para mostrar na tabela do dashboard
  useEffect(() => {
    loadNotificacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMarcarLida = async (id: number) => {
    try {
      await rhAPI.marcarNotificacaoLida(id);
      setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n));
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  };

  const handleMarcarTodasLidas = async () => {
    try {
      const naoLidas = notificacoes.filter(n => !n.lida);
      await Promise.all(naoLidas.map(n => rhAPI.marcarNotificacaoLida(n.id)));
      setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })));
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  };

  const handleRemoverNotificacao = async (id: number) => {
    try {
      await rhAPI.removerNotificacao(id);
      setNotificacoes(prev => prev.filter(n => n.id !== id));
      if (notificacaoDetalhes?.id === id) {
        setModalNotificacaoOpen(false);
        setNotificacaoDetalhes(null);
      }
    } catch (error) {
      console.error('Erro ao remover notificação:', error);
    }
  };

  const handleVerDetalhes = async (notificacao: Notificacao) => {
    setNotificacaoDetalhes(notificacao);
    setModalNotificacaoOpen(true);
    // Marcar como lida automaticamente ao abrir detalhes
    if (!notificacao.lida) {
      try {
        await rhAPI.marcarNotificacaoLida(notificacao.id);
        setNotificacoes(prev => prev.map(n => n.id === notificacao.id ? { ...n, lida: true } : n));
      } catch (error) {
        console.error('Erro ao marcar notificação como lida:', error);
      }
    }
  };

  const handleResetFilters = () => {
    setAno(new Date().getFullYear());
    setDepartamento('all');
    const dateStart = new Date();
    dateStart.setMonth(dateStart.getMonth() - 12);
    setDataInicio(dateStart.toISOString().split('T')[0]);
    setDataFim(new Date().toISOString().split('T')[0]);
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
  ];

  const dateRangeConfig = {
    startDate: dataInicio,
    endDate: dataFim,
    onStartDateChange: setDataInicio,
    onEndDateChange: setDataFim,
    label: 'Período',
  };

  const naoLidasCount = notificacoes.filter(n => !n.lida).length;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { 
      id: 'notificacoes', 
      label: 'Notificações', 
      icon: <Bell className="w-4 h-4" />,
      badge: naoLidasCount,
    },
  ];

  return (
    <div className="min-h-screen p-5 bg-white">
      <div className="max-w-full mx-auto px-4">
        {/* Header */}
        <div className="section-title mb-6">
          DASHBOARD RH
        </div>

        {/* Navegação entre Dashboards */}
        <DashboardNavigation />

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'notificacoes' ? (
          <div className="glass p-5 card-hover" style={{ borderRadius: '4px' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-normal text-cofre-gray" style={{ fontSize: '18px' }}>
                Notificações
                {naoLidasCount > 0 && (
                  <span className="ml-2 px-2 py-1 bg-cofre-blue text-white rounded-full text-xs" style={{ fontSize: '11px' }}>
                    {naoLidasCount}
                  </span>
                )}
              </h2>
            </div>
            <NotificationsList
              notificacoes={notificacoes}
              loading={loadingNotificacoes}
              onMarcarLida={handleMarcarLida}
              onMarcarTodasLidas={handleMarcarTodasLidas}
              onRemover={handleRemoverNotificacao}
            />
          </div>
        ) : (
          <>
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
              title="Total Funcionários"
              value={kpis?.totalFuncionarios.toLocaleString() || '0'}
              variation={kpis?.variacaoFuncionarios}
              icon={<Users className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <KPICard
              title="Taxa de Retenção"
              value={`${kpis?.taxaRetencao.toFixed(1) || '0'}%`}
              variation={kpis?.variacaoRetencao}
              icon={<Heart className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <KPICard
              title="Taxa de Rotatividade"
              value={`${kpis?.taxaRotatividade.toFixed(1) || '0'}%`}
              variation={kpis?.variacaoRotatividade}
              icon={<TrendingDown className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <KPICard
              title="Taxa de Engajamento"
              value={`${kpis?.taxaEngajamento.toFixed(1) || '0'}%`}
              icon={<Zap className="w-5 h-5" />}
            />
          </div>
        </div>

        {/* KPIs Secundários */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <KPICard
              title="Satisfação dos Funcionários"
              value={`${kpis?.satisfacaoFuncionarios.toFixed(1) || '0'}/5.0`}
              icon={<Smile className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <KPICard
              title="Taxa de Absenteísmo"
              value={`${kpis?.taxaAbsenteismo.toFixed(1) || '0'}%`}
              variation={kpis?.variacaoAbsenteismo}
              icon={<Calendar className="w-5 h-5" />}
              onClick={() => handleKPIClick('absenteismo', 'Funcionários - Taxa de Absenteísmo')}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <KPICard
              title="Tempo Médio Contratação"
              value={`${kpis?.tempoMedioContratacao || '0'} dias`}
              icon={<Clock className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <KPICard
              title="Taxa Promoção Interna"
              value={`${kpis?.taxaPromocaoInterna.toFixed(1) || '0'}%`}
              icon={<Award className="w-5 h-5" />}
            />
          </div>
        </div>

        {/* KPIs Terciários */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <KPICard
              title="Custo por Contratação"
              value={`${kpis?.custoPorContratacao.toLocaleString() || '0'} CVE`}
              icon={<DollarSign className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '1.0s' }}>
            <KPICard
              title="Taxa Diversidade"
              value={`${kpis?.taxaDiversidade.toFixed(1) || '0'}%`}
              icon={<Target className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '1.1s' }}>
            <KPICard
              title="Tempo Médio Permanência"
              value={`${kpis?.tempoMedioPermanencia.toFixed(1) || '0'} anos`}
              icon={<Clock className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '1.2s' }}>
            <KPICard
              title="Taxa Conclusão Treinamentos"
              value={`${kpis?.taxaConclusaoTreinamentos.toFixed(1) || '0'}%`}
              icon={<BookOpen className="w-5 h-5" />}
            />
          </div>
        </div>

        {/* KPIs de Ausências */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="animate-slide-up" style={{ animationDelay: '1.3s' }}>
            <KPICard
              title="Total Ausências"
              value={kpis?.totalAusencias.toLocaleString() || '0'}
              variation={kpis?.variacaoTotalAusencias}
              icon={<FileX className="w-5 h-5" />}
              onClick={() => handleKPIClick('total', 'Funcionários - Total de Ausências')}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '1.4s' }}>
            <KPICard
              title="Dias de Ausência"
              value={kpis?.diasAusencia.toLocaleString() || '0'}
              variation={kpis?.variacaoDiasAusencia}
              icon={<Calendar className="w-5 h-5" />}
              onClick={() => handleKPIClick('dias', 'Funcionários - Dias de Ausência')}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '1.5s' }}>
            <KPICard
              title="Ausências Justificadas"
              value={`${kpis?.taxaAusenciasJustificadas.toFixed(1) || '0'}%`}
              subtitle={`${kpis?.ausenciasJustificadas.toLocaleString() || '0'} registros`}
              icon={<CheckCircle className="w-5 h-5" />}
              onClick={() => handleKPIClick('justificadas', 'Funcionários - Ausências Justificadas')}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '1.6s' }}>
            <KPICard
              title="Ausências Não Justificadas"
              value={`${kpis?.taxaAusenciasNaoJustificadas.toFixed(1) || '0'}%`}
              subtitle={`${kpis?.ausenciasNaoJustificadas.toLocaleString() || '0'} registros`}
              icon={<XCircle className="w-5 h-5" />}
              onClick={() => handleKPIClick('nao-justificadas', 'Funcionários - Ausências Não Justificadas')}
            />
          </div>
        </div>

        {/* KPIs Adicionais de Ausências */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="animate-slide-up" style={{ animationDelay: '1.7s' }}>
            <KPICard
              title="Média Dias Ausência/Funcionário"
              value={`${kpis?.mediaDiasAusenciaPorFuncionario.toFixed(1) || '0'} dias`}
              icon={<Clock className="w-5 h-5" />}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '1.8s' }}>
            <KPICard
              title="Funcionários com Ausência"
              value={kpis?.funcionariosComAusencia.toLocaleString() || '0'}
              subtitle={`${((kpis?.funcionariosComAusencia || 0) / (kpis?.totalFuncionarios || 1) * 100).toFixed(1)}% do total`}
              icon={<AlertTriangle className="w-5 h-5" />}
              onClick={() => handleKPIClick('com-ausencia', 'Funcionários - Com Ausências')}
            />
          </div>
        </div>

        {/* Charts */}
        <RHCharts
          funcionariosPorDeptData={funcionariosPorDeptData}
          distribuicaoGeneroData={distribuicaoGeneroData}
          faixasEtariasData={faixasEtariasData}
          antiguidadeData={antiguidadeData}
          habilitacoesData={habilitacoesData}
          rotatividadeData={rotatividadeData}
          satisfacaoData={satisfacaoData}
          engajamentoData={engajamentoData}
          ausenciasPorTipoData={ausenciasPorTipoData}
          ausenciasPorDeptData={ausenciasPorDeptData}
        />

        {/* Tabela de Orçamento por Departamento */}
        <div className="mt-8">
          <div className="glass p-5 card-hover" style={{ borderRadius: '4px' }}>
            <h3 className="font-normal text-cofre-gray mb-4 pb-3 border-b border-cofre-grayBorder" style={{ fontSize: '16px' }}>
              Orçamento por Departamento
            </h3>
            <OrcamentoTable data={orcamentoData} loading={loading} />
          </div>
        </div>

        {/* Tabela de Notificações Importantes */}
        <div className="mt-8">
          <div className="glass p-5 card-hover" style={{ borderRadius: '4px' }}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-cofre-grayBorder">
              <h3 className="font-normal text-cofre-gray" style={{ fontSize: '16px' }}>
                Notificações Importantes
              </h3>
              <span className="text-xs text-cofre-grayLight">
                {notificacoes.filter(n => !n.lida || n.tipo === 'error' || n.tipo === 'warning').length} notificações
              </span>
            </div>
            <NotificacoesImportantesTable
              notificacoes={notificacoes}
              loading={loadingNotificacoes}
              onVerDetalhes={handleVerDetalhes}
              onAbrirAbaNotificacoes={() => setActiveTab('notificacoes')}
            />
          </div>
        </div>
          </>
        )}
      </div>

      {/* Modal de Funcionários com Ausências */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      >
        <FuncionariosAusenciasList 
          funcionarios={funcionariosAusencias} 
          loading={loadingFuncionarios}
        />
      </Modal>

      {/* Modal de Detalhes da Notificação */}
      <Modal
        isOpen={modalNotificacaoOpen}
        onClose={() => {
          setModalNotificacaoOpen(false);
          setNotificacaoDetalhes(null);
        }}
        title={notificacaoDetalhes?.titulo || 'Detalhes da Notificação'}
      >
        {notificacaoDetalhes && (
          <NotificationDetails notificacao={notificacaoDetalhes} />
        )}
      </Modal>

    </div>
  );
}
