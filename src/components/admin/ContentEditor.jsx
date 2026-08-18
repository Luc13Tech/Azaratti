import { useState } from "react";
import { Plus, X } from "lucide-react";
import client from "../../api/client";

export default function ContentEditor({ items, onChanged }) {
  const [showNewForm, setShowNewForm] = useState(false);

  return (
    <div className="space-y-3">
      <p className="text-ivory/50 font-body text-xs leading-relaxed mb-2">
        Gère ici tous les textes et images du site en dehors des articles : bannières,
        libellés de la roue "Collection Explorer", messages d'accueil, etc.
      </p>

      {items.map((item) => (
        <ContentItemEditor key={item.key} item={item} onChanged={onChanged} />
      ))}

      {showNewForm ? (
        <NewContentForm onSaved={() => { setShowNewForm(false); onChanged(); }} onCancel={() => setShowNewForm(false)} />
      ) : (
        <button
          onClick={() => setShowNewForm(true)}
          className="w-full flex items-center justify-center gap-2 border border-dashed border-gold/40
                     text-gold font-body text-sm py-3 rounded-2xl"
        >
          <Plus size={16} /> Ajouter une nouvelle zone éditable
        </button>
      )}
    </div>
  );
}

function ContentItemEditor({ item, onChanged }) {
  const [value, setValue] = useState(item.textValue || "");
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      if (item.type === "text") formData.append("textValue", value);
      if (item.type === "image" && imageFile) formData.append("image", imageFile);
      await client.put(`/content/${item.key}`, formData);
      onChanged();
    } catch {
      alert("Impossible d'enregistrer ce contenu pour le moment.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-anthracite-card border border-gold/10 rounded-2xl p-4">
      <p className="font-heading text-ivory text-sm mb-2">{item.label}</p>
      {item.type === "text" ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={2}
          className="w-full bg-anthracite border border-gold/20 rounded-lg py-2 px-3 text-ivory font-body text-sm mb-2 resize-none"
        />
      ) : (
        <div className="mb-2">
          {(item.imageUrl || imageFile) && (
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : item.imageUrl}
              alt=""
              className="w-24 h-24 object-cover rounded-lg mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="text-xs font-body text-ivory/70 file:mr-3 file:py-1.5 file:px-3 file:rounded-full
                       file:border file:border-gold/40 file:bg-transparent file:text-gold file:text-xs"
          />
        </div>
      )}
      <button
        onClick={handleSave}
        disabled={saving}
        className="text-xs font-body text-anthracite bg-gold px-4 py-2 rounded-full disabled:opacity-50"
      >
        {saving ? "Enregistrement…" : "Enregistrer"}
      </button>
    </div>
  );
}

function NewContentForm({ onSaved, onCancel }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [textValue, setTextValue] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const slugify = (s) =>
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!label.trim()) return setError("Merci de donner un nom à cette zone.");
    if (type === "image" && !imageFile) return setError("Merci de choisir une image.");

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("key", slugify(label) + "_" + Date.now().toString(36));
      formData.append("label", label);
      formData.append("type", type);
      if (type === "text") formData.append("textValue", textValue);
      if (type === "image") formData.append("image", imageFile);
      await client.post("/content", formData);
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-anthracite-card border border-gold/15 rounded-2xl p-4 relative">
      <button type="button" onClick={onCancel} aria-label="Annuler" className="absolute top-3 right-3 text-gold/60">
        <X size={16} />
      </button>
      <label className="block mb-3">
        <span className="text-xs font-body text-ivory/60 uppercase tracking-wide mb-1 block">Nom de la zone</span>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Ex: Bannière page d'accueil"
          className="w-full bg-anthracite border border-gold/20 rounded-lg py-2.5 px-3 text-ivory font-body text-sm"
        />
      </label>
      <div className="flex gap-4 mb-3">
        <label className="flex items-center gap-2 text-xs font-body text-ivory/70">
          <input type="radio" checked={type === "text"} onChange={() => setType("text")} /> Texte
        </label>
        <label className="flex items-center gap-2 text-xs font-body text-ivory/70">
          <input type="radio" checked={type === "image"} onChange={() => setType("image")} /> Image
        </label>
      </div>
      {type === "text" ? (
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          rows={2}
          className="w-full bg-anthracite border border-gold/20 rounded-lg py-2 px-3 text-ivory font-body text-sm mb-3 resize-none"
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="mb-3 text-xs font-body text-ivory/70 file:mr-3 file:py-1.5 file:px-3 file:rounded-full
                     file:border file:border-gold/40 file:bg-transparent file:text-gold file:text-xs"
        />
      )}
      {error && <p className="text-bordeaux-light text-xs font-body mb-2">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="bg-gold text-anthracite font-body text-sm px-5 py-2.5 rounded-full disabled:opacity-50"
      >
        {saving ? "Création…" : "Créer"}
      </button>
    </form>
  );
}
