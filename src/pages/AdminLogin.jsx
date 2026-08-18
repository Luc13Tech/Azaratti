import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const success = await login(password);
      if (success) {
        navigate("/admin/tableau-de-bord");
      } else {
        setError("Mot de passe incorrect.");
      }
    } catch {
      setError("Mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-28 px-6 pt-16 flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
        <Lock size={24} className="text-gold" />
      </div>
      <h1 className="font-display text-2xl text-ivory mb-1">Espace Administrateur</h1>
      <p className="text-ivory/50 font-body text-sm mb-8 text-center">
        Accès réservé à l'équipe AzaRatti
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full bg-transparent border border-gold/40 rounded-full py-3 px-5 mb-3
                     text-ivory placeholder:text-ivory/40 font-body text-sm text-center
                     focus:border-gold transition-colors"
          autoFocus
        />
        {error && <p className="text-bordeaux-light text-xs font-body text-center mb-3">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-anthracite font-body font-medium tracking-wide uppercase
                     text-sm py-3.5 rounded-full disabled:opacity-50"
        >
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
