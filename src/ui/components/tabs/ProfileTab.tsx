import React, { useState } from "react";

const ProfileTab: React.FC = () => {
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setProfileImage(imgUrl);
    }
  };

  return (
    <div className="profile-tab">
      <h2>Mon profil</h2>
      <div className="profile-grid">
        {/* Image */}
        <div className="profile-item">
          <h4>Image de profil</h4>
          <div className="profile-image-section">
            <img src={profileImage} alt="Profil" className="profile-img" />
            <label className="upload-btn">
              Changer l’image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>
        </div>

        {/* Email */}
        <div className="profile-item">
          <h4>Email</h4>
          <p><strong>user@email.com</strong></p>
          <button onClick={() => setShowEmailModal(true)}>Modifier</button>
        </div>

        {/* Mot de passe */}
        <div className="profile-item">
          <h4>Mot de passe</h4>
          <p>********</p>
          <button onClick={() => setShowPasswordModal(true)}>Changer</button>
        </div>
      </div>

      {/* Modal Email */}
      {showEmailModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Modifier l’email</h3>
            <input type="email" placeholder="Nouvel email" />
            <div className="modal-actions">
              <button onClick={() => setShowEmailModal(false)}>Annuler</button>
              <button>Valider</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Password */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Changer le mot de passe</h3>
            <input type="password" placeholder="Ancien mot de passe" />
            <input type="password" placeholder="Nouveau mot de passe" />
            <input type="password" placeholder="Confirmer le mot de passe" />
            <div className="modal-actions">
              <button onClick={() => setShowPasswordModal(false)}>Annuler</button>
              <button>Valider</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
