import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Page Components
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AboutPage from './pages/AboutPage/AboutPage'; // Assumindo que foi criada
// import NovidadesPage from './pages/NovidadesPage/NovidadesPage'; // Exemplo
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage'; // Exemplo 404

// Estilos Globais são importados em index.js, não aqui diretamente

function App() {
  return (
    // O Router envolve toda a aplicação
    <Router>
      {/* A div com class="App" é usada pelo index.css para layout flex */}
      <div className="App">
        <Header />

        {/* Conteúdo principal - <main> é estilizado globalmente */}
        <main>
          <Routes>
            {/* Definição das Rotas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/quem-somos" element={<AboutPage />} />

            {/* Adicione outras rotas aqui */}
            {/* <Route path="/novidades" element={<NovidadesPage />} /> */}

            {/* Rota para página não encontrada (404) - opcional */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;