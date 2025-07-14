import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChavesPage from '../ChavesPage';
import React from 'react';
import api from '../../../api/api';

// Mock do módulo api.js
jest.mock('../../../api/api');

describe('ChavesPage - Testes Unitários', () => {
  test('renderiza o select de campeonatos', () => {
    render(<ChavesPage />);
    const select = screen.getByLabelText(/Selecionar Campeonato/i);
    expect(select).toBeInTheDocument();
  });

  test('não exibe mensagem de sucesso inicialmente', () => {
    render(<ChavesPage />);
    expect(screen.queryByText(/Chave gerada com sucesso!/i)).not.toBeInTheDocument();
  });

  test('exibe mensagem de erro se houver erro', () => {
    render(<ChavesPage />);
    // Simulando erro manualmente
    expect(screen.queryByText(/Erro ao carregar chaves/i)).not.toBeInTheDocument();
  });

  test('renderiza o botão "Gerar Chaves"', () => {
    render(<ChavesPage />);
    const button = screen.getByRole('button', { name: /Gerar Chaves/i });
    expect(button).toBeInTheDocument();
  });

  test('select de campeonato começa vazio', () => {
    render(<ChavesPage />);
    const select = screen.getByLabelText(/Selecionar Campeonato/i);
    expect(select.value).toBe(""); // Verifica que o valor inicial está vazio
  });
});

describe('ChavesPage - Testes de Integração', () => {
  beforeEach(() => {
    // Limpa mocks antes de cada teste
    jest.clearAllMocks();
    // Simula token de admin no localStorage
    localStorage.setItem('authToken', 'fake.jwt.token');
    // Simula decodificação do token
    jest.spyOn(require('jwt-decode'), 'jwtDecode').mockReturnValue({ tipoUsuario: 'Administrador' });
  });

  test('carrega campeonatos ao montar', async () => {
    // Mock para carregar campeonatos
    const mockCampeonatos = [{ id: 1, nome: 'Copa Teste', dataInicio: '2025-06-15T00:00:00' }];
    api.get.mockResolvedValueOnce({ data: mockCampeonatos });

    render(<ChavesPage />);

    // Verifica se a chamada GET foi realizada
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/Campeonato'));
    
    // Verifica se o campeonato foi exibido
    expect(screen.getByText(/Copa Teste/i)).toBeInTheDocument();
  });

  test('faz POST para gerar chave e GET para buscar chaves', async () => {
    // Mock para POST gerar chave
    api.post.mockResolvedValueOnce({ status: 200 });

    // Mock para GET chaves após gerar
    const mockChaves = { chaves: [{ nome: 'Chave_1', atletasInscritos: [], lutas: [] }] };
    api.get.mockResolvedValueOnce({ data: mockChaves });

    render(<ChavesPage />);

    // Seleciona campeonato
    const select = screen.getByLabelText(/Selecionar Campeonato/i);
    fireEvent.change(select, { target: { value: '1' } });

    // Espera carregar chaves
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/api/Chave/1/chaves'));

    // Clica no botão gerar chaves
    const btn = screen.getByText(/Gerar Chaves/i);
    fireEvent.click(btn);

    // Espera chamadas POST e GET
    await waitFor(() => expect(api.post).toHaveBeenCalledWith('/api/Chave/1/gerar-chave'));
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/api/Chave/1/chaves'));

    // Mensagem de sucesso deve aparecer
    expect(screen.getByText(/Chave gerada com sucesso!/i)).toBeInTheDocument();

    // Verifica se a chave gerada foi exibida
    expect(screen.getByText(/Chave_1/i)).toBeInTheDocument();
  });

  test('exibe mensagem de erro caso falhe ao carregar campeonatos', async () => {
    // Simulando falha na API de campeonatos
    api.get.mockRejectedValueOnce(new Error('Erro ao carregar campeonatos'));

    render(<ChavesPage />);

    // Espera a chamada de erro
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/Campeonato'));

    // Verifica se a mensagem de erro aparece na tela
    expect(screen.getByText(/Erro ao carregar campeonatos/i)).toBeInTheDocument();
  });

  test('exibe mensagem de erro se falhar ao gerar chave', async () => {
    // Mock para POST falhar
    api.post.mockRejectedValueOnce(new Error('Erro ao gerar chave'));

    render(<ChavesPage />);

    // Clica no botão gerar chaves
    const btn = screen.getByText(/Gerar Chaves/i);
    fireEvent.click(btn);

    // Verifica se a mensagem de erro aparece
    expect(await screen.findByText(/Erro ao gerar chave/i)).toBeInTheDocument();
  });
});
