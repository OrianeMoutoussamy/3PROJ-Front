import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Toast from "../components/common/Toast";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("authToken");

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
      localStorage.removeItem("authToken");
      setToast({ message: "Vous avez été déconnecté.", type: "success" });
      navigate("/");
    } catch {
      setToast({ message: "Erreur lors de la déconnexion", type: "error" });
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
            {isAuthenticated ? (
              <>
                <p className="profile-name">MonPseudo</p>
                <hr />
                <Link to="/settings" className="profile-item">Paramètres</Link>
                <button onClick={handleLogout} className="profile-item logout">
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="profile-item">Se connecter</Link>
                <Link to="/register" className="profile-item">Créer un compte</Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </nav>
  );
};

export default Navbar;
