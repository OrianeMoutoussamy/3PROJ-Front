import React, { useEffect, useState } from "react";
import SectionTitle from "../components/texts/SectionTitle";
import VideoCardGrid from "../components/videos/VideoCardGrid";
import { videoServiceMock } from "../../services/videoService";
import "./Home.css";

const Home: React.FC = () => {
  const [recommendedVideos, setRecommendedVideos] = useState<any[]>([]);
  const [newsVideos, setNewsVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const allVideos = await Promise.all([
          videoServiceMock.getById(1),
          videoServiceMock.getById(2),
        ]);

        setRecommendedVideos([allVideos[0]]);
        setNewsVideos([allVideos[1]]);
      } catch (err) {
        console.error("Erreur lors de la récupération des vidéos", err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="home-container">
      <SectionTitle title="Recommendations" />
      <div className="video-grid">
        {recommendedVideos.map((video) => (
          <VideoCardGrid key={video.id} video={video} />
        ))}
      </div>

      <SectionTitle title="Actualités" />
      <div className="video-grid">
        {newsVideos.map((video) => (
          <VideoCardGrid key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
