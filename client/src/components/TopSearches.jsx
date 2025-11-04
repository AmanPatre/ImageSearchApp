import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopSearches = ()=> {
  const [topSearches, setTopSearches] = useState([]);

  useEffect(() => {
    // Fetch top searches on component load
    async function fetchTopSearches() {
      try {
        const res = await axios.get('/api/top-searches');
        setTopSearches(res.data);
      } catch (err) {
        console.error("Error fetching top searches", err);
      }
    }
    fetchTopSearches();
  }, []);

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Top 5 Searches
      </h3>
      <div className="flex flex-wrap gap-2">
        {topSearches.length > 0 ? (
          topSearches.map((search) => (
            <span
              key={search.term}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
            >
              {search.term} 
            </span>
          ))
        ) : (
          <p className="text-gray-500">No searches yet.</p>
        )}
      </div>
    </div>
  );
};

export default TopSearches;