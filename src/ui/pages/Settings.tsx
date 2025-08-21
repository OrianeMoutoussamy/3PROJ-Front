import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import "./Settings.css";

// Import des tabs
import ProfileTab from "../components/tabs/ProfileTab";
import ParamsTab from "../components/tabs/ParamsTab";
import PrivacyTab from "../components/tabs/PrivacyTab";
import SecurityTab from "../components/tabs/SecurityTab";
import PolicyTab from "../components/tabs/PolicyTab";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const tabs = [
    { id: "profile", label: "Profil" },
    { id: "params", label: "Paramètres" },
    { id: "privacy", label: "Confidentialité" },
    { id: "security", label: "Sécurité" },
    { id: "policy", label: "Politique" },
  ];

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <div className="settings-sidebar">
        <div className="sidebar-header">
          <ArrowLeft
            className="back-icon"
            size={22}
            onClick={() => navigate(-1)}
          />
          <img src="/freetube.png" alt="Logo" className="sidebar-logo" />
        </div>

        {/* Liste des tabs */}
        <ul className="sidebar-tabs">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>

        {/* Déconnexion */}
        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={18} /> Se déconnecter
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="settings-content">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "params" && <ParamsTab />}
        {activeTab === "privacy" && <PrivacyTab />}
        {activeTab === "security" && <SecurityTab />}
        {activeTab === "policy" && <PolicyTab />}
      </div>
    </div>
  );
};

export default Settings;