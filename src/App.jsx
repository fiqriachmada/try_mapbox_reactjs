import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import mapboxgl from 'mapbox-gl';
import MapboxComponent from './components/mapBox';


mapboxgl.accessToken =
  'pk.eyJ1IjoiZmlxcmlhY2htYWRhIiwiYSI6ImNqb2M3czhpZjFzdzQzcW9kZGFlaGI3d2gifQ.Plxy3SnDq7g7gH_KPXJkBw';

function App() {

  return (
    <>
      <MapboxComponent />
    </>
  );
}

export default App;
