import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../services/authService";
import "./Auth.css";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      const res = await authService.register({ email, password });
      console.log("✅ Register success:", res);
      alert("Compte créé avec succès !");
    } catch (err) {
      console.error("❌ Register failed:", err);
      alert("Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    console.log("Google Register");
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
    </div>
  );
};

export default Register;
