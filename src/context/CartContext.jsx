import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);
const WHATSAPP_NUMBER = "221779348484";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("azaratti_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("azaratti_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i._id !== id));

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setItems((prev) => prev.map((i) => (i._id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const formatPrice = (n) => new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

  const getWhatsAppLink = () => {
    let message = "Bonjour AzaRatti, je souhaite passer la commande suivante :\n\n";
    items.forEach((item) => {
      message += `• ${item.title} (${item.category}) — Qté : ${item.quantity} — ${formatPrice(
        item.price * item.quantity
      )}\n`;
    });
    message += `\nTotal : ${formatPrice(total)}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        formatPrice,
        getWhatsAppLink,
        count: items.reduce((n, i) => n + i.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
