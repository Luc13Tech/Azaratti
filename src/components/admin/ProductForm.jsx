import { useState, useEffect } from "react";
import { ImagePlus } from "lucide-react";
import client from "../../api/client";

const categories = ["Montres", "Chaussures", "Accessoires", "Maroquinerie"];

export default function ProductForm({ existingProduct, onSaved, onCancel }) {
  const [title, setTitle] = useState(existingProduct?.title || "");
  const [category, setCategory] = useState(existingProduct?.category || categories[0]);
  const [price, setPrice] = useState(existingProduct?.price || "");
  const [description, setDescription] = useState(existingProduct?.description || "");
  const [featured, setFeatured] = useState(existingProduct?.featured || false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(existingProduct?.imageUrl || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!existingProduct && !imageFile) {
      setError("Merci de choisir une image depuis la galerie.");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("featured", featured);
      // Une nouveauté ajoutée porte automatiquement le badge "Nouveau"
      if (!existingProduct) formData.append("pinnedAsNew", "false");
      if (imageFile) formData.append("image", imageFile);

      if (existingProduct) {
        await client.put(`/products/${existingProduct._id}`, formData);
      } else {
        await client.post("/products", formData);
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-anthracite-card border border-gold/15 rounded-2xl p-5">
      <label className="block mb-4">
        <span className="text-xs font-body text-ivory/60 uppercase tracking-wide mb-2 block">
          Photo de l'article
        </span>
        <div className="relative aspect-square w-32 rounded-xl overflow-hidden bg-anthracite border border-gold/20 flex items-center justify-center">
          {preview ? (
            <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus className="text-gold/50" size={28} />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="mt-2 text-xs font-body text-ivory/70 file:mr-3 file:py-2 file:px-3 file:rounded-full
                     file:border file:border-gold/40 file:bg-transparent file:text-gold file:text-xs"
        />
      </label>

      <label className="block mb-3">
        <span className="text-xs font-body text-ivory/60 uppercase tracking-wide mb-1 block">Titre</span>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-anthracite border border-gold/20 rounded-lg py-2.5 px-3 text-ivory font-body text-sm"
        />
      </label>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <label className="block">
          <span className="text-xs font-body text-ivory/60 uppercase tracking-wide mb-1 block">Catégorie</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-anthracite border border-gold/20 rounded-lg py-2.5 px-3 text-ivory font-body text-sm"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-body text-ivory/60 uppercase tracking-wide mb-1 block">Prix (FCFA)</span>
          <input
            required
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-anthracite border border-gold/20 rounded-lg py-2.5 px-3 text-ivory font-body text-sm"
          />
        </label>
      </div>

      <label className="block mb-3">
        <span className="text-xs font-body text-ivory/60 uppercase tracking-wide mb-1 block">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full bg-anthracite border border-gold/20 rounded-lg py-2.5 px-3 text-ivory font-body text-sm resize-none"
        />
      </label>

      <label className="flex items-center gap-2 mb-5">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        <span className="text-xs font-body text-ivory/70">Mettre en avant sur la page d'accueil</span>
      </label>

      {error && <p className="text-bordeaux-light text-xs font-body mb-3">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 bg-gold text-anthracite font-body font-medium text-sm py-3 rounded-full disabled:opacity-50"
        >
          {saving ? "Enregistrement…" : existingProduct ? "Mettre à jour" : "Publier l'article"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 border border-gold/30 text-gold/80 font-body text-sm rounded-full"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
