import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      console.log("✅ Déconnecté avec succès");
      alert("Vous avez été déconnecté.");
      navigate("/login");
    } catch (err) {
      console.error("❌ Erreur lors de la déconnexion:", err);
      alert("Erreur lors de la déconnexion");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/freetube.png" alt="FreeTube Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-center">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      <div className="navbar-right" ref={menuRef}>
        <div
          className="profile-circle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="profile-initial">U</span>
        </div>

        {menuOpen && (
          <div className="profile-menu">
            <p className="profile-name">MonPseudo</p>
            <hr />
            <Link to="/login" className="profile-item">Se connecter</Link>
            <Link to="/register" className="profile-item">Créer un compte</Link>
            <Link to="/settings" className="profile-item">Paramètres</Link>
            <button onClick={handleLogout} className="profile-item logout">
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
