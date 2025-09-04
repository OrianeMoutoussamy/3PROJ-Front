import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/videos/VideoPlayer";
import ChannelInfo from "../components/texts/ChannelInfo";
import VideoDescription from "../components/videos/VideoDescription";
import RelatedVideos from "../components/videos/RelatedVideos";
import { playlistService } from "../../services/playlistService";
import { videoServiceMock } from "../../services/videoService";
import { Comment } from "../../models/videos/Comment";
import "./VideoPage.css";

interface Playlist {
  id: number;
  name: string;
}

const VideoPage: React.FC = () => {
  const { channelName, videoId } = useParams<{ channelName: string; videoId: string }>();
  const [video, setVideo] = useState<any>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!videoId) return;

    // Récupère la vidéo
    videoServiceMock.getById(videoId).then((v) => {
      setVideo(v);
    });

    // Récupère les commentaires
    videoServiceMock.getComments(videoId).then((c) => setComments(c));

    // Récupère les réactions
    videoServiceMock.getReactions(videoId).then((r) => {
      setLikes(r.likes);
      setDislikes(r.dislikes);
    });

    // Récupère les playlists de l'utilisateur
    playlistService.getSelfPlaylists().then((pls: any) => setPlaylists(pls));
  }, [videoId]);

  const handleAddToPlaylist = async (playlistId: number) => {
    if (!video) return;
    await playlistService.addVideoToPlaylist(playlistId, video.id);
    setDropdownOpen(false);
    alert("Vidéo ajoutée à la playlist !");
  };

  const handleLike = async () => {
    if (!video) return;
    await videoServiceMock.reactVideo(video.id, 1);
    setLikes((l) => l + 1);
  };

  const handleDislike = async () => {
    if (!video) return;
    await videoServiceMock.reactVideo(video.id, -1);
    setDislikes((d) => d + 1);
  };

  const handleAddComment = async (text: string) => {
    if (!video) return;
    const newComment = await videoServiceMock.commentVideo(video.id, text);
    setComments((prev) => [newComment, ...prev]);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!video) return;
    await videoServiceMock.deleteComment(video.id, commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  if (!video) return <div>Chargement...</div>;

  return (
    <div className="video-page">
      <div className="video-main">
        <div className="video-wrapper">
          <VideoPlayer videoId={video.id.toString()} />
        </div>

        <ChannelInfo
          channelName={video.channel.username}
          channelHandle={video.channel.username}
          avatarUrl={video.channel.profilePicture}
        />

        <div className="video-actions">
          <button
            className="add-playlist-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            ➕ Ajouter à une playlist
          </button>
          {dropdownOpen && (
            <div className="playlist-dropdown">
              {playlists.map((pl) => (
                <button
                  key={pl.id}
                  onClick={() => handleAddToPlaylist(pl.id)}
                  className="playlist-option"
                >
                  {pl.name}
                </button>
              ))}
            </div>
          )}

          <button onClick={handleLike} className="reaction-btn">
            👍 {likes}
          </button>
          <button onClick={handleDislike} className="reaction-btn">
            👎 {dislikes}
          </button>
        </div>

        <VideoDescription
          title={video.title}
          description={video.description || ""}
          date={video.createdAt || ""}
        />

        <div className="comments-section">
          <h3>Commentaires</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem(
                "comment"
              ) as HTMLInputElement;
              if (input.value.trim()) {
                handleAddComment(input.value);
                input.value = "";
              }
            }}
          >
            <input type="text" name="comment" placeholder="Ajouter un commentaire..." />
            <button type="submit">Publier</button>
          </form>

          <ul className="comment-list">
            {comments.map((c) => (
              <li key={c.id} className="comment-item">
                <p>
                  <strong>{c.channel?.username || "Inconnu"}:</strong> {c.content}
                </p>
                <small>{new Date(c.createdAt || "").toLocaleString()}</small>
                <button onClick={() => handleDeleteComment(c.id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="video-related">
        <RelatedVideos />
      </aside>
    </div>
  );
};

export default VideoPage;
