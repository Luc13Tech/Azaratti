import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/recherche?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="px-6 pt-8 pb-4">
      <div className="flex justify-center mb-6">
        <img
          src="/logo.png"
          alt="AzaRatti"
          className="h-11 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "block";
          }}
        />
        <h1
          className="hidden text-4xl font-display text-gold tracking-wide"
          style={{ display: "none" }}
        >
          AzaRatti
        </h1>
      </div>

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
