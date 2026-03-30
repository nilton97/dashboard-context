import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AvaliacaoDesempenhoDashboard from './pages/AvaliacaoDesempenhoDashboard';
import RHDashboard from './pages/RHDashboard';
import RecrutamentoFormacaoDashboard from './pages/RecrutamentoFormacaoDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/avaliacao-desempenho" element={<AvaliacaoDesempenhoDashboard />} />
          <Route path="/rh" element={<RHDashboard />} />
          <Route path="/recrutamento-formacao" element={<RecrutamentoFormacaoDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
