import { Routes, Route, useLocation } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Explorer from "./pages/Explorer";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Chemins secrets de l'espace admin — doivent correspondre exactement à ceux
// utilisés dans Header.jsx (geste caché) et AdminDashboard.jsx (redirection).
const ADMIN_LOGIN_PATH = "/azaratti-team-9k2x";
const ADMIN_DASHBOARD_PATH = "/azaratti-team-9k2x/tableau-de-bord";

export default function App() {
  const location = useLocation();
  // La navigation basse ne s'affiche pas sur le tableau de bord admin (plus d'espace pour travailler)
  const hideNav = location.pathname === ADMIN_DASHBOARD_PATH;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/recherche" element={<Explorer />} />
        <Route path="/categorie/:category" element={<CategoryPage />} />
        <Route path="/produit/:id" element={<ProductDetail />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/favoris" element={<Favorites />} />
        <Route path={ADMIN_LOGIN_PATH} element={<AdminLogin />} />
        <Route path={ADMIN_DASHBOARD_PATH} element={<AdminDashboard />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </>
  );
}
