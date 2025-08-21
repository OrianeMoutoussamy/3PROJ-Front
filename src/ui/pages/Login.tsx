import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", email, password);
    // TODO: Appel API backend
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
    // TODO: Intégrer Google OAuth2
  };

  return (
    <div className="auth-container">
      {/* Logo */}
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
        <button type="submit" className="auth-btn">
          Se connecter
        </button>
      </form>

      <div className="divider">OU</div>

      <button onClick={handleGoogleLogin} className="google-btn">
        Continuer avec Google
      </button>

      {/* Lien vers register */}
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
