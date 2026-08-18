import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total, formatPrice, getWhatsAppLink } = useCart();

  if (items.length === 0) {
    return (
      <div className="pb-28 px-6 pt-8 text-center">
        <h1 className="font-display text-2xl text-ivory mb-3">Votre panier</h1>
        <p className="text-ivory/50 font-body text-sm mb-6">
          Votre panier est vide pour l'instant. Explorez nos collections pour trouver votre prochaine pièce.
        </p>
        <Link
          to="/explorer"
          className="inline-block border border-gold text-gold font-body text-sm tracking-wide
                     uppercase px-6 py-3 rounded-full"
        >
          Découvrir la collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-40 px-6 pt-8">
      <h1 className="font-display text-2xl text-ivory mb-6">Votre panier</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="flex gap-3 bg-anthracite-card rounded-2xl p-3 border border-gold/10">
            <img src={item.imageUrl} alt={item.title} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-heading text-ivory truncate">{item.title}</p>
              <p className="text-gold text-sm font-body mb-2">{formatPrice(item.price)}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 border border-gold/30 rounded-full px-2.5 py-1">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} aria-label="Diminuer">
                    <Minus size={12} className="text-gold" />
                  </button>
                  <span className="font-body text-ivory text-sm w-3 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} aria-label="Augmenter">
                    <Plus size={12} className="text-gold" />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item._id)} aria-label="Retirer du panier">
                  <Trash2 size={16} className="text-ivory/40" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 left-0 right-0 px-6">
        <div className="bg-anthracite-light border border-gold/20 rounded-2xl p-4 shadow-xl max-w-md mx-auto">
          <div className="flex justify-between font-body text-sm mb-3">
            <span className="text-ivory/60">Total</span>
            <span className="text-gold text-lg font-heading">{formatPrice(total)}</span>
          </div>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-gold text-anthracite
                       font-body font-medium tracking-wide uppercase text-sm py-3.5 rounded-full"
          >
            <MessageCircle size={18} />
            Commander via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
