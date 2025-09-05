import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Toast from "../components/common/Toast";
import { Eye, EyeOff } from "lucide-react";
import "./Auth.css";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setToast({ message: "Les mots de passe ne correspondent pas.", type: "error" });
      return;
    }
    setLoading(true);
    try {
      await authService.register({ email, password });
      setToast({ message: "Compte créé avec succès", type: "success" });
      setTimeout(() => navigate("/login"), 1000);
    } catch {
      setToast({ message: "Erreur lors de l'inscription", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    setToast({ message: "Inscription Google non implémentée", type: "error" });
  };

  return (
    <div className="auth-container">
      <img src="/favicon.ico" alt="Logo" className="auth-logo" />
      <h2>Créer un compte</h2>
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

        <div className="password-wrapper">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className="password-eye"
            onMouseDown={() => setShowConfirm(true)}
            onMouseUp={() => setShowConfirm(false)}
            onMouseLeave={() => setShowConfirm(false)}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>

      <div className="divider">OU</div>
      <button onClick={handleGoogleRegister} className="google-btn">
        Continuer avec Google
      </button>

      <p className="auth-switch">
        Déjà un compte ?{" "}
        <Link to="/login" className="auth-link">
          Connectez-vous
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

export default Register;
