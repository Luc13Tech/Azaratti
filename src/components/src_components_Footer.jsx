import { Link } from "react-router-dom";
import { MessageCircle, Mail } from "lucide-react";
import { useContent } from "../hooks/useApi";

const WHATSAPP_NUMBER = "221779348484";
const CONTACT_EMAIL = "Contact@azaratti.com";

export default function Footer() {
  const { content } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-gold/15 bg-anthracite-light/60 px-6 pt-8 pb-6">
      <h2 className="font-display text-xl text-gold text-center mb-2">AzaRatti</h2>
      <p className="text-ivory/50 font-body text-xs text-center leading-relaxed max-w-xs mx-auto mb-6">
        {content.footer_texte ||
          "Montres, chaussures et accessoires sélectionnés avec exigence, pour une élégance intemporelle."}
      </p>

      <div className="flex justify-center gap-5 mb-6 text-xs font-body">
        <Link to="/" className="text-ivory/60 hover:text-gold transition-colors">
          Accueil
        </Link>
        <Link to="/explorer" className="text-ivory/60 hover:text-gold transition-colors">
          Explorer
        </Link>
        <Link to="/a-propos" className="text-ivory/60 hover:text-gold transition-colors">
          À propos
        </Link>
        <Link to="/favoris" className="text-ivory/60 hover:text-gold transition-colors">
          Favoris
        </Link>
      </div>

      <div className="flex justify-center gap-6 mb-6">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-ivory/50 text-xs font-body"
        >
          <MessageCircle size={14} className="text-gold" /> WhatsApp
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="flex items-center gap-1.5 text-ivory/50 text-xs font-body"
        >
          <Mail size={14} className="text-gold" /> {CONTACT_EMAIL}
        </a>
      </div>

      <p className="text-ivory/30 font-body text-[11px] text-center">
        © {year} AzaRatti — Tous droits réservés
      </p>
    </footer>
  );
}
