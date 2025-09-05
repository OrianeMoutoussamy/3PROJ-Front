import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { channelService } from "../../services/channelService";
import Toast from "../components/common/Toast";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [channel, setChannel] = useState<any | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isAuthenticated = !!sessionStorage.getItem("authToken");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      channelService.getSelf()
        .then((res) => setChannel(res))
        .catch(() => {
          setToast({ message: "Impossible de récupérer le profil", type: "error" });
        });
    } else {
      setChannel(null);
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      sessionStorage.removeItem("authToken");
      setChannel(null);
      setToast({ message: "Vous avez été déconnecté.", type: "success" });
      navigate("/");
    } catch {
      setToast({ message: "Erreur lors de la déconnexion", type: "error" });
    }
  };

  const renderProfileCircle = () => {
    if (!isAuthenticated) {
      return <img src="/no_profile_pic.png" alt="No Profile" className="profile-img" />;
    }

    if (channel?.profilePicture && channel.profilePicture.trim() !== "") {
      return <img src={channel.profilePicture} alt="Profil" className="profile-img" />;
    }

    const initials = channel?.username?.slice(0, 2).toUpperCase() ?? "U";
    return <span className="profile-initial">{initials}</span>;
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
          {renderProfileCircle()}
        </div>

        {menuOpen && (
          <div className="profile-menu">
            {isAuthenticated ? (
              <>
                <p className="profile-name">{channel?.username ?? "Utilisateur"}</p>
                <hr />
                {channel?.username && (
                  <Link to={`/channel/${channel.username}`} className="profile-item">
                    Ma chaîne
                  </Link>
                )}
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
