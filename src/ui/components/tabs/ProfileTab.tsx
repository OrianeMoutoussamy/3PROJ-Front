import React, { useEffect, useState } from "react";
import { channelService } from "../../../services/channelService";
import { Channel } from "../../../models/channels/Channel";
import { Pencil, Eye, EyeOff } from "lucide-react";
import "./ProfileTab.css";

const ProfileTab: React.FC = () => {
  const [selfChannel, setSelfChannel] = useState<Channel | null>(null);
  const [profileImage, setProfileImage] = useState("/default-avatar.png");

  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPwd, setShowOldPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  useEffect(() => {
    const loadSelf = async () => {
      try {
        const channel = await channelService.getSelf();
        setSelfChannel(channel);
        if (channel.profilePicture) {
          setProfileImage(channel.profilePicture);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du profil", err);
      }
    };
    loadSelf();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selfChannel) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setProfileImage(imgUrl);
      try {
        const updated = await channelService.updateChannel({
          id: selfChannel.id,
          profilePicture: imgUrl,
        });
        setSelfChannel(updated);
      } catch (err) {
        console.error("Erreur lors de la mise à jour de l'image", err);
      }
    }
  };

  const handleUsernameUpdate = async () => {
    if (!newUsername.trim() || !selfChannel) return;
    try {
      const updated = await channelService.updateChannel({
        id: selfChannel.id,
        username: newUsername.trim(),
      });
      setSelfChannel(updated);
      setShowUsernameModal(false);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'username", err);
    }
  };

  const handleDescriptionUpdate = async () => {
    if (!newDescription.trim() || !selfChannel) return;
    try {
      const updated = await channelService.updateChannel({
        id: selfChannel.id,
        description: newDescription.trim(),
      });
      setSelfChannel(updated);
      setShowDescriptionModal(false);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la description", err);
    }
  };

  const handlePasswordUpdate = async () => {
  if (!selfChannel) return;
  if (!newPassword.trim() || newPassword !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }
  try {
    const updated = await channelService.updateChannel({
      id: selfChannel.id,
      user: {
        ...selfChannel.user,
        password: newPassword,
      },
    });
    setSelfChannel(updated);
    setShowPasswordModal(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (err) {
    console.error("Erreur lors du changement de mot de passe", err);
  }
};

  const handleDeleteChannel = async () => {
    if (!selfChannel) return;
    if (!window.confirm("Voulez-vous vraiment supprimer votre channel ?")) return;

    try {
      await channelService.deleteChannel();
      sessionStorage.removeItem("authToken");
      window.location.href = "/login";
    } catch (err) {
      console.error("Erreur lors de la suppression du channel", err);
    }
  };

  if (!selfChannel) {
    return <p>Chargement du profil...</p>;
  }

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
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
          </div>
        </div>

        {/* Username */}
        <div className="profile-item">
          <h4>Username</h4>
          <div className="profile-row">
            <p><strong>{selfChannel.username}</strong></p>
            <Pencil size={18} className="edit-icon" onClick={() => setShowUsernameModal(true)} />
          </div>
        </div>

        {/* Description */}
        <div className="profile-item">
          <h4>Description</h4>
          <div className="profile-row">
            <p>{selfChannel.description || "Pas encore de description"}</p>
            <Pencil size={18} className="edit-icon" onClick={() => setShowDescriptionModal(true)} />
          </div>
        </div>

        {/* Password */}
        <div className="profile-item">
          <h4>Mot de passe</h4>
          <div className="profile-row">
            <p>********</p>
            <Pencil size={18} className="edit-icon" onClick={() => setShowPasswordModal(true)} />
          </div>
        </div>
      </div>

      {/* Modal Username */}
      {showUsernameModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Modifier le username</h3>
            <input
              type="text"
              placeholder="Nouveau username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => setShowUsernameModal(false)}>Annuler</button>
              <button onClick={handleUsernameUpdate}>Valider</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Description */}
      {showDescriptionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Modifier la description</h3>
            <textarea
              placeholder="Nouvelle description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => setShowDescriptionModal(false)}>Annuler</button>
              <button onClick={handleDescriptionUpdate}>Valider</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Password */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Changer le mot de passe</h3>

            {/* Ancien mot de passe */}
            <div className="password-field">
              <input
                type={showOldPwd ? "text" : "password"}
                placeholder="Ancien mot de passe"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {showOldPwd ? (
                <EyeOff size={18} className="eye-icon" onClick={() => setShowOldPwd(false)} />
              ) : (
                <Eye size={18} className="eye-icon" onClick={() => setShowOldPwd(true)} />
              )}
            </div>

            {/* Nouveau mot de passe */}
            <div className="password-field">
              <input
                type={showNewPwd ? "text" : "password"}
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {showNewPwd ? (
                <EyeOff size={18} className="eye-icon" onClick={() => setShowNewPwd(false)} />
              ) : (
                <Eye size={18} className="eye-icon" onClick={() => setShowNewPwd(true)} />
              )}
            </div>

            {/* Confirmer mot de passe */}
            <div className="password-field">
              <input
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {showConfirmPwd ? (
                <EyeOff size={18} className="eye-icon" onClick={() => setShowConfirmPwd(false)} />
              ) : (
                <Eye size={18} className="eye-icon" onClick={() => setShowConfirmPwd(true)} />
              )}
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowPasswordModal(false)}>Annuler</button>
              <button onClick={handlePasswordUpdate}>Valider</button>
            </div>
          </div>
        </div>
      )}

      {/* Supprimer le channel */}
      <div className="delete-section">
        <button className="delete-btn" onClick={handleDeleteChannel}>
          Supprimer mon channel
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
