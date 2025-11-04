import React from 'react';
import ImageCard from './ImageCard';

const ImageGrid = ({ images, onSelectImage, selectedImages }) => {
  if (images.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500">
        Search for images to see results.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onSelect={onSelectImage}
          isSelected={selectedImages.includes(image.id)}
        />
      ))}
    </div>
  );
};

export default ImageGrid;