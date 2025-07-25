import React from 'react';

interface VideoCardProps {
    thumbnailUrl: string;
    channelName: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ thumbnailUrl, channelName }) => (
    <div className="w-full max-w-sm">
        <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden">
        <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
        </div>
        <p className="mt-2 text-sm text-gray-700 font-medium">{channelName}</p>
    </div>
);

export default VideoCard;
