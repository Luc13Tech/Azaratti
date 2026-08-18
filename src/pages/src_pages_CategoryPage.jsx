import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useApi";
import { useFavorites } from "../hooks/useFavorites";

export default function CategoryPage() {
  const { category } = useParams();
  const { products, loading } = useProducts({ category, inStock: "true" });
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="pb-28 px-6 pt-8">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/" aria-label="Retour à l'accueil" className="text-gold">
          <ChevronLeft size={22} />
        </Link>
        <h1 className="font-display text-2xl text-ivory">{category}</h1>
      </div>

      {loading && <p className="text-ivory/50 font-body text-sm">Chargement de la collection…</p>}

      {!loading && products.length === 0 && (
        <p className="text-ivory/50 font-body text-sm">
          Aucun article dans cette catégorie pour le moment. Reviens bientôt pour découvrir nos nouveautés.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} favorites={favorites} toggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  );
}
