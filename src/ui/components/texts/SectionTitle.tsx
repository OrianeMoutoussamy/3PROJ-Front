import React from 'react';

interface SectionTitleProps {
    title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
    <div className="flex items-center gap-4 my-4">
        <h2 className="text-xl font-semibold whitespace-nowrap">{title}</h2>
        <hr className="flex-1 border-t border-gray-300" />
    </div>
);

export default SectionTitle;
