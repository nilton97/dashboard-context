import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Users, GraduationCap, Home } from 'lucide-react';

export default function DashboardNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const dashboards = [
    {
      id: 'home',
      label: 'Início',
      path: '/',
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: 'avaliacao-desempenho',
      label: 'Avaliação de Desempenho',
      path: '/avaliacao-desempenho',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: 'rh',
      label: 'RH',
      path: '/rh',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'recrutamento-formacao',
      label: 'Recrutamento e Formação',
      path: '/recrutamento-formacao',
      icon: <GraduationCap className="w-4 h-4" />,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="mb-6">
      <div className="glass p-4 card-hover" style={{ borderRadius: '4px' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-cofre-gray font-semibold" style={{ fontSize: '14px' }}>
            Navegação:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {dashboards.map((dashboard) => (
            <button
              key={dashboard.id}
              onClick={() => navigate(dashboard.path)}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded transition-all
                ${
                  isActive(dashboard.path)
                    ? 'bg-cofre-blue text-white'
                    : 'bg-white text-cofre-gray border border-cofre-grayBorder hover:bg-gray-50 hover:border-cofre-blue'
                }
              `}
              style={{ fontSize: '13px', borderRadius: '4px' }}
            >
              {dashboard.icon}
              {dashboard.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
