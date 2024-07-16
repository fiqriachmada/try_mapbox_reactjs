import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import mapbox-gl CSS


mapboxgl.accessToken =
  'pk.eyJ1IjoiZmlxcmlhY2htYWRhIiwiYSI6ImNqb2M3czhpZjFzdzQzcW9kZGFlaGI3d2gifQ.Plxy3SnDq7g7gH_KPXJkBw';

const MapboxComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setError(null); // Clear any previous error
      },
      (error) => {
        setError(error.message);
        setLatitude(null); // Clear any previous position
        setLongitude(null); // Clear any previous position
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // Cleanup when component unmounts
    };
  }, [latitude, longitude]);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2,
      });

      // Add navigation control (optional)
      mapRef.current.addControl(new mapboxgl.NavigationControl());
    }

    if (latitude !== null && longitude !== null && mapRef.current) {
      // Update the map's center
      mapRef.current.setCenter([longitude, latitude]);
      mapRef.current.setZoom(15);

      // Create a GeoJSON object to represent the user's location
      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            properties: {},
          },
        ],
      };

      // Add the user location layer to the map
      if (mapRef.current.getSource('user-location')) {
        mapRef.current.getSource('user-location').setData(geojson);
      } else {
        mapRef.current.addSource('user-location', {
          type: 'geojson',
          data: geojson,
        });

        // Add a layer to the map
        mapRef.current.addLayer({
          id: 'user-location',
          type: 'circle',
          source: 'user-location',
          paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf', // Blue color for the circle
            'circle-opacity': 0.7,
          },
        });
      }
    }
  }, [latitude, longitude]);

  const resetMap = () => {
    // Reset map to initial position (center and zoom)
    if (mapRef.current) {
      mapRef.current.setCenter([latitude || 0, longitude || 0]); // Set to initial center
      mapRef.current.setZoom(2); // Set to initial zoom level
    }
  };

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="map-container"
        style={{ marginBottom: 20, marginTop: 10 }}
      />
      {error && <p>Error: {error}</p>}
      <button
        onClick={() => {
          setLatitude(null);
          setLongitude(null);
          resetMap();
        }}
        // style={{ position: 'absolute', top: 10, left: 10 }}
      >
        Reset Map
      </button>
    </div>
  );
};

export default MapboxComponent;
