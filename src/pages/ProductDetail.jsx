import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, Heart, Minus, Plus } from "lucide-react";
import client from "../api/client";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../hooks/useFavorites";
import NewBadge from "../components/NewBadge";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, formatPrice } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    client.get(`/products/${id}`).then((res) => setProduct(res.data.product));
  }, [id]);

  if (!product) {
    return <p className="text-ivory/50 font-body text-sm px-6 pt-8">Chargement…</p>;
  }

  const isFav = favorites.includes(product._id);

  return (
    <div className="pb-32">
      <div className="relative">
        {product.isNew && <NewBadge />}
        <button
          onClick={() => navigate(-1)}
          aria-label="Retour"
          className="absolute top-4 left-4 z-10 bg-anthracite/70 rounded-full p-2 text-gold"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => toggleFavorite(product._id)}
          aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
          className="absolute top-4 right-4 z-10 bg-anthracite/70 rounded-full p-2"
        >
          <Heart size={20} className={isFav ? "fill-bordeaux text-bordeaux" : "text-ivory"} />
        </button>
        <img src={product.imageUrl} alt={product.title} className="w-full aspect-square object-cover" />
      </div>

      <div className="px-6 pt-6">
        <p className="text-gold text-xs font-body tracking-widest uppercase mb-1">{product.category}</p>
        <h1 className="font-display text-2xl text-ivory mb-2">{product.title}</h1>
        <p className="text-gold text-xl font-heading mb-4">{formatPrice(product.price)}</p>

        {product.description && (
          <p className="text-ivory/70 font-body text-sm leading-relaxed mb-6">{product.description}</p>
        )}

        <div className="flex items-center gap-4 mb-6">
          <span className="font-body text-sm text-ivory/60">Quantité</span>
          <div className="flex items-center gap-3 border border-gold/30 rounded-full px-3 py-1.5">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuer la quantité">
              <Minus size={14} className="text-gold" />
            </button>
            <span className="font-body text-ivory w-4 text-center">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Augmenter la quantité">
              <Plus size={14} className="text-gold" />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            addToCart(product, qty);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          }}
          disabled={!product.inStock}
          className="w-full bg-gold text-anthracite font-body font-medium tracking-wide uppercase
                     text-sm py-4 rounded-full disabled:opacity-40 transition-opacity"
        >
          {!product.inStock ? "Rupture de stock" : added ? "Ajouté au panier ✓" : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
}
