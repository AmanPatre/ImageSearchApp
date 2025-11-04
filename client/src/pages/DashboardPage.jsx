import React, { useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import TopSearches from '../components/TopSearches';
import SearchHistory from '../components/SearchHistory';
import SearchBar from '../components/SearchBar';
import ImageGrid from '../components/ImageGrid';

const DashboardPage = ({ user }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [lastSearchTerm, setLastSearchTerm] = useState('');

  // This function is passed down to <SearchBar>
  const handleSearch = async (term) => {
    try {
      const res = await axios.post('/api/search', { term });
      setSearchResults(res.data);
      setLastSearchTerm(term);
      setSelectedImages([]); // Clear selection on new search
      
      // In a real app, you'd also trigger a refresh of TopSearches and SearchHistory here
    } catch (err) {
      console.error("Error searching images", err);
    }
  };

  // This function is passed down to <ImageGrid> and <ImageCard>
  const handleImageSelect = (id) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((imgId) => imgId !== id)
        // Add id if it doesn't exist
        : [...prevSelected, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* --- Main Content (Left Side) --- */}
          <div className="lg:col-span-3">
            <SearchBar onSearch={handleSearch} />
            
            {/* --- Results Header --- */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {lastSearchTerm 
                  ? `You searched for "${lastSearchTerm}"` 
                  : "Search Results"}
                <span className="text-gray-500 text-base ml-2">
                  {searchResults.length} results
                </span>
              </h2>
              <span className="font-semibold text-blue-600">
                Selected: {selectedImages.length} images
              </span>
            </div>
            
            <ImageGrid 
              images={searchResults}
              onSelectImage={handleImageSelect}
              selectedImages={selectedImages}
            />
          </div>

          {/* --- Sidebar (Right Side) --- */}
          <div className="lg:col-span-1 space-y-8">
            <TopSearches />
            <SearchHistory />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;