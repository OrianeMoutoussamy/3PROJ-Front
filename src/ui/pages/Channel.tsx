import React, { useEffect, useState } from "react";
import ChannelTabs from "../components/tabs/ChannelTabs";
import { useParams } from "react-router-dom";
import { channelService } from "../../services/channelService";
import { videoService } from "../../services/videoService";
import Toast from "../components/common/Toast";
import "./Channel.css";

const Channel: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState<"main" | "videos">("main");
  const [channel, setChannel] = useState<any>(null);
  const [selfChannel, setSelfChannel] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        const me = await channelService.getSelf();
        setSelfChannel(me);

        const channelData = await channelService.getById(username);
        setChannel(channelData);

        const vids = await videoService.getByChannel(channelData.id);
        setVideos(vids);
      } catch (err) {
        console.error(err);
        setToast({ message: "Impossible de charger la chaîne", type: "error" });
      }
    };

    fetchData();
  }, [username]);

  const isMyChannel = selfChannel && channel && selfChannel.id === channel.id;

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selfChannel) return;

    try {
      const newVideo = await videoService.uploadVideo({
        title: videoTitle,
        description: videoDescription,
        isPublic,
        channel: selfChannel.id,
      });

      setVideos((prev) => [newVideo, ...prev]);
      setToast({ message: "Vidéo ajoutée avec succès", type: "success" });

      setVideoTitle("");
      setVideoDescription("");
      setIsPublic(true);
      setShowModal(false);
    } catch {
      setToast({ message: "Erreur lors de l’ajout de la vidéo", type: "error" });
    }
  };

  return (
    <div className="channel-container">
      <header className="channel-header">
        {channel?.profilePicture ? (
          <img src={channel.profilePicture} alt={channel.username} className="profile-circle" />
        ) : (
          <img src="/no_profile_pic.png" alt="No profile" className="profile-circle" />
        )}

        {channel && <h1 className="channel-title">{channel.username}</h1>}

        {isMyChannel && (
          <button className="add-video-button" onClick={() => setShowModal(true)}>
            + Ajouter une vidéo
          </button>
        )}
      </header>

      <div className="channel-tabs">
        {["main", "videos"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "main" | "videos")}
            className={activeTab === tab ? "active" : ""}
            type="button"
          >
            {tab === "main" ? "Main" : "Vidéos"}
          </button>
        ))}
      </div>

      <ChannelTabs activeTab={activeTab} videos={videos} />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Ajouter une nouvelle vidéo</h2>
            <form onSubmit={handleAddVideo}>
              <input
                type="text"
                placeholder="Titre"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
              />
              <label>
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                Vidéo publique
              </label>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">Ajouter</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Channel;
