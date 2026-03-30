import Avatar from './Avatar';

interface Funcionario {
  id: number;
  nome: string;
  departamento: string;
  nota?: number;
  comarca?: string;
  objetivo?: string;
  foto?: string;
}

interface FuncionariosListProps {
  funcionarios: Funcionario[];
  loading?: boolean;
}

export default function FuncionariosList({ funcionarios, loading }: FuncionariosListProps) {
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
            {funcionarios[0]?.nota !== undefined && (
              <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: 'normal' }}>
                Nota
              </th>
            )}
            {funcionarios[0]?.comarca && (
              <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: 'normal' }}>
                Comarca
              </th>
            )}
            {funcionarios[0]?.objetivo && (
              <th className="text-left py-3 px-4 font-normal text-cofre-gray" style={{ fontSize: '14px', fontWeight: 'normal' }}>
                Objetivo
              </th>
            )}
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
              {funcionario.nota !== undefined && (
                <td className="py-3 px-4 text-cofre-gray font-semibold" style={{ fontSize: '14px', fontWeight: '600' }}>
                  {funcionario.nota.toFixed(1)}
                </td>
              )}
              {funcionario.comarca && (
                <td className="py-3 px-4 text-cofre-gray" style={{ fontSize: '14px' }}>
                  {funcionario.comarca}
                </td>
              )}
              {funcionario.objetivo && (
                <td className="py-3 px-4 text-cofre-gray" style={{ fontSize: '14px' }}>
                  {funcionario.objetivo}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
