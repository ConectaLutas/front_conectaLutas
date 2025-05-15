// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-conectalutas.onrender.com/', // ajuste a URL conforme seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
