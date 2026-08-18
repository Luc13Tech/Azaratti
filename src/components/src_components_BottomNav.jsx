import { NavLink } from "react-router-dom";
import { Compass, Search as SearchIcon, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "../context/CartContext";

// L'icône profil ne mène plus à l'espace admin (retiré pour des raisons de sécurité) —
// elle pointe vers les favoris/compte client. L'accès admin se fait via le geste caché
// sur le logo (voir Header.jsx).
const navItems = [
  { to: "/", icon: Compass, label: "Accueil" },
  { to: "/explorer", icon: SearchIcon, label: "Explorer" },
  { to: "/panier", icon: ShoppingBag, label: "Panier" },
  { to: "/favoris", icon: Heart, label: "Favoris" },
  { to: "/favoris", icon: User, label: "Profil" },
];

export default function BottomNav() {
  const { count } = useCart();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-anthracite-light/95 backdrop-blur
                 border-t border-gold/15 px-4 pt-3 pb-6 z-40"
      aria-label="Navigation principale"
    >
      <ul className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <li key={label} className="relative">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 transition-colors ${
                  isActive ? "text-gold" : "text-ivory/50"
                }`
              }
              aria-label={label}
            >
              <Icon size={22} strokeWidth={1.5} />
              {to === "/panier" && count > 0 && (
                <span className="absolute -top-1 right-0 bg-bordeaux text-ivory text-[10px]
                                  w-4 h-4 rounded-full flex items-center justify-center font-body">
                  {count}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
