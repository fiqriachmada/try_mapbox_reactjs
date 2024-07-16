import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import mapboxgl from 'mapbox-gl';
import MapboxComponent from './components/mapBox';


mapboxgl.accessToken =
  'pk.eyJ1IjoiZmlxcmlhY2htYWRhIiwiYSI6ImNqb2M3czhpZjFzdzQzcW9kZGFlaGI3d2gifQ.Plxy3SnDq7g7gH_KPXJkBw';

function App() {
  const [count, setCount] = useState(0);

  const [language, setLanguage] = useState('');

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
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
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const browserLanguage = navigator.language || navigator.userLanguage;

  useEffect(() => {
    setLanguage(browserLanguage);
  }, []);

  console.log(navigator.language);
  console.log(navigator);
  console.log(navigator.userActivation);
  const copyTextToClipboard = (text) => {
    console.log(navigator.language);
    console.log(navigator);
    console.log(navigator.userActivation);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };

  const readTextFromClipboard = () => {
    console.log(navigator.language);
    console.log(navigator);
    console.log(navigator.userActivation);
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log('Text read from clipboard: ', text);
      })
      .catch((err) => {
        console.error('Could not read text: ', err);
      });
  };

  return (
    <>
      <MapboxComponent />
    </>
  );
}

export default App;
