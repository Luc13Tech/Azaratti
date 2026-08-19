import { Link } from "react-router-dom";
import Header from "../components/Header";
import CollectionWheel from "../components/CollectionWheel";
import NewBadge from "../components/NewBadge";
import Footer from "../components/Footer";
import { useProducts, useContent } from "../hooks/useApi";

export default function Home() {
  const { products: featured } = useProducts({ featured: "true" });
  const { content } = useContent();

  // Les 4 tuiles de la grille : la 1ère met en avant un produit "style de vie",
  // les 2 suivantes des produits vedettes, la 4ème mène à la collection complète.
  const spotlight = featured[0];
  const inspiration1 = featured[1];
  const inspiration2 = featured[2];

  return (
    <div className="pb-28">
      <Header />

      <section className="px-6 grid grid-cols-2 gap-3">
        {/* Tuile large - image de style */}
        <Link
          to={spotlight ? `/produit/${spotlight._id}` : "/explorer"}
          className="relative row-span-2 rounded-2xl overflow-hidden aspect-[3/5] bg-anthracite-card"
        >
          {spotlight ? (
            <>
              {spotlight.isNew && <NewBadge />}
              <img src={spotlight.imageUrl} alt={spotlight.title} className="w-full h-full object-cover" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-ivory/30 text-sm font-body px-4 text-center">
              {content.spotlight_placeholder || "Article vedette à venir"}
            </div>
          )}
        </Link>

        {/* Tuile "Inspiration du Moment" #1 */}
        <Link
          to={inspiration1 ? `/produit/${inspiration1._id}` : "/explorer"}
          className="relative rounded-2xl overflow-hidden aspect-square bg-anthracite-card"
        >
          {inspiration1 && <img src={inspiration1.imageUrl} alt="" className="w-full h-full object-cover" />}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-anthracite via-anthracite/60 to-transparent p-3 pt-8">
            <p className="font-heading text-sm text-ivory italic">L'Inspiration du Moment</p>
          </div>
        </Link>

        {/* Tuile "Découvrir la Collection" */}
        <Link
          to="/explorer"
          className="relative rounded-2xl overflow-hidden aspect-square bg-anthracite-card"
        >
          {inspiration2 && <img src={inspiration2.imageUrl} alt="" className="w-full h-full object-cover" />}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-anthracite via-anthracite/60 to-transparent p-3 pt-8">
            <p className="font-heading text-sm text-ivory italic">Découvrir la Collection</p>
          </div>
        </Link>
      </section>

      <CollectionWheel />
      <Footer />
    </div>
  );
}
