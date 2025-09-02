import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/videos/VideoPlayer";
import ChannelInfo from "../components/texts/ChannelInfo";
import VideoDescription from "../components/videos/VideoDescription";
import RelatedVideos from "../components/videos/RelatedVideos";
import { playlistService } from "../../services/playlistService";
import "./VideoPage.css";

interface Playlist {
  id: string;
  title: string;
}

const VideoPage: React.FC = () => {
  const { channelName, videoId } = useParams<{ channelName: string; videoId: string }>();

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState<{ id: number; text: string; date: string }[]>([]);

  useEffect(() => {
    playlistService.getSelfPlaylists().then((data: any) => {
      setPlaylists(data);
    });
  }, []);

  const handleAddToPlaylist = async (playlistId: string) => {
  if (!videoId) return;
  await playlistService.addVideoToPlaylist(
    Number(playlistId),
    Number(videoId)
  );
  setDropdownOpen(false);
  alert("Vidéo ajoutée à la playlist !");
};


  const handleLike = () => setLikes((l) => l + 1);
  const handleDislike = () => setDislikes((d) => d + 1);

  const handleAddComment = (text: string) => {
    const newComment = {
      id: comments.length + 1,
      text,
      date: new Date().toISOString(),
    };
    setComments([newComment, ...comments]);
  };

  return (
    <div className="video-page">
      <div className="video-main">
        <div className="video-wrapper">
          <VideoPlayer videoId={videoId!} />
        </div>

        <ChannelInfo
          channelName={channelName!}
          channelHandle={`@${channelName!}`}
        />

        <div className="video-actions">
          <button className="add-playlist-btn" onClick={() => setDropdownOpen((prev) => !prev)}>
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
                  {pl.title}
                </button>
              ))}
            </div>
          )}

          <button onClick={handleLike} className="reaction-btn">👍 {likes}</button>
          <button onClick={handleDislike} className="reaction-btn">👎 {dislikes}</button>
        </div>

        <VideoDescription
          title="Titre de la vidéo"
          description="Ceci est une description détaillée de la vidéo, avec des infos et peut-être des hashtags."
          date="2025-08-12"
        />

        <div className="comments-section">
          <h3>Commentaires</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem("comment") as HTMLInputElement);
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
                <p>{c.text}</p>
                <small>{new Date(c.date).toLocaleString()}</small>
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
