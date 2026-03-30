import { AlertCircle, CheckCircle, Info, AlertTriangle, Clock, Eye, Bell } from 'lucide-react';
import Avatar from './Avatar';
import type { Notificacao } from './NotificationsList';

interface NotificacoesImportantesTableProps {
  notificacoes: Notificacao[];
  loading?: boolean;
  onVerDetalhes?: (notificacao: Notificacao) => void;
  onAbrirAbaNotificacoes?: () => void;
}

const tipoConfig = {
  info: { icon: Info, color: 'text-blue-600', bgColor: 'bg-blue-50', label: 'Info' },
  warning: { icon: AlertTriangle, color: 'text-yellow-600', bgColor: 'bg-yellow-50', label: 'Aviso' },
  success: { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50', label: 'Sucesso' },
  error: { icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50', label: 'Erro' },
};

export default function NotificacoesImportantesTable({
  notificacoes,
  loading,
  onVerDetalhes,
  onAbrirAbaNotificacoes,
}: NotificacoesImportantesTableProps) {
  const formatarData = (data: string) => {
    const date = new Date(data);
    const agora = new Date();
    const diffMs = agora.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins} min`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays} dias`;
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
  };

  // Filtrar apenas notificações importantes (não lidas ou do tipo error/warning)
  const notificacoesImportantes = notificacoes
    .filter(n => !n.lida || n.tipo === 'error' || n.tipo === 'warning')
    .sort((a, b) => {
      // Priorizar: error > warning > não lidas > outras
      const prioridade = { error: 4, warning: 3, success: 2, info: 1 };
      if (prioridade[a.tipo] !== prioridade[b.tipo]) {
        return prioridade[b.tipo] - prioridade[a.tipo];
      }
      // Depois por data (mais recentes primeiro)
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    })
    .slice(0, 10); // Limitar a 10 notificações mais importantes

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cofre-blue mx-auto mb-2"></div>
        <p className="text-cofre-grayLight">Carregando notificações...</p>
      </div>
    );
  }

  if (notificacoesImportantes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-cofre-grayLight">Nenhuma notificação importante no momento</p>
      </div>
    );
  }

  return (
    <div>
      {onAbrirAbaNotificacoes && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={onAbrirAbaNotificacoes}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cofre-blue text-white hover:bg-cofre-blueBright transition-colors rounded"
            style={{ fontSize: '13px', borderRadius: '4px' }}
          >
            <Bell className="w-4 h-4" />
            Ver Todas as Notificações
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr className="border-b" style={{ borderColor: '#e0e0e0', backgroundColor: '#f9fafb' }}>
              <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600', width: '50px' }}>
                Tipo
              </th>
              <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600' }}>
                Título
              </th>
              <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600' }}>
                Departamento
              </th>
              <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600' }}>
                Funcionário
              </th>
              <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600' }}>
                Data
              </th>
              <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600', width: '100px' }}>
                Status
              </th>
              <th className="text-center py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600', width: '80px' }}>
                Ação
              </th>
            </tr>
          </thead>
        <tbody>
          {notificacoesImportantes.map((notificacao) => {
            const config = tipoConfig[notificacao.tipo];
            const Icon = config.icon;

            return (
              <tr
                key={notificacao.id}
                className={`border-b hover:bg-gray-50 transition-colors ${
                  !notificacao.lida ? 'bg-blue-50/30' : ''
                }`}
                style={{ borderColor: '#e0e0e0' }}
              >
                <td className="py-3 px-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded ${config.bgColor}`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <p className={`text-cofre-gray ${notificacao.lida ? '' : 'font-semibold'}`} style={{ fontSize: '14px' }}>
                      {notificacao.titulo}
                    </p>
                    <p className="text-cofre-grayLight text-xs mt-1 line-clamp-1" style={{ fontSize: '12px' }}>
                      {notificacao.mensagem}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4 text-cofre-grayLight" style={{ fontSize: '13px' }}>
                  {notificacao.departamento || '-'}
                </td>
                <td className="py-3 px-4">
                  {notificacao.funcionarioNome ? (
                    <div className="flex items-center gap-2">
                      <Avatar nome={notificacao.funcionarioNome} foto={notificacao.funcionarioFoto} size={28} />
                      <span className="text-cofre-grayLight text-xs" style={{ fontSize: '12px' }}>
                        {notificacao.funcionarioNome}
                      </span>
                    </div>
                  ) : (
                    <span className="text-cofre-grayLight" style={{ fontSize: '13px' }}>-</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-cofre-grayLight" style={{ fontSize: '12px' }}>
                    <Clock className="w-3 h-3" />
                    {formatarData(notificacao.data)}
                  </div>
                </td>
                <td className="py-3 px-4">
                  {!notificacao.lida ? (
                    <span className="px-2 py-1 bg-cofre-blue text-white rounded-full text-xs" style={{ fontSize: '10px' }}>
                      Nova
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-200 text-cofre-gray rounded-full text-xs" style={{ fontSize: '10px' }}>
                      Lida
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {onVerDetalhes && (
                    <button
                      onClick={() => onVerDetalhes(notificacao)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-cofre-blue hover:text-cofre-blueBright hover:bg-blue-50 rounded transition-colors"
                      style={{ fontSize: '12px' }}
                      title="Ver detalhes"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
