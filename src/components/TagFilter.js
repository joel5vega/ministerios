import React from 'react';

export default function TagFilter({ tags, selectedTags, onToggleTag }) {
  return (
    <div className="tag-filter">
      {tags.map((tag) => (
        <button
          key={tag}
          className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
          onClick={() => onToggleTag(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
