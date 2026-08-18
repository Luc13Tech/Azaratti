import { useState, useEffect, useCallback } from "react";
import client from "../api/client";

// Rafraîchit la liste toutes les 15 secondes pour que les nouveautés ajoutées
// depuis l'admin apparaissent quasi instantanément sur l'application, sans
// que l'utilisateur ait besoin de recharger la page manuellement.
export function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await client.get("/products", { params });
      setProducts(res.data.products);
      setError(null);
    } catch (err) {
      setError("Impossible de charger les articles pour le moment.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 15000);
    return () => clearInterval(interval);
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

export function useContent() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      const res = await client.get("/content");
      setContent(res.data.content);
    } catch {
      // silencieux : le contenu par défaut du composant sera utilisé
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
    const interval = setInterval(fetchContent, 15000);
    return () => clearInterval(interval);
  }, [fetchContent]);

  return { content, loading, refetch: fetchContent };
}
