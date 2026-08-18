import axios from "axios";

// ⚠️ Une fois le backend déployé sur Render, remplace cette URL si besoin
// (elle correspond déjà à https://backend-azaratti.onrender.com)
export const API_URL = "https://backend-azaratti.onrender.com/api";

const client = axios.create({
  baseURL: API_URL,
  // Le backend Render (offre gratuite) peut mettre jusqu'à 50s à se réveiller
  // après une période d'inactivité — on laisse donc une marge confortable
  // avant de considérer que le serveur est injoignable.
  timeout: 60000,
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
