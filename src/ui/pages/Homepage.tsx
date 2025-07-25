// src/pages/Home.tsx
import React from 'react';
import SectionTitle from '../components/texts/SectionTitle';
import VideoCard from '../components/videos/VideoCard';

const Home: React.FC = () => {
    return (
        <div className="p-6 space-y-6">
        <SectionTitle title="Recommendations" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <VideoCard thumbnailUrl="https://via.placeholder.com/300x169" channelName="Channel A" />
            <VideoCard thumbnailUrl="https://via.placeholder.com/300x169" channelName="Channel B" />
            <VideoCard thumbnailUrl="https://via.placeholder.com/300x169" channelName="Channel C" />
        </div>

        <SectionTitle title="Actualités" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <VideoCard thumbnailUrl="https://via.placeholder.com/300x169" channelName="News Channel" />
            <VideoCard thumbnailUrl="https://via.placeholder.com/300x169" channelName="Info Now" />
            <VideoCard thumbnailUrl="https://via.placeholder.com/300x169" channelName="Daily Brief" />
        </div>
        </div>
    );
};

export default Home;
