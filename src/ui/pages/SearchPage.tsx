import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchPage.css";

interface Video {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  channelName: string;
  channelHandle: string; // utilisé pour la route channel
  dateAdded: string; // format YYYY-MM-DD
}

const SearchPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Données fictives
  const [results] = useState<Video[]>([
    {
      videoId: "1",
      thumbnailUrl: "https://via.placeholder.com/200x120?text=Video+1",
      title: "Apprendre React en 2025",
      channelName: "CodeBeats",
      channelHandle: "@CodeBeats",
      dateAdded: "2025-06-10",
    },
    {
      videoId: "2",
      thumbnailUrl: "https://via.placeholder.com/200x120?text=Video+2",
      title: "CSS moderne pour débutants",
      channelName: "WebDevTips",
      channelHandle: "@WebDevTips",
      dateAdded: "2024-12-01",
    },
    {
      videoId: "3",
      thumbnailUrl: "https://via.placeholder.com/200x120?text=Video+3",
      title: "JavaScript avancé : les closures",
      channelName: "DevMaster",
      channelHandle: "@DevMaster",
      dateAdded: "2023-03-15",
    },
  ]);

  // Tri en fonction de la date
  const sortedResults = [...results].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
    }
    return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
  });

  return (
    <div className="search-container">
      <header className="search-header">
        <h1>Résultats de recherche</h1>
        <button
          className="sort-button"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Trier par date ({sortOrder === "asc" ? "plus ancien" : "plus récent"})
        </button>
      </header>

      <div className="search-results">
        {sortedResults.map((video) => (
          <div key={video.videoId} className="search-item">
            <Link
              to={`/channel/${video.channelHandle}/video/${video.videoId}`}
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="search-thumbnail"
              />
            </Link>
            <div className="search-info">
              <Link
                to={`/channel/${video.channelHandle}/video/${video.videoId}`}
                className="search-title"
              >
                {video.title}
              </Link>
              <Link
                to={`/channel/${video.channelHandle}`}
                className="search-channel"
              >
                {video.channelName}
              </Link>
              <p className="search-date">
                Publiée le{" "}
                {new Date(video.dateAdded).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
