import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../services/authService";
import "./Auth.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      console.log("✅ Login success:", res);
      alert("Connexion réussie !");
    } catch (err) {
      console.error("❌ Login failed:", err);
      alert("Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
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
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
    </div>
  );
};

export default Login;
