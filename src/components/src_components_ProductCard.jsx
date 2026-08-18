import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import NewBadge from "./NewBadge";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, favorites, toggleFavorite }) {
  const { formatPrice } = useCart();
  const isFav = favorites?.includes(product._id);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-anthracite-card border border-gold/10">
      {product.isNew && <NewBadge />}

      {toggleFavorite && (
        <button
          onClick={() => toggleFavorite(product._id)}
          aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
          className="absolute top-3 right-3 z-10 bg-anthracite/70 rounded-full p-1.5"
        >
          <Heart
            size={16}
            className={isFav ? "fill-bordeaux text-bordeaux" : "text-ivory/80"}
          />
        </button>
      )}

      <Link to={`/produit/${product._id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <p className="font-heading text-lg text-ivory leading-tight truncate">{product.title}</p>
          <p className="text-gold text-sm font-body mt-1">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </div>
  );
}
