import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

// Chemin secret de l'espace admin — connu uniquement de l'équipe AzaRatti.
// Non lié dans aucun menu visible, accessible uniquement via le geste caché ci-dessous.
const ADMIN_SECRET_PATH = "/azaratti-team-9k2x";
const TAPS_REQUIRED = 5;
const TAP_WINDOW_MS = 2500;

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/recherche?q=${encodeURIComponent(query.trim())}`);
  };

  // Geste caché : 5 appuis rapides sur le logo ouvrent l'espace admin.
  // Rien ne l'indique visuellement, pour que seule l'équipe qui connaît le geste l'utilise.
  const handleLogoTap = () => {
    tapCountRef.current += 1;
    clearTimeout(tapTimerRef.current);

    if (tapCountRef.current >= TAPS_REQUIRED) {
      tapCountRef.current = 0;
      navigate(ADMIN_SECRET_PATH);
      return;
    }

    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, TAP_WINDOW_MS);
  };

  return (
    <header className="px-6 pt-8 pb-4">
      <button
        onClick={handleLogoTap}
        aria-label="AzaRatti"
        className="flex flex-col items-center gap-2 mx-auto mb-6 focus:outline-none"
      >
        <img
          src="/logo.png"
          alt=""
          className="h-12 w-12 object-contain rounded-full select-none"
          draggable={false}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <h1 className="font-display text-[2.75rem] leading-none text-gold tracking-wide">
          AzaRatti
        </h1>
      </button>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher"
          className="w-full bg-transparent border border-gold/40 rounded-full py-3 pl-5 pr-12
                     text-ivory placeholder:text-ivory/40 font-body text-sm
                     focus:border-gold transition-colors"
        />
        <button
          type="submit"
          aria-label="Lancer la recherche"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gold"
        >
          <Search size={18} />
        </button>
      </form>
    </header>
  );
}
