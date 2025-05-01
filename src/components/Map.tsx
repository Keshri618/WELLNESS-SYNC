'use client'; // Only if you're using Next.js 13+ App Router (optional but safe)

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Map container style
const containerStyle = {
  width: '100%',
  height: '400px', // You can adjust height if you want
};

// Default map center (Example: New Delhi)
const center = {
  lat: 28.6139,
  lng: 77.2090,
};

const Map: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12} // Adjust zoom level if you want
      >
        {/* Add a marker in center */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
