import React, { useState, useEffect } from 'react';

function Parallax() {
  const [tipsData, setTipsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/tips.json'); 
        const data = await response.json();
        setTipsData(data);
      } catch (error) {
        console.error('Erro ao carregar os dados das dicas:', error);
      }
    };

    fetchData();
  }, []);

  //-------------------------------------------------------------------------------

  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    console.log(isMouseOver)
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    console.log(isMouseOver)
  };


  useEffect(() => {
  }, [isMouseOver]);
  

  return (
    <div className='whiteBox'>
      <div className={`parallax-container ${isMouseOver ? 'pause-animation' : ''}`}>
        {tipsData && tipsData.dicas_para_desenvolvedores.map((tip, index) => (
          <div
            key={index}
            className={`tip ${isMouseOver ? 'scale-up' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <h4>{tip.frase}</h4>
            <p>- {tip.autor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Parallax;
