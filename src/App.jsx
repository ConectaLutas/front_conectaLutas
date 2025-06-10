import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserEventsPage from './pages/UserEventsPage/UserEventsPage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';

// Layout Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Page Components
import Home from './pages/Home/Home'; // Este é o NOVO Home (placeholder)
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AboutPage from './pages/AboutPage/AboutPage';
import PromoteAcademyPage from './pages/PromoteAcademyPage/PromoteAcademyPage'; // <<< IMPORTAR A NOVA PÁGINA
import ChampionshipDetails  from './pages/ChampionshipDetails/ChampionshipDetails'; 
import PerfilPage from './pages/PerfilPage/PerfilPage'// <<< IMPORTAR A NOVA PÁGINA
import CreateChampionshipPage from './pages/CreateChampionshipPage/CreateChampionshipPage'; // <<< NOVA PÁGINA
import ChavesPage from './pages/ChavesPage/ChavesPage'; // <<< PÁGINA DE CHAVES

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
            {/* Rota da Home para ver detalhes do campeoanto */}
            <Route path="/campeonato/:id" element={<ChampionshipDetails />} />
            <Route path="/perfil/:id" element={<PerfilPage />} />
            <Route path="/perfil/editar" element={<EditProfilePage />} />
            {/* Rotas existentes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/quem-somos" element={<AboutPage />} />
            <Route path="/eventos" element={<UserEventsPage />} />
            {/* <<< NOVA ROTA para a página "Divulgue sua Academia" >>> */}
            <Route path="/divulgue" element={<PromoteAcademyPage />} />
            {/* <<< NOVA ROTA para criar campeonatos (apenas admins) >>> */}
            <Route path="/criar-campeonato" element={<CreateChampionshipPage />} />
            {/* <<< NOVA ROTA para chaves (apenas admins) >>> */}
            <Route path="/chaves" element={<ChavesPage />} />

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