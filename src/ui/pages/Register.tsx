import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log("Register with:", email, password);
    // TODO: Appel API backend
  };

  const handleGoogleRegister = () => {
    console.log("Google Register");
    // TODO: Intégrer Google OAuth2
  };

  return (
    <div className="auth-container">
      {/* Logo */}
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
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn">
          S'inscrire
        </button>
      </form>

      <div className="divider">OU</div>

      <button onClick={handleGoogleRegister} className="google-btn">
        Continuer avec Google
      </button>

      {/* Lien vers login */}
      <p className="auth-switch">
        Déjà un compte ?{" "}
        <Link to="/login" className="auth-link">
          Connectez-vous
        </Link>
      </p>
    </div>
  );
};

export default Register;
