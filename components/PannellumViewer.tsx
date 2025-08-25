
import React, { useEffect, useRef } from 'react';

// TypeScript declaration for the Pannellum library loaded from a script tag.
declare global {
  interface Window {
    pannellum: {
      viewer: (
        container: HTMLElement,
        config: { [key: string]: any }
      ) => PannellumViewerInstance;
    };
  }
}

interface PannellumViewerInstance {
  destroy: () => void;
}

interface PannellumViewerProps {
  imageUrl: string;
}

const PannellumViewer: React.FC<PannellumViewerProps> = ({ imageUrl }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const pannellumInstance = useRef<PannellumViewerInstance | null>(null);

  useEffect(() => {
    if (viewerRef.current && imageUrl) {
      // Clean up previous instance if it exists
      if (pannellumInstance.current) {
        pannellumInstance.current.destroy();
      }

      // Check if Pannellum is available on the window object
      if (window.pannellum) {
        pannellumInstance.current = window.pannellum.viewer(viewerRef.current, {
          type: 'equirectangular',
          panorama: imageUrl,
          autoLoad: true,
          showControls: false,
          compass: true,
          northOffset: 240,
        });
      } else {
        console.error("Pannellum library not found.");
      }
    }

    // Cleanup function to destroy the viewer when the component unmounts
    return () => {
      if (pannellumInstance.current) {
        pannellumInstance.current.destroy();
        pannellumInstance.current = null;
      }
    };
  }, [imageUrl]);

  return <div ref={viewerRef} className="w-full h-full" />;
};

export default PannellumViewer;
