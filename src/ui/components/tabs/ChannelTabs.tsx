import React from 'react';
import SectionTitle from '../texts/SectionTitle';
import './ChannelTabs.css';


interface Video {
    title: string;
    date: string;
}

interface Playlist {
    title: string;
    count: number;
}

interface ChannelTabsProps {
    activeTab: 'main' | 'videos' | 'playlists';
    videos: Video[];
    playlists: Playlist[];
}

const ChannelTabs: React.FC<ChannelTabsProps> = ({ activeTab, videos, playlists }) => {
    if (activeTab === 'main') {
        return (
            <>
                <SectionTitle title="Vidéos récentes" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {videos.slice(0, 3).map((_, index) => (
                        <div key={index} className="aspect-video bg-gray-200 rounded shadow" />
                    ))}
                </div>
            </>
        );
    }

    if (activeTab === 'videos') {
        return (
            <>
                <SectionTitle title="Toutes les vidéos" />
                <ul className="space-y-2">
                    {videos.map((video, index) => (
                        <li key={index} className="p-4 border rounded bg-white shadow-sm">
                            <h3 className="font-medium">{video.title}</h3>
                            <p className="text-sm text-gray-500">Publié le {video.date}</p>
                        </li>
                    ))}
                </ul>
            </>
        );
    }

    if (activeTab === 'playlists') {
        return (
            <>
                <SectionTitle title="Playlists publiques" />
                <ul className="space-y-2">
                    {playlists.map((playlist, index) => (
                        <li key={index} className="p-4 border rounded bg-white shadow-sm">
                            <h3 className="font-medium">{playlist.title}</h3>
                            <p className="text-sm text-gray-500">{playlist.count} vidéos</p>
                        </li>
                    ))}
                </ul>
            </>
        );
    }

    return null;
};

export default ChannelTabs;
