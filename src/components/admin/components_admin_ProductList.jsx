import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import client from "../../api/client";
import ProductForm from "./ProductForm";

export default function ProductList({ products, onChanged }) {
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await client.delete(`/products/${id}`);
      onChanged();
    } catch {
      alert("Impossible de supprimer cet article pour le moment.");
    } finally {
      setDeletingId(null);
    }
  };

  if (products.length === 0) {
    return (
      <p className="text-ivory/50 font-body text-sm text-center py-8">
        Aucun article publié pour le moment. Utilise le bouton "Ajouter un article" ci-dessus.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((p) => (
        <div key={p._id}>
          {editingId === p._id ? (
            <div className="relative">
              <button
                onClick={() => setEditingId(null)}
                aria-label="Fermer l'édition"
                className="absolute -top-2 -right-2 z-10 bg-anthracite border border-gold/30 rounded-full p-1.5"
              >
                <X size={14} className="text-gold" />
              </button>
              <ProductForm
                existingProduct={p}
                onSaved={() => {
                  setEditingId(null);
                  onChanged();
                }}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-anthracite-card border border-gold/10 rounded-2xl p-3">
              <img src={p.imageUrl} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-heading text-ivory truncate">{p.title}</p>
                  {p.isNew && (
                    <span className="text-[10px] bg-gold text-anthracite font-semibold px-1.5 py-0.5 rounded-full shrink-0">
                      Nouveau
                    </span>
                  )}
                </div>
                <p className="text-ivory/50 font-body text-xs">{p.category}</p>
                <p className="text-gold font-body text-sm">
                  {new Intl.NumberFormat("fr-FR").format(p.price)} FCFA
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => setEditingId(p._id)}
                  aria-label="Modifier"
                  className="p-2 border border-gold/30 rounded-full"
                >
                  <Pencil size={14} className="text-gold" />
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  disabled={deletingId === p._id}
                  aria-label="Supprimer"
                  className="p-2 border border-bordeaux-light/50 rounded-full disabled:opacity-40"
                >
                  <Trash2 size={14} className="text-bordeaux-light" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
