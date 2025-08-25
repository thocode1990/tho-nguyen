
import React, { useState, useCallback } from 'react';
import PannellumViewer from './components/PannellumViewer';
import ImageUploader from './components/ImageUploader';

const DEFAULT_IMAGE = 'https://pannellum.org/images/alma.jpg';

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
      setError(null);
    } else {
      setError('Invalid file type. Please upload an image.');
    }
  }, []);

  const handleLoadDefault = () => {
    setImageUrl(DEFAULT_IMAGE);
    setError(null);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col antialiased">
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg p-4 z-10 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider text-cyan-400">
            360° Image Viewer
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLoadDefault}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-400 transition-colors"
            >
              Load Default
            </button>
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center relative">
        {error && (
          <div className="absolute top-4 bg-red-500 text-white p-3 rounded-md z-20 shadow-lg">
            {error}
          </div>
        )}
        <div className="w-full h-[calc(100vh-120px)] relative">
          <PannellumViewer imageUrl={imageUrl} />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md p-3 rounded-lg text-sm text-gray-300 pointer-events-none">
            Click and drag to look around. Use mouse wheel to zoom.
          </div>
        </div>
      </main>

      <footer className="bg-gray-800/30 text-center p-2 text-xs text-gray-500">
        Powered by React, Tailwind CSS, and Pannellum
      </footer>
    </div>
  );
};

export default App;
