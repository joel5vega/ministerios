import React from 'react';

export default function MinistryCard({ ministry }) {
  const { name, description, tags, phone, email, website } = ministry;
  return (
    <div className="ministry-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="tags">
        {tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="contact-info">
        {phone && <p>📞 {phone}</p>}
        {email && <p>✉️ {email}</p>}
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            🌐 Website
          </a>
        )}
      </div>
    </div>
  );
}
