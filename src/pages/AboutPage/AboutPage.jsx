import React from 'react';
import './AboutPage.css'; // Importa o CSS específico

const AboutPage = () => {
  return (
    <div className="about-page"> {/* Container principal da página */}
      <div className="about-content"> {/* Container para o conteúdo */}
        <h1>Quem Somos</h1>

        <section>
          <h2>Nossa Missão</h2>
          <p>
            {/* ADICIONE AQUI O TEXTO SOBRE A MISSÃO DA SUA PLATAFORMA */}
            Exemplo: Conectar atletas, academias e organizadores de eventos de Jiu-Jitsu,
            fortalecendo a comunidade e promovendo o crescimento do esporte através
            de uma plataforma centralizada e fácil de usar...
          </p>
        </section>

        <section>
          <h2>O Que Fazemos</h2>
          <p>
            {/* ADICIONE AQUI O TEXTO SOBRE AS FUNCIONALIDADES */}
            Exemplo: Oferecemos um espaço para divulgação e gerenciamento simplificado
            de campeonatos, um diretório completo de academias para atletas encontrarem
            onde treinar, e as últimas notícias e artigos sobre o mundo do Jiu-Jitsu...
          </p>
        </section>

        <section>
          <h2>Nossa Visão</h2>
          <p>
            {/* ADICIONE AQUI O TEXTO SOBRE A VISÃO DE FUTURO */}
            Exemplo: Almejamos ser a principal referência online para a comunidade de
            Jiu-Jitsu no Brasil, reconhecida pela qualidade da informação, facilidade
            de uso e contribuição para o desenvolvimento da arte suave...
          </p>
        </section>

        <section>
          <h2>Para Quem</h2>
          <p>
            {/* ADICIONE AQUI O TEXTO SOBRE O PÚBLICO-ALVO */}
            Exemplo: Nossa plataforma foi criada para atletas em busca de eventos e locais
            de treino, organizadores que desejam simplificar a gestão de seus campeonatos,
            donos de academia que querem aumentar sua visibilidade, e todos os apaixonados
            pelo Jiu-Jitsu...
          </p>
        </section>

        {/* Você pode adicionar mais seções, como "Nossa História" ou "Nossos Valores" */}

      </div>
    </div>
  );
};

export default AboutPage;