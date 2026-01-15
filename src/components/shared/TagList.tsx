import React from 'react';

interface TagListProps {
  tags: string[];
  getTagLabel: (tag: string) => string;
}

const TagList = ({ tags, getTagLabel }: TagListProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
        >
          {getTagLabel(tag)}
        </span>
      ))}
    </div>
  );
};

export default TagList;