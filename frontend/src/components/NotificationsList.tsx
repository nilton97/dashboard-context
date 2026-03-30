import { Bell, AlertCircle, CheckCircle, Info, AlertTriangle, Clock, X } from 'lucide-react';
import Avatar from './Avatar';

interface Notificacao {
  id: number;
  tipo: 'info' | 'warning' | 'success' | 'error';
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
  departamento?: string;
  funcionarioNome?: string;
  funcionarioFoto?: string;
  acao?: string;
}

export type { Notificacao };

interface NotificationsListProps {
  notificacoes: Notificacao[];
  loading?: boolean;
  onMarcarLida?: (id: number) => void;
  onMarcarTodasLidas?: () => void;
  onRemover?: (id: number) => void;
  onVerDetalhes?: (notificacao: Notificacao) => void;
}

const tipoConfig = {
  info: { icon: Info, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  warning: { icon: AlertTriangle, color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  success: { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  error: { icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
};

export default function NotificationsList({
  notificacoes,
  loading,
  onMarcarLida,
  onMarcarTodasLidas,
  onRemover,
  onVerDetalhes,
}: NotificationsListProps) {
  const formatarData = (data: string) => {
    const date = new Date(data);
    const agora = new Date();
    const diffMs = agora.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cofre-blue mx-auto mb-2"></div>
        <p className="text-cofre-grayLight">Carregando notificações...</p>
      </div>
    );
  }

  if (notificacoes.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="w-12 h-12 text-cofre-grayLight mx-auto mb-4 opacity-50" />
        <p className="text-cofre-grayLight text-base">Nenhuma notificação disponível</p>
      </div>
    );
  }

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <div>
      {naoLidas > 0 && onMarcarTodasLidas && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={onMarcarTodasLidas}
            className="text-sm text-cofre-blue hover:text-cofre-blueBright transition-colors"
            style={{ fontSize: '13px' }}
          >
            Marcar todas como lidas
          </button>
        </div>
      )}

      <div className="space-y-3">
        {notificacoes.map((notificacao) => {
          const config = tipoConfig[notificacao.tipo];
          const Icon = config.icon;

          return (
            <div
              key={notificacao.id}
              onClick={() => onVerDetalhes && onVerDetalhes(notificacao)}
              className={`
                glass p-4 card-hover relative
                ${notificacao.lida ? 'opacity-75' : ''}
                ${config.bgColor}
                border-l-4 ${config.borderColor}
                ${onVerDetalhes ? 'cursor-pointer' : ''}
              `}
              style={{ borderRadius: '4px' }}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 ${config.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`font-semibold text-cofre-gray ${notificacao.lida ? '' : 'font-bold'}`} style={{ fontSize: '14px' }}>
                      {notificacao.titulo}
                    </h4>
                    {!notificacao.lida && (
                      <span className="flex-shrink-0 w-2 h-2 bg-cofre-blue rounded-full"></span>
                    )}
                  </div>

                  <p className="text-cofre-grayLight mb-2" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                    {notificacao.mensagem}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {notificacao.funcionarioNome && (
                        <div className="flex items-center gap-2">
                          <Avatar nome={notificacao.funcionarioNome} foto={notificacao.funcionarioFoto} size={24} />
                          <span className="text-cofre-grayLight text-xs">{notificacao.funcionarioNome}</span>
                        </div>
                      )}
                      {notificacao.departamento && (
                        <span className="text-cofre-grayLight text-xs">{notificacao.departamento}</span>
                      )}
                      <span className="text-cofre-grayLight text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatarData(notificacao.data)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {!notificacao.lida && onMarcarLida && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarcarLida(notificacao.id);
                          }}
                          className="text-xs text-cofre-blue hover:text-cofre-blueBright transition-colors"
                          title="Marcar como lida"
                        >
                          Marcar como lida
                        </button>
                      )}
                      {onRemover && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemover(notificacao.id);
                          }}
                          className="text-cofre-grayLight hover:text-cofre-gray transition-colors"
                          title="Remover"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
