import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-conectalutas.onrender.com',    //'https://api-conectalutas.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição para adicionar o token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>  Promise.reject(error)
  
);

export default api;