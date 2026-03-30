import { OrcamentoPorDepartamento } from '../types/rh';

interface OrcamentoTableProps {
  data: OrcamentoPorDepartamento[];
  loading?: boolean;
}

export default function OrcamentoTable({ data, loading }: OrcamentoTableProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cofre-blue mx-auto mb-2"></div>
        <p className="text-cofre-grayLight">Carregando dados...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-cofre-grayLight">Nenhum dado encontrado</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalAprovado = data.reduce((sum, item) => sum + item.orcamentoAprovado, 0);
  const totalExecutado = data.reduce((sum, item) => sum + item.orcamentoExecutado, 0);
  const totalSaldo = data.reduce((sum, item) => sum + item.saldo, 0);
  const percentualTotal = totalAprovado > 0 ? (totalExecutado / totalAprovado) * 100 : 0;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr className="border-b" style={{ borderColor: '#e0e0e0', backgroundColor: '#f9fafb' }}>
            <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600' }}>
              Departamento
            </th>
            <th className="text-right py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600' }}>
              Orçamento Aprovado
            </th>
            <th className="text-right py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600' }}>
              Orçamento Executado
            </th>
            <th className="text-right py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600' }}>
              % Execução
            </th>
            <th className="text-right py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: '600' }}>
              Saldo
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={index} 
              className="border-b hover:bg-gray-50 transition-colors" 
              style={{ borderColor: '#e0e0e0' }}
            >
              <td className="py-3 px-4 text-cofre-gray font-semibold" style={{ fontSize: '14px', fontWeight: '600' }}>
                {item.departamento}
              </td>
              <td className="py-3 px-4 text-cofre-gray text-right" style={{ fontSize: '14px' }}>
                {formatCurrency(item.orcamentoAprovado)}
              </td>
              <td className="py-3 px-4 text-cofre-gray text-right" style={{ fontSize: '14px' }}>
                {formatCurrency(item.orcamentoExecutado)}
              </td>
              <td className="py-3 px-4 text-right" style={{ fontSize: '14px' }}>
                <span 
                  className={`font-semibold ${
                    item.percentualExecucao >= 95 
                      ? 'text-green-600' 
                      : item.percentualExecucao >= 90 
                      ? 'text-yellow-600' 
                      : 'text-red-600'
                  }`}
                  style={{ fontWeight: '600' }}
                >
                  {item.percentualExecucao.toFixed(1)}%
                </span>
              </td>
              <td className="py-3 px-4 text-right" style={{ fontSize: '14px' }}>
                <span 
                  className={`font-semibold ${
                    item.saldo >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                  style={{ fontWeight: '600' }}
                >
                  {formatCurrency(item.saldo)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2" style={{ borderColor: '#203d64', backgroundColor: '#f9fafb' }}>
            <td className="py-3 px-4 font-bold text-cofre-blue" style={{ fontSize: '15px', fontWeight: '700' }}>
              TOTAL
            </td>
            <td className="py-3 px-4 text-right font-bold text-cofre-blue" style={{ fontSize: '15px', fontWeight: '700' }}>
              {formatCurrency(totalAprovado)}
            </td>
            <td className="py-3 px-4 text-right font-bold text-cofre-blue" style={{ fontSize: '15px', fontWeight: '700' }}>
              {formatCurrency(totalExecutado)}
            </td>
            <td className="py-3 px-4 text-right font-bold text-cofre-blue" style={{ fontSize: '15px', fontWeight: '700' }}>
              {percentualTotal.toFixed(1)}%
            </td>
            <td className="py-3 px-4 text-right font-bold text-cofre-blue" style={{ fontSize: '15px', fontWeight: '700' }}>
              {formatCurrency(totalSaldo)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
