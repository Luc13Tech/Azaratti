import { Link } from "react-router-dom";
import { ChevronLeft, ImageIcon } from "lucide-react";
import { useContent } from "../hooks/useApi";
import Footer from "../components/Footer";

const showcases = [
  {
    imageKey: "about_montres_image",
    textKey: "about_montres_texte",
    title: "Montres",
    fallback:
      "Des garde-temps choisis pour leur précision et leur caractère, entre tradition horlogère et allure contemporaine.",
  },
  {
    imageKey: "about_chaussures_image",
    textKey: "about_chaussures_texte",
    title: "Chaussures",
    fallback:
      "Cuirs nobles et finitions soignées : une sélection pensée pour accompagner chaque pas avec élégance.",
  },
  {
    imageKey: "about_pret_a_porter_image",
    textKey: "about_pret_a_porter_texte",
    title: "Prêt-à-porter",
    fallback:
      "Des pièces vestimentaires qui complètent l'allure AzaRatti, pour une silhouette affirmée en toute occasion.",
  },
];

export default function About() {
  const { content } = useContent();

  return (
    <div className="pb-28">
      <div className="flex items-center gap-2 px-6 pt-8 mb-6">
        <Link to="/" aria-label="Retour à l'accueil" className="text-gold">
          <ChevronLeft size={22} />
        </Link>
        <h1 className="font-display text-2xl text-ivory">À propos</h1>
      </div>

      <div className="px-6 mb-10">
        <p className="text-ivory/70 font-body text-sm leading-relaxed">
          {content.about_intro ||
            "AzaRatti réunit montres, chaussures et pièces de prêt-à-porter sélectionnées avec exigence, pour une élégance sobre et affirmée. Chaque article est choisi pour sa qualité, ses finitions et son intemporalité."}
        </p>
      </div>

      <div className="space-y-8 px-6">
        {showcases.map((s) => {
          const imageUrl = content[s.imageKey];
          const text = content[s.textKey] || s.fallback;
          return (
            <div key={s.title}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-anthracite-card border border-gold/10 mb-3">
                {imageUrl ? (
                  <img src={imageUrl} alt={s.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-ivory/25">
                    <ImageIcon size={26} />
                    <span className="font-body text-xs">Photo à ajouter depuis l'administration</span>
                  </div>
                )}
              </div>
              <h2 className="font-heading text-xl text-gold italic mb-1.5">{s.title}</h2>
              <p className="text-ivory/60 font-body text-sm leading-relaxed">{text}</p>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
