import React, { useEffect, useState } from "react";
import ChannelTabs from "../components/tabs/ChannelTabs";
import { useParams } from "react-router-dom";
import { channelServiceMock as channelService } from "../../services/channelService";
import "./Channel.css";

const Channel: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState<"main" | "videos">("main");
  const [channel, setChannel] = useState<any>(null);
  const [selfChannel, setSelfChannel] = useState<any>(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!username) return;

    const fetchChannel = async () => {
      // Résolution username -> channel object (avec id)
      const data = await channelService.getByUsername(username);
      if (data) setChannel(data);
    };

    fetchChannel();

    channelService.getSelf().then((me) => {
      setSelfChannel(me);
    });
  }, [username]);

  const toggleSubscribe = async () => {
    if (!channel) return;
    if (subscribed) {
      await channelService.unsubscribe(channel.id);
      setSubscribed(false);
    } else {
      await channelService.subscribe(channel.id);
      setSubscribed(true);
    }
  };

  const videos = channel
    ? [
        {
          id: 1,
          thumbnail: "https://via.placeholder.com/300x169?text=Video+1",
          title: "Ma première vidéo",
          channel,
          createdAt: "2025-07-01",
        },
        {
          id: 2,
          thumbnail: "https://via.placeholder.com/300x169?text=Video+2",
          title: "React pour les nuls",
          channel,
          createdAt: "2025-06-28",
        },
      ]
    : [];

  const isMyChannel = selfChannel && channel && selfChannel.id === channel.id;

  return (
    <div className="channel-container">
      <header className="channel-header">
        {channel?.profilePicture ? (
          <img
            src={channel.profilePicture}
            alt={channel.username}
            className="profile-circle"
          />
        ) : (
          <div className="profile-circle" />
        )}

        <h1 className="channel-title">{channel?.username || "Chargement..."}</h1>

        {!isMyChannel && (
          <button onClick={toggleSubscribe} className="subscribe-button">
            {subscribed ? "Se désabonner" : "S’abonner"}
          </button>
        )}

        {isMyChannel && (
          <button className="add-video-button">+ Ajouter une vidéo</button>
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
    </div>
  );
};

export default Channel;
