const API_BASE_URL = window.location.origin;

async function fetchAPI(endpoint, params = {}) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}${endpoint}${queryString ? '?' + queryString : ''}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Avaliação de Desempenho
const avaliacaoDesempenhoAPI = {
    getKPIs: () => fetchAPI('/api/avaliacao-desempenho/kpis'),
    getDesempenhoPorDepartamento: (ano) => fetchAPI('/api/avaliacao-desempenho/desempenho-departamento', { ano }),
    getDistribuicaoNotas: () => fetchAPI('/api/avaliacao-desempenho/distribuicao-notas'),
    getDesempenhoPorComarca: (ano) => fetchAPI('/api/avaliacao-desempenho/desempenho-comarca', { ano }),
    getTopPerformers: (limit = 5) => fetchAPI('/api/avaliacao-desempenho/top-performers', { limit }),
    getDesempenhoPorObjetivo: (ano) => fetchAPI('/api/avaliacao-desempenho/desempenho-objetivo', { ano }),
    getRadarPorGrupoAlvo: (ano) => fetchAPI('/api/avaliacao-desempenho/radar-grupo-alvo', { ano })
};

// RH
const rhAPI = {
    getKPIs: () => fetchAPI('/api/rh/kpis'),
    getFuncionariosPorDepartamento: (ano) => fetchAPI('/api/rh/funcionarios-departamento', { ano }),
    getDistribuicaoGenero: () => fetchAPI('/api/rh/distribuicao-genero'),
    getFaixasEtarias: () => fetchAPI('/api/rh/faixas-etarias'),
    getDetalhesAntiguidade: (ano) => fetchAPI('/api/rh/antiguidade', { ano }),
    getHabilitacoesLiterarias: () => fetchAPI('/api/rh/habilitacoes-literarias')
};

// Recrutamento/Formação
const recrutamentoFormacaoAPI = {
    getKPIs: () => fetchAPI('/api/recrutamento-formacao/kpis'),
    getConcursos: (estado, ano) => fetchAPI('/api/recrutamento-formacao/concursos', { estado, ano }),
    getFormacoes: (estado, ano) => fetchAPI('/api/recrutamento-formacao/formacoes', { estado, ano }),
    getCandidatosPorConcurso: (concursoId) => fetchAPI('/api/recrutamento-formacao/candidatos-concurso', { concursoId }),
    getFormacoesPorArea: (ano) => fetchAPI('/api/recrutamento-formacao/formacoes-area', { ano }),
    getEstatisticasFormacao: (ano) => fetchAPI('/api/recrutamento-formacao/estatisticas-formacao', { ano })
};

// Exportar para uso global
window.avaliacaoDesempenhoAPI = avaliacaoDesempenhoAPI;
window.rhAPI = rhAPI;
window.recrutamentoFormacaoAPI = recrutamentoFormacaoAPI;
