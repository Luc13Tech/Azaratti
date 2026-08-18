import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Les 4 quadrants de la roue, dans l'ordre visuel de la maquette
// (haut-gauche → haut-droit → bas-droit → bas-gauche)
const segments = [
  { label: "Montres", category: "Montres", angle: -45 },
  { label: "Chaussures", category: "Chaussures", angle: 45 },
  { label: "Accessoires", category: "Accessoires", angle: 135 },
  { label: "Maroquinerie", category: "Maroquinerie", angle: -135 },
];

export default function CollectionWheel() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center py-8">
      <h2 className="font-display text-2xl text-ivory mb-8">Collection Explorer</h2>

      <div className="relative w-72 h-72">
        {/* Anneau extérieur or */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark" />

        {/* Séparateurs de quadrants */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-anthracite/40 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-anthracite/40 -translate-x-1/2" />
        </div>

        {/* Cercle intérieur bordeaux "S'Inspirer" */}
        <button
          onClick={() => navigate("/explorer")}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-40 h-40 rounded-full bg-gradient-to-br from-bordeaux-light to-bordeaux-dark
                     flex items-center justify-center shadow-xl border-2 border-anthracite/60
                     hover:scale-105 transition-transform"
        >
          <span className="font-heading text-xl text-ivory italic">S'Inspirer</span>
        </button>

        {/* Libellés des 4 catégories, positionnés sur l'anneau */}
        {segments.map((seg) => (
          <motion.button
            key={seg.category}
            onClick={() => navigate(`/categorie/${seg.category}`)}
            whileTap={{ scale: 0.95 }}
            className="absolute w-24 text-center font-heading text-sm text-anthracite font-semibold
                       tracking-wide uppercase"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${seg.angle}deg) translate(0, -108px) rotate(${-seg.angle}deg) translate(-50%, -50%)`,
            }}
            aria-label={`Explorer la catégorie ${seg.label}`}
          >
            {seg.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
