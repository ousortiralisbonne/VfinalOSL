import React from 'react';

interface HighlightListProps {
  highlights: string[];
}

const HighlightList = ({ highlights }: HighlightListProps) => {
  return (
    <div className="space-y-2 mb-6">
      {highlights.map((highlight, index) => (
        <div key={index} className="flex items-center text-sm text-gray-600">
          <div className="h-1.5 w-1.5 rounded-full bg-[#37b7ab] mr-2" />
          {highlight}
        </div>
      ))}
    </div>
  );
};

export default HighlightList;