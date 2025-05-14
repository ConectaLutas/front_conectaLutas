// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/', // ajuste a URL conforme seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
