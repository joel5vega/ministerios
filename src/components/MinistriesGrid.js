import React from 'react';
import MinistryCard from './MinistryCard';

export default function MinistriesGrid({ ministries }) {
  if (ministries.length === 0)
    return <div className="no-results">No ministries found.</div>;
  return (
    <div className="ministries-grid">
      {ministries.map((ministry) => (
        <MinistryCard key={ministry.id} ministry={ministry} />
      ))}
    </div>
  );
}
