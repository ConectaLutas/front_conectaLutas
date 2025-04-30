import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
// --- IMPORTAR A NOVA PÁGINA ---
import AboutPage from './pages/AboutPage/AboutPage'; // Verifique o caminho

// Importe aqui outras páginas que você criar
// import NovidadesPage from './pages/NovidadesPage/NovidadesPage';

function App() {
  return (
    <Router>
      <div className="App"> {/* Classe global da aplicação */}

        <Header />

        <main>
          <Routes>
            {/* Rotas existentes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* --- ADICIONAR A NOVA ROTA --- */}
            <Route path="/quem-somos" element={<AboutPage />} />

            {/* Exemplos de outras rotas */}
            {/* <Route path="/novidades" element={<NovidadesPage />} /> */}

            {/* Rota 404 (opcional) */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}

          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;