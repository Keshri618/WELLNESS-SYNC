// "use client";
// import { useEffect, useState } from 'react';
// import { Loader, LoaderOptions } from '@googlemaps/js-api-loader';

// interface GoogleMapsLoaderProps {
//   apiKey: string;
//   libraries?: ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[];
//   version?: string;
//   region?: string;
//   language?: string;
//   onLoadSuccess?: () => void;
//   onLoadError?: (error: Error) => void;
// }

// const GoogleMapsLoader = ({
//   apiKey,
//   libraries = ['places'],
//   version = 'weekly',
//   region,
//   language,
//   onLoadSuccess,
//   onLoadError,
// }: GoogleMapsLoaderProps) => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     if (isLoaded) return;

//     const loaderOptions: LoaderOptions = {
//       apiKey,
//       version,
//       libraries,
//     };

//     if (region) {
//       loaderOptions.region = region;
//     }

//     if (language) {
//       loaderOptions.language = language;
//     }

//     const loader = new Loader(loaderOptions);

//     loader
//       .load()
//       .then(() => {
//         setIsLoaded(true);
//         if (onLoadSuccess) {
//           onLoadSuccess();
//         }
//         console.log('Google Maps API loaded successfully');
//       })
//       .catch((error) => {
//         if (onLoadError) {
//           onLoadError(error);
//         }
//         console.error('Error loading Google Maps API:', error);
//       });

//     return () => {
//       // Cleanup if needed
//     };
//   }, [apiKey, libraries, version, region, language, isLoaded, onLoadSuccess, onLoadError]);

//   return null;
// };

// export default GoogleMapsLoader;

"use client";
import { useEffect, useState } from 'react';

interface GoogleMapsLoaderProps {
  apiKey?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  children?: React.ReactNode;
}

declare global {
  interface Window {
    google: any;
    initMap?: () => void; // Made initMap optional
  }
}

const GoogleMapsLoader: React.FC<GoogleMapsLoaderProps> = ({
  apiKey = 'AIzaSyDmgaH07I4E8VKQnJRu5UN99kIjyebonUs', // Default API key
  onLoad,
  onError,
  children
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    // If Google Maps API is already loaded, don't load it again
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      onLoad?.();
      return;
    }

    // Function to be called when Google Maps API is loaded
    window.initMap = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    // Create script element to load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Handle script load error
    script.onerror = () => {
      const error = new Error('Failed to load Google Maps API');
      setLoadError(error);
      onError?.(error);
    };

    // Append script to document
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      // Only remove the script if it was added by this component
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      
      // Clean up global callback
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, [apiKey, onLoad, onError]);

  // Render children with loading state
  return (
    <>
      {loadError && <div className="text-red-500">Failed to load Google Maps API</div>}
      {isLoaded ? children : <div className="p-4">Loading Google Maps...</div>}
    </>
  );
};

export default GoogleMapsLoader;