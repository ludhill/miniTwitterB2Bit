import axios from 'axios';

/**
 * Criação da instância base do Axios.
 * O baseURL aponta para o container Docker que está rodando a API.
 */
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * INTERCEPTOR DE REQUISIÇÃO
 * * Antes de cada chamada ser enviada ao servidor, este bloco verifica 
 * se existe um token no LocalStorage e o anexa ao cabeçalho Authorization.
 * Isso evita a repetição de código em todas as páginas do app.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      // O padrão Bearer é o esperado por APIs que utilizam JWT
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (erro) => {
    return Promise.reject(erro);
  }
);

/**
 * INTERCEPTOR DE RESPOSTA
 * * Útil para capturar erros globais, como o 401 (Não Autorizado).
 * Se o token expirar, podemos deslogar o usuário automaticamente.
 */
api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    if (erro.response?.status === 401) {
      // Se o token for inválido ou expirado, limpamos o acesso e recarregamos
      localStorage.removeItem('token');
      localStorage.removeItem('usuarioId');
      // window.location.href = '/'; // Opcional: redireciona para o login
    }
    return Promise.reject(erro);
  }
);

export default api;