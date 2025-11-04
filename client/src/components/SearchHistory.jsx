import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch history on component load
    async function fetchHistory() {
      try {
        const res = await axios.get('/api/history');
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history", err);
      }
    }
    fetchHistory();
  }, []); 

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Your History</h3>
      <ul className="space-y-2">
        {history.length > 0 ? (
          history.map((item) => (
            <li key={item._id} className="text-gray-600 text-sm flex justify-between">
              <span>{item.term}</span>
              <span className="text-gray-400">
               
                {new Date(item.timestamp).toLocaleString()}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Your search history is empty.</p>
        )}
      </ul>
    </div>
  );
};

export default SearchHistory;