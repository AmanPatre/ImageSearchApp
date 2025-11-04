import React from 'react';

const ImageCard = ({ image, onSelect, isSelected }) => {
  return (
    
    <div 
      className={`relative rounded-lg overflow-hidden shadow-lg group ${
        isSelected ? 'ring-4 ring-blue-500' : 'ring-0'
      }`}
    >
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="w-full h-64 object-cover"
      />
      <div 
        className={`absolute inset-0 flex items-start justify-end p-2 transition-opacity duration-300 ${
          isSelected ? 'opacity-100' : 'opacity-0'
        } group-hover:opacity-100`}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(image.id)}
          className="form-checkbox h-6 w-6 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default ImageCard;
