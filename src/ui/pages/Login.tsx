import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Toast from "../components/common/Toast";
import { Eye, EyeOff } from "lucide-react";
import "./Auth.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    await authService.login({ email, password });
    setToast({ message: "Connexion réussie", type: "success" });
    setTimeout(() => navigate("/"), 1000);
  } catch {
    setToast({ message: "Erreur lors de la connexion", type: "error" });
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = () => {
    setToast({ message: "Login Google non implémenté", type: "error" });
  };

  return (
    <div className="auth-container">
      <img src="/favicon.ico" alt="Logo" className="auth-logo" />
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="password-eye"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <div className="divider">OU</div>
      <button onClick={handleGoogleLogin} className="google-btn">
        Continuer avec Google
      </button>

      <p className="auth-switch">
        Pas encore inscrit ?{" "}
        <Link to="/register" className="auth-link">
          Créez un compte
        </Link>
      </p>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Login;
