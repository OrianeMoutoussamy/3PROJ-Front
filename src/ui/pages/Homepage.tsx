// src/pages/Home.tsx
import React from 'react';
import SectionTitle from '../components/texts/SectionTitle';
import VideoCard from '../components/videos/VideoCard';

const recommendedVideos = [
  { videoId: '101', thumbnailUrl: 'https://picsum.photos/id/1005/320/180', title: 'Coding LoFi Mix', channelName: 'CodeBeats', dateAdded: '2025-08-01' },
  { videoId: '102', thumbnailUrl: 'https://picsum.photos/id/1010/320/180', title: 'React Crash Course', channelName: 'DevTube', dateAdded: '2025-07-28' },
  { videoId: '103', thumbnailUrl: 'https://picsum.photos/id/1011/320/180', title: 'Learn Tailwind in 15 min', channelName: 'Frontend Pro', dateAdded: '2025-07-30' },
  { videoId: '104', thumbnailUrl: 'https://picsum.photos/id/1012/320/180', title: 'Debugging Tips', channelName: 'DevWizard', dateAdded: '2025-07-27' },
];

const newsVideos = [
  { videoId: '201', thumbnailUrl: 'https://picsum.photos/id/1025/320/180', title: 'Breaking Tech News', channelName: 'TechNow', dateAdded: '2025-08-10' },
  { videoId: '202', thumbnailUrl: 'https://picsum.photos/id/1035/320/180', title: 'AI Weekly Recap', channelName: 'AI Insights', dateAdded: '2025-08-12' },
  { videoId: '203', thumbnailUrl: 'https://picsum.photos/id/1040/320/180', title: 'Startups to Watch', channelName: 'BizNews', dateAdded: '2025-08-14' },
  { videoId: '204', thumbnailUrl: 'https://picsum.photos/id/1050/320/180', title: 'Cloud Market 2025', channelName: 'CloudCast', dateAdded: '2025-08-15' },
];

const Home: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Recommendations */}
      <SectionTitle title="Recommendations" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {recommendedVideos.map((video) => (
    <VideoCard key={video.videoId} {...video} />
  ))}
</div>



      {/* Actualités */}
      <SectionTitle title="Actualités" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {newsVideos.map((video) => (
    <VideoCard key={video.videoId} {...video} />
  ))}
</div>

    </div>
  );
};

export default Home;
