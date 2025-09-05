import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/videos/VideoPlayer";
import ChannelInfo from "../components/texts/ChannelInfo";
import VideoDescription from "../components/videos/VideoDescription";
import RelatedVideos from "../components/videos/RelatedVideos";
import { playlistService } from "../../services/playlistService";
import { videoService } from "../../services/videoService";
import Toast from "../components/common/Toast";
import { ThumbsUp, ThumbsDown, Plus } from "lucide-react";
import "./VideoPage.css";

const VideoPage: React.FC = () => {
  const { channelName, videoId } = useParams<{ channelName: string; videoId: string }>();
  const [video, setVideo] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (!videoId) return;

    const fetchVideo = async () => {
      try {
        const v = await videoService.getById(videoId);
        setVideo(v);

        const pls = await playlistService.getSelfPlaylists();
        setPlaylists(pls);
      } catch (err) {
        console.error(err);
        setToast({ message: "Erreur lors du chargement de la vidéo", type: "error" });
      }
    };

    fetchVideo();
  }, [videoId]);

  const handleAddToPlaylist = async (playlistId: number) => {
    if (!video) return;
    try {
      await playlistService.addVideoToPlaylist(playlistId, video.id);
      setDropdownOpen(false);
      setToast({ message: "Vidéo ajoutée à la playlist", type: "success" });
    } catch {
      setToast({ message: "Erreur lors de l'ajout à la playlist", type: "error" });
    }
  };

  const handleLike = async () => {
    if (!video) return;
    try {
      await videoService.reactVideo(video.id, 1);
      setLikes((prev) => prev + 1);
    } catch {
      setToast({ message: "Erreur lors du like", type: "error" });
    }
  };

  const handleDislike = async () => {
    if (!video) return;
    try {
      await videoService.reactVideo(video.id, -1);
      setDislikes((prev) => prev + 1);
    } catch {
      setToast({ message: "Erreur lors du dislike", type: "error" });
    }
  };

  if (!video) return <div>Chargement...</div>;

  return (
    <div className="video-page">
      <div className="video-main">
        <VideoPlayer videoId={video.id.toString()} />

        <ChannelInfo
          channelName={video.channel.username}
          channelHandle={video.channel.username}
          avatarUrl={video.channel.profilePicture || "/no_profile_pic.png"}
        />

        <div className="video-actions">
          <button className="add-playlist-btn" onClick={() => setDropdownOpen((prev) => !prev)}>
            <Plus size={16} /> Ajouter à une playlist
          </button>
          {dropdownOpen && (
            <div className="playlist-dropdown">
              {playlists.map((pl) => (
                <button key={pl.id} onClick={() => handleAddToPlaylist(pl.id)} className="playlist-option">
                  {pl.name}
                </button>
              ))}
            </div>
          )}

          <button onClick={handleLike} className="reaction-btn">
            <ThumbsUp size={16} /> {likes}
          </button>
          <button onClick={handleDislike} className="reaction-btn">
            <ThumbsDown size={16} /> {dislikes}
          </button>
        </div>

        <VideoDescription title={video.title} description={video.description || ""} date={video.createdAt || ""} />

        <div className="comments-section">
          <h3>Commentaires</h3>
          <p>La gestion des commentaires n’est pas encore implémentée.</p>
        </div>
      </div>

      <aside className="video-related">
        <RelatedVideos />
      </aside>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default VideoPage;
