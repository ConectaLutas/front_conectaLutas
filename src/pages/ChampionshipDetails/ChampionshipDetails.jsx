import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api'; // Certifique-se de que este caminho está correto
import './ChampionshipDetails.css';

const ChampionshipDetails = () => {
  const { id } = useParams();
  const [championship, setChampionship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inscriptionStatus, setInscriptionStatus] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        // Usando a instância 'api' do Axios para buscar os detalhes do campeonato
        const response = await api.get(`/Campeonato/${id}`); // baseURL já está configurada
        setChampionship(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do campeonato:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleInscricao = async () => {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);

    if (!token) {
      alert('Você precisa estar logado para se inscrever.');
      return;
    }

    try {
      const response = await api.post(
        `/api/Inscricao/${id}/inscrever`,
        {}
      );
      console.log('Resposta:', response.data);
      setInscriptionStatus(response.data.mensagem || 'Inscrição realizada com sucesso!');
    } catch (error) {
      console.error('Erro na requisição de inscrição:', error);
      setInscriptionStatus(
        `Erro na inscrição: ${JSON.stringify(error.response?.data) || error.message}`
      );
    }
  };

  if (isLoading) return <p>Carregando detalhes...</p>;
  if (!championship) return <p>Campeonato não encontrado.</p>;

  return (
    <div className="championship-details-container">
      <h1>{championship.nome}</h1>
      <img
        src={
          championship.fotoUrl
            ? `https://api-conectalutas.onrender.com${championship.fotoUrl}`
            : 'https://placehold.co/600x400'
        }
        alt={championship.nome}
        className="championship-image"
      />
      <p><strong>Data:</strong> {new Date(championship.dataInicio).toLocaleDateString()} até {new Date(championship.dataFim).toLocaleDateString()}</p>
      <p><strong>Local:</strong> {championship.localEvento}</p>
      <p><strong>Sobre o evento:</strong> {championship.sobreEvento}</p>
      <p><strong>Taxa de inscrição:</strong> R$ {championship.taxaInscricao}</p>
      <p><strong>Premiações:</strong> {championship.premiacoes}</p>
      <p><strong>Idade permitida:</strong> {championship.idadeMinima} - {championship.idadeMaxima} anos</p>
      <p><strong>Máximo de inscritos:</strong> {championship.maxInscritos}</p>
      <p>
        <a href={championship.linkRegulamento} target="_blank" rel="noopener noreferrer">Regulamento</a> |{' '}
        <a href={championship.linkInscricao} target="_blank" rel="noopener noreferrer">Inscreva-se</a>
      </p>

      <button onClick={handleInscricao}>Inscrever-se no campeonato</button>

      {inscriptionStatus && <p className="status-message">{inscriptionStatus}</p>}
    </div>
  );
};

export default ChampionshipDetails;