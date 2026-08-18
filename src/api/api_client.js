import axios from "axios";

// ⚠️ Une fois le backend déployé sur Render, remplace cette URL si besoin
// (elle correspond déjà à https://backend-azaratti.onrender.com)
export const API_URL = "https://backend-azaratti.onrender.com/api";

const client = axios.create({
  baseURL: API_URL,
});

// Ajoute automatiquement le token admin aux requêtes protégées
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("azaratti_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
