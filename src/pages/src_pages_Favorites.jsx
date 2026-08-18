import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useApi";
import { useFavorites } from "../hooks/useFavorites";

export default function Favorites() {
  const { products } = useProducts();
  const { favorites, toggleFavorite } = useFavorites();
  const favProducts = products.filter((p) => favorites.includes(p._id));

  return (
    <div className="pb-28 px-6 pt-8">
      <h1 className="font-display text-2xl text-ivory mb-6">Mes Favoris</h1>

      {favProducts.length === 0 ? (
        <div className="text-center">
          <p className="text-ivory/50 font-body text-sm mb-6">
            Vous n'avez pas encore ajouté d'article à vos favoris.
          </p>
          <Link
            to="/explorer"
            className="inline-block border border-gold text-gold font-body text-sm tracking-wide
                       uppercase px-6 py-3 rounded-full"
          >
            Explorer la collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {favProducts.map((p) => (
            <ProductCard key={p._id} product={p} favorites={favorites} toggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </div>
  );
}
