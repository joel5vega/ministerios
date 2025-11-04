import React from 'react';
import MinistryCard from './MinistryCard';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function MinistriesFetcher({ setMinistries, setLoading }) {
  useEffect(() => {
    async function fetchMinistries() {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "ministries"));
        const ministries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMinistries(ministries);
      } catch (error) {
        console.error("Failed to fetch ministries:", error);
      }
      setLoading(false);
    }
    fetchMinistries();
  }, [setMinistries, setLoading]);
  return null;
}

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
