import React from "react";
import SectionTitle from "../components/texts/SectionTitle";
import VideoCardGrid from "../components/videos/VideoCardGrid";
import "./Home.css";

const recommendedVideos = [
  { videoId: "101", thumbnailUrl: "https://picsum.photos/id/1005/320/180", title: "Coding LoFi Mix", channelName: "CodeBeats", dateAdded: "2025-08-01", channelId: "CodeBeats", channelHandle: "@CodeBeats" },
  { videoId: "102", thumbnailUrl: "https://picsum.photos/id/1010/320/180", title: "React Crash Course", channelName: "DevTube", dateAdded: "2025-07-28", channelId: "DevTube", channelHandle: "@DevTube" },
  { videoId: "103", thumbnailUrl: "https://picsum.photos/id/1011/320/180", title: "Learn Tailwind in 15 min", channelName: "Frontend Pro", dateAdded: "2025-07-30", channelId: "FrontendPro", channelHandle: "@FrontendPro" },
  { videoId: "104", thumbnailUrl: "https://picsum.photos/id/1012/320/180", title: "Debugging Tips", channelName: "DevWizard", dateAdded: "2025-07-27", channelId: "DevWizard", channelHandle: "@DevWizard" },
];

const newsVideos = [
  { videoId: "201", thumbnailUrl: "https://picsum.photos/id/1025/320/180", title: "Breaking Tech News", channelName: "TechNow", dateAdded: "2025-08-10", channelId: "TechNow", channelHandle: "@TechNow" },
  { videoId: "202", thumbnailUrl: "https://picsum.photos/id/1035/320/180", title: "AI Weekly Recap", channelName: "AI Insights", dateAdded: "2025-08-12", channelId: "AIInsights", channelHandle: "@AIInsights" },
  { videoId: "203", thumbnailUrl: "https://picsum.photos/id/1040/320/180", title: "Startups to Watch", channelName: "BizNews", dateAdded: "2025-08-14", channelId: "BizNews", channelHandle: "@BizNews" },
  { videoId: "204", thumbnailUrl: "https://picsum.photos/id/1050/320/180", title: "Cloud Market 2025", channelName: "CloudCast", dateAdded: "2025-08-15", channelId: "CloudCast", channelHandle: "@CloudCast" },
];

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Recommendations */}
      <SectionTitle title="Recommendations" />
      <div className="video-grid">
        {recommendedVideos.map((video) => (
          <VideoCardGrid key={video.videoId} {...video} />
        ))}
      </div>

      {/* Actualités */}
      <SectionTitle title="Actualités" />
      <div className="video-grid">
        {newsVideos.map((video) => (
          <VideoCardGrid key={video.videoId} {...video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
