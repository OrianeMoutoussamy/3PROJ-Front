import React, { useEffect, useState } from "react";
import ChannelTabs from "../components/tabs/ChannelTabs";
import { useParams } from "react-router-dom";
import { channelServiceMock as channelService } from "../../services/channelService";
import "./Channel.css";

const Channel: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const [activeTab, setActiveTab] = useState<"main" | "videos" | "playlists">("main");
  const [channel, setChannel] = useState<any>(null);
  const [selfChannel, setSelfChannel] = useState<any>(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!handle) return;
    const cleanHandle = handle.startsWith("@") ? handle.slice(1) : handle;

    channelService.getById(cleanHandle).then((data) => {
      if (data) setChannel(data);
    });

    channelService.getSelf().then((me) => {
      setSelfChannel(me);
    });
  }, [handle]);

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

  const videos = [
    {
      videoId: "1",
      thumbnailUrl: "https://via.placeholder.com/300x169?text=Video+1",
      title: "Ma première vidéo",
      channelName: channel?.username || "Inconnu",
      dateAdded: "2025-07-01",
      channelId: channel?.id,
      channelHandle: `@${channel?.username}`,
    },
    {
      videoId: "2",
      thumbnailUrl: "https://via.placeholder.com/300x169?text=Video+2",
      title: "React pour les nuls",
      channelName: channel?.username || "Inconnu",
      dateAdded: "2025-06-28",
      channelId: channel?.id,
      channelHandle: `@${channel?.username}`,
    },
  ];

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
        {["main", "videos", "playlists"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={activeTab === tab ? "active" : ""}
            type="button"
          >
            {tab === "main" ? "Main" : tab === "videos" ? "Vidéos" : "Playlists"}
          </button>
        ))}
      </div>

      <ChannelTabs activeTab={activeTab} videos={videos} />
    </div>
  );
};

export default Channel;
