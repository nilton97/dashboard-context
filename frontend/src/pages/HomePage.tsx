import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, GraduationCap, TrendingUp, Award } from 'lucide-react';

interface DashboardCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  bgColor: string;
  stats?: {
    label: string;
    value: string;
  };
}

export default function HomePage() {
  const navigate = useNavigate();

  const dashboards: DashboardCard[] = [
    {
      id: 'avaliacao-desempenho',
      title: 'Avaliação de Desempenho',
      description: 'Acompanhe métricas de desempenho, avaliações e indicadores de performance dos funcionários.',
      icon: <BarChart3 className="w-8 h-8" />,
      path: '/avaliacao-desempenho',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      stats: {
        label: 'Avaliações',
        value: '1.247'
      }
    },
    {
      id: 'rh',
      title: 'Dashboard RH',
      description: 'Gestão de recursos humanos, funcionários, ausências, orçamento e notificações importantes.',
      icon: <Users className="w-8 h-8" />,
      path: '/rh',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      stats: {
        label: 'Funcionários',
        value: '1.247'
      }
    },
    {
      id: 'recrutamento-formacao',
      title: 'Recrutamento e Formação',
      description: 'Acompanhe concursos, candidatos, formações e desenvolvimento de funcionários.',
      icon: <GraduationCap className="w-8 h-8" />,
      path: '/recrutamento-formacao',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      stats: {
        label: 'Formações',
        value: '156'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cofre-blue rounded-full mb-6">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-cofre-gray mb-4" style={{ fontSize: '36px' }}>
            Dashboards de Gestão
          </h1>
          <div className="max-w-3xl mx-auto mb-6">
            <p className="text-cofre-blue font-semibold text-xl mb-2" style={{ fontSize: '20px', fontWeight: '600' }}>
              Ferramenta essencial para auxiliar os gestores na tomada de decisão
            </p>
            <p className="text-cofre-grayLight text-lg" style={{ fontSize: '16px' }}>
              Acesse os dashboards para visualizar métricas e indicadores importantes em tempo real
            </p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              onClick={() => navigate(dashboard.path)}
              className="glass p-6 card-hover cursor-pointer group relative overflow-hidden"
              style={{ borderRadius: '8px' }}
            >
              {/* Background decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${dashboard.bgColor} rounded-full -mr-16 -mt-16 opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              
              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${dashboard.bgColor} rounded-lg mb-4 ${dashboard.color} group-hover:scale-110 transition-transform`}>
                  {dashboard.icon}
                </div>

                {/* Title */}
                <h3 className="font-bold text-cofre-gray mb-2 group-hover:text-cofre-blue transition-colors" style={{ fontSize: '20px' }}>
                  {dashboard.title}
                </h3>

                {/* Description */}
                <p className="text-cofre-grayLight mb-4 leading-relaxed" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  {dashboard.description}
                </p>

                {/* Stats */}
                {dashboard.stats && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 text-cofre-grayLight" style={{ fontSize: '12px' }}>
                      <Award className="w-4 h-4" />
                      <span>{dashboard.stats.label}:</span>
                    </div>
                    <span className="font-semibold text-cofre-blue" style={{ fontSize: '14px' }}>
                      {dashboard.stats.value}
                    </span>
                  </div>
                )}

                {/* Action */}
                <div className="flex items-center gap-2 text-cofre-blue group-hover:text-cofre-blueBright transition-colors" style={{ fontSize: '14px' }}>
                  <span className="font-semibold">Acessar Dashboard</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="glass p-6 text-center" style={{ borderRadius: '8px' }}>
            <div className="text-3xl font-bold text-cofre-blue mb-2" style={{ fontSize: '32px' }}>
              3
            </div>
            <div className="text-cofre-grayLight" style={{ fontSize: '14px' }}>
              Dashboards Disponíveis
            </div>
          </div>
          <div className="glass p-6 text-center" style={{ borderRadius: '8px' }}>
            <div className="text-3xl font-bold text-cofre-blue mb-2" style={{ fontSize: '32px' }}>
              50+
            </div>
            <div className="text-cofre-grayLight" style={{ fontSize: '14px' }}>
              Indicadores e Métricas
            </div>
          </div>
          <div className="glass p-6 text-center" style={{ borderRadius: '8px' }}>
            <div className="text-3xl font-bold text-cofre-blue mb-2" style={{ fontSize: '32px' }}>
              24/7
            </div>
            <div className="text-cofre-grayLight" style={{ fontSize: '14px' }}>
              Acesso Disponível
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-cofre-grayLight text-sm" style={{ fontSize: '12px' }}>
            Selecione um dashboard acima para visualizar métricas detalhadas e análises em tempo real
          </p>
        </div>
      </div>
    </div>
  );
}
