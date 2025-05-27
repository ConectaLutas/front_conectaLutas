import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PerfilPage.css';

const PerfilPage = () => {
  const { id } = useParams();
  const [atleta, setAtleta] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        // Tenta usar o cache salvo no login
        const localData = localStorage.getItem('atletaData');
        if (localData) {
          const parsed = JSON.parse(localData);
          if (parsed.id.toString() === id.toString()) {
            setAtleta(parsed);
            setLoading(false);
            return;
          }
        }

        // Se não houver cache ou for outro ID, faz a chamada
        const response = await fetch(`https://api-conectalutas.onrender.com/api/Atleta/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (response.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/login');
          return;
        }

        if (!response.ok) throw new Error('Erro ao buscar perfil');

        const data = await response.json();
        setAtleta(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [id, token, navigate]);

  if (loading) return <p>Carregando perfil...</p>;
  if (!atleta) return <p>Perfil não encontrado.</p>;

  return (
    <div className="perfil-page">
      <h2>Perfil do Atleta</h2>
      <p><strong>Nome:</strong> {atleta.usuario.nomeCompleto}</p>
      <p><strong>Email:</strong> {atleta.usuario.email}</p>
      <p><strong>Data de Nascimento:</strong> {new Date(atleta.dataNascimento).toLocaleDateString()}</p>
      <p><strong>Peso:</strong> {atleta.peso} kg</p>
      {/* Adicione mais campos conforme necessário */}
    </div>
  );
};

export default PerfilPage;
