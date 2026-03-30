import { AlertCircle, CheckCircle, Info, AlertTriangle, Clock, Calendar, Building2, User, Tag } from 'lucide-react';
import Avatar from './Avatar';
import type { Notificacao } from './NotificationsList';

interface NotificationDetailsProps {
  notificacao: Notificacao;
}

const tipoConfig = {
  info: { icon: Info, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', label: 'Informação' },
  warning: { icon: AlertTriangle, color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', label: 'Aviso' },
  success: { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200', label: 'Sucesso' },
  error: { icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', label: 'Erro' },
};

export default function NotificationDetails({ notificacao }: NotificationDetailsProps) {
  const config = tipoConfig[notificacao.tipo];
  const Icon = config.icon;

  const formatarDataCompleta = (data: string) => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatarDataRelativa = (data: string) => {
    const date = new Date(data);
    const agora = new Date();
    const diffMs = agora.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `Há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
    return formatarDataCompleta(data);
  };

  return (
    <div className="space-y-4">
      {/* Header com tipo e status */}
      <div className={`p-4 rounded ${config.bgColor} border-l-4 ${config.borderColor}`}>
        <div className="flex items-center gap-3 mb-2">
          <div className={config.color}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${config.color}`} style={{ fontSize: '14px' }}>
                {config.label}
              </span>
              {!notificacao.lida && (
                <span className="px-2 py-0.5 bg-cofre-blue text-white rounded-full text-xs" style={{ fontSize: '10px' }}>
                  Nova
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Título */}
      <div>
        <h3 className="font-bold text-cofre-gray mb-2" style={{ fontSize: '18px' }}>
          {notificacao.titulo}
        </h3>
        <p className="text-cofre-grayLight leading-relaxed" style={{ fontSize: '14px', lineHeight: '1.6' }}>
          {notificacao.mensagem}
        </p>
      </div>

      {/* Detalhes */}
      <div className="border-t border-cofre-grayBorder pt-4 space-y-3">
        <div className="flex items-center gap-2 text-cofre-grayLight" style={{ fontSize: '13px' }}>
          <Calendar className="w-4 h-4" />
          <span className="font-semibold">Data e Hora:</span>
          <span>{formatarDataCompleta(notificacao.data)}</span>
        </div>

        <div className="flex items-center gap-2 text-cofre-grayLight" style={{ fontSize: '13px' }}>
          <Clock className="w-4 h-4" />
          <span className="font-semibold">Tempo decorrido:</span>
          <span>{formatarDataRelativa(notificacao.data)}</span>
        </div>

        {notificacao.departamento && (
          <div className="flex items-center gap-2 text-cofre-grayLight" style={{ fontSize: '13px' }}>
            <Building2 className="w-4 h-4" />
            <span className="font-semibold">Departamento:</span>
            <span>{notificacao.departamento}</span>
          </div>
        )}

        {notificacao.funcionarioNome && (
          <div className="flex items-center gap-2 text-cofre-grayLight" style={{ fontSize: '13px' }}>
            <User className="w-4 h-4" />
            <span className="font-semibold">Funcionário:</span>
            <div className="flex items-center gap-2">
              <Avatar nome={notificacao.funcionarioNome} foto={notificacao.funcionarioFoto} size={24} />
              <span>{notificacao.funcionarioNome}</span>
            </div>
          </div>
        )}

        {notificacao.acao && (
          <div className="flex items-center gap-2 text-cofre-grayLight" style={{ fontSize: '13px' }}>
            <Tag className="w-4 h-4" />
            <span className="font-semibold">Ação sugerida:</span>
            <span className="text-cofre-blue">{notificacao.acao}</span>
          </div>
        )}
      </div>

      {/* Informações adicionais baseadas no tipo */}
      {notificacao.tipo === 'warning' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <p className="text-yellow-800 text-sm" style={{ fontSize: '12px' }}>
            <strong>Atenção:</strong> Esta notificação requer atenção imediata. Recomenda-se verificar os detalhes e tomar as ações necessárias.
          </p>
        </div>
      )}

      {notificacao.tipo === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-red-800 text-sm" style={{ fontSize: '12px' }}>
            <strong>Urgente:</strong> Esta é uma notificação crítica que requer ação imediata.
          </p>
        </div>
      )}

      {notificacao.tipo === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded p-3">
          <p className="text-green-800 text-sm" style={{ fontSize: '12px' }}>
            <strong>Sucesso:</strong> Esta ação foi concluída com sucesso.
          </p>
        </div>
      )}
    </div>
  );
}
