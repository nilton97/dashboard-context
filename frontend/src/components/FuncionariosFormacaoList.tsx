import Avatar from './Avatar';

interface FuncionarioFormado {
  id: number;
  nome: string;
  departamento: string;
  formacoesConcluidas: number;
  totalHoras: number;
  foto?: string;
}

interface FuncionariosFormacaoListProps {
  funcionarios: FuncionarioFormado[];
  loading?: boolean;
}

export default function FuncionariosFormacaoList({ funcionarios, loading }: FuncionariosFormacaoListProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cofre-blue mx-auto mb-2"></div>
        <p className="text-cofre-grayLight">Carregando funcionários...</p>
      </div>
    );
  }

  if (funcionarios.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-cofre-grayLight">Nenhum funcionário encontrado</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
            <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: 'normal', width: '60px' }}>
              Foto
            </th>
            <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: 'normal' }}>
              Nome
            </th>
            <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: 'normal' }}>
              Departamento
            </th>
            <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: 'normal' }}>
              Formações Concluídas
            </th>
            <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: 'normal' }}>
              Total Horas
            </th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr 
              key={funcionario.id} 
              className="border-b hover:bg-gray-50 transition-colors" 
              style={{ borderColor: '#e0e0e0' }}
            >
              <td className="py-3 px-4">
                <Avatar nome={funcionario.nome} foto={funcionario.foto} size={40} />
              </td>
              <td className="py-3 px-4 text-cofre-gray" style={{ fontSize: '14px' }}>
                {funcionario.nome}
              </td>
              <td className="py-3 px-4 text-cofre-gray" style={{ fontSize: '14px' }}>
                {funcionario.departamento}
              </td>
              <td className="py-3 px-4 text-cofre-gray font-semibold" style={{ fontSize: '14px', fontWeight: '600' }}>
                {funcionario.formacoesConcluidas}
              </td>
              <td className="py-3 px-4 text-cofre-gray font-semibold" style={{ fontSize: '14px', fontWeight: '600' }}>
                {funcionario.totalHoras} horas
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
