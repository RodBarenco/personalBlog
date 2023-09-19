import React, { useState, useEffect } from 'react';
import { Waveform } from '@uiball/loaders';

import '../styles/YetToBuild.css';

function InConstruction() {
  const [showImage, setShowImage] = useState(false);

  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };

  useEffect(() => {
    preloadImage('/inconstruction.svg');

    const timer = setTimeout(() => {
      setShowImage(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="inConstruction">
        {showImage ? (
          <img className="inConstPic" src="/inconstruction.svg" alt="503" />
        ) : (
          <Waveform size={150} color="yellow"></Waveform>
        )}
      </div>
    </>
  );
}

export default InConstruction;