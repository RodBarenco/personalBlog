import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';


function MapComponent(mapKey) {
  const {} = useLoadScript({
    googleMapsApiKey: mapKey,
  });
  return <div>Map</div>

  }
  
  export default MapComponent;