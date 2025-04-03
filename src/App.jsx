import React from 'react';
// Importações do React Router DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importações dos Componentes de Layout (aparecem em todas as páginas)
import Header from './components/Header/Header'; // Caminho: src/components/Header/Header.jsx
import Footer from './components/Footer/Footer'; // Caminho: src/components/Footer/Footer.jsx

// Importações dos Componentes de Página (conteúdo principal que muda)
import Home from './pages/Home/Home';               // Caminho: src/pages/Home/Home.jsx
import LoginPage from './pages/LoginPage/LoginPage';       // Caminho: src/pages/LoginPage/LoginPage.jsx
import RegisterPage from './pages/RegisterPage/RegisterPage'; // Caminho: src/pages/RegisterPage/RegisterPage.jsx
// Importe aqui outras páginas que você criar (ex: Novidades, QuemSomos, etc.)
// import NovidadesPage from './pages/NovidadesPage/NovidadesPage';

function App() {
  return (
    // O BrowserRouter (apelidado de Router) habilita o roteamento na aplicação
    <Router>
      <div className="App"> {/* Classe geral da aplicação, se houver estilos globais */}

        {/* Header é renderizado fora do <Routes> para estar presente em todas as páginas */}
        <Header />

        {/* A tag <main> é semanticamente correta para o conteúdo principal da página */}
        <main>
          {/* O componente <Routes> define a área onde o conteúdo da rota será trocado */}
          <Routes>
            {/* Cada <Route> define uma rota específica */}
            {/* path="/" -> URL raiz do site */}
            {/* element={<Home />} -> Componente a ser renderizado para essa URL */}
            <Route path="/" element={<Home />} />

            {/* Rota para a página de Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rota para a página de Cadastro */}
            <Route path="/register" element={<RegisterPage />} />

            {/* Exemplo de como adicionar outras rotas no futuro */}
            {/* <Route path="/novidades" element={<NovidadesPage />} /> */}
            {/* <Route path="/quem-somos" element={<QuemSomosPage />} /> */}

            {/* Você pode adicionar uma rota "catch-all" para páginas não encontradas (404) */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}

          </Routes>
        </main>

        {/* Footer também é renderizado fora do <Routes> */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;