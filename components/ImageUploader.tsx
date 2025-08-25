
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
    // Reset file input to allow uploading the same file again
    event.target.value = '';
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg, image/png, image/webp"
      />
      <button
        onClick={handleButtonClick}
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-400 transition-colors"
      >
        <UploadIcon className="w-5 h-5 mr-2" />
        Upload Image
      </button>
    </>
  );
};

export default ImageUploader;
