import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Plus, LogOut, X } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";
import client from "../api/client";
import ProductForm from "../components/admin/ProductForm";
import ProductList from "../components/admin/ProductList";
import ContentEditor from "../components/admin/ContentEditor";

export default function AdminDashboard() {
  const { isAdmin, logout } = useAdminAuth();
  const [tab, setTab] = useState("produits");
  const [products, setProducts] = useState([]);
  const [contentItems, setContentItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [prodRes, contentRes] = await Promise.all([
        client.get("/products"),
        client.get("/content"),
      ]);
      setProducts(prodRes.data.products);
      setContentItems(contentRes.data.raw);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin]);

  if (!isAdmin) return <Navigate to="/admin" replace />;

  return (
    <div className="pb-28 px-6 pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-ivory">Administration</h1>
          <p className="text-ivory/50 font-body text-xs">AzaRatti — gestion du catalogue</p>
        </div>
        <button onClick={logout} aria-label="Se déconnecter" className="p-2 border border-gold/30 rounded-full">
          <LogOut size={16} className="text-gold" />
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("produits")}
          className={`flex-1 font-body text-sm py-2.5 rounded-full border transition-colors ${
            tab === "produits" ? "bg-gold text-anthracite border-gold" : "border-gold/30 text-gold"
          }`}
        >
          Articles
        </button>
        <button
          onClick={() => setTab("contenu")}
          className={`flex-1 font-body text-sm py-2.5 rounded-full border transition-colors ${
            tab === "contenu" ? "bg-gold text-anthracite border-gold" : "border-gold/30 text-gold"
          }`}
        >
          Contenu du site
        </button>
      </div>

      {loading ? (
        <p className="text-ivory/50 font-body text-sm text-center py-8">Chargement…</p>
      ) : tab === "produits" ? (
        <>
          {showAddForm ? (
            <div className="relative mb-5">
              <button
                onClick={() => setShowAddForm(false)}
                aria-label="Fermer"
                className="absolute -top-2 -right-2 z-10 bg-anthracite border border-gold/30 rounded-full p-1.5"
              >
                <X size={14} className="text-gold" />
              </button>
              <ProductForm
                onSaved={() => {
                  setShowAddForm(false);
                  loadData();
                }}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center gap-2 bg-gold text-anthracite
                         font-body font-medium text-sm py-3.5 rounded-full mb-5"
            >
              <Plus size={18} /> Ajouter un article
            </button>
          )}
          <ProductList products={products} onChanged={loadData} />
        </>
      ) : (
        <ContentEditor items={contentItems} onChanged={loadData} />
      )}
    </div>
  );
}
