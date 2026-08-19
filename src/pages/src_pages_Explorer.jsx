import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useProducts } from "../hooks/useApi";
import { useFavorites } from "../hooks/useFavorites";

const categories = ["Montres", "Chaussures", "Accessoires", "Maroquinerie"];

export default function Explorer() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const { products, loading } = useProducts({ inStock: "true" });
  const { favorites, toggleFavorite } = useFavorites();

  const filtered = query
    ? products.filter((p) => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
    : products;

  return (
    <div className="pb-28 px-6 pt-8">
      <h1 className="font-display text-2xl text-ivory mb-1">
        {query ? `Résultats pour "${searchParams.get("q")}"` : "S'Inspirer"}
      </h1>
      <p className="text-ivory/50 font-body text-sm mb-6">
        {query ? `${filtered.length} article(s) trouvé(s)` : "Toute la collection AzaRatti"}
      </p>

      {!query && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 -mx-6 px-6">
          {categories.map((c) => (
            <Link
              key={c}
              to={`/categorie/${c}`}
              className="shrink-0 border border-gold/40 text-gold text-xs font-body tracking-wide
                         uppercase px-4 py-2 rounded-full"
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      {loading && <p className="text-ivory/50 font-body text-sm">Chargement…</p>}

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((p) => (
          <ProductCard key={p._id} product={p} favorites={favorites} toggleFavorite={toggleFavorite} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
