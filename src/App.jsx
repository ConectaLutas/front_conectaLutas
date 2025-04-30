import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Page Components
import Home from './pages/Home/Home'; // Este é o NOVO Home (placeholder)
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AboutPage from './pages/AboutPage/AboutPage';
import PromoteAcademyPage from './pages/PromoteAcademyPage/PromoteAcademyPage'; // <<< IMPORTAR A NOVA PÁGINA

// import NovidadesPage from './pages/NovidadesPage/NovidadesPage';
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Routes>
            {/* Rota da Home agora aponta para o novo componente Home */}
            <Route path="/" element={<Home />} />

            {/* Rotas existentes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/quem-somos" element={<AboutPage />} />

            {/* <<< NOVA ROTA para a página "Divulgue sua Academia" >>> */}
            <Route path="/divulgue" element={<PromoteAcademyPage />} />

            {/* Adicione outras rotas aqui */}
            {/* <Route path="/novidades" element={<NovidadesPage />} /> */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;