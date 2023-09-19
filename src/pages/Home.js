import React, { useEffect, useState, useRef } from "react";
import { db, storage } from '../firebase-config';
import {ref as storageRef,getDownloadURL, listAll} from 'firebase/storage';
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import '../styles/Home.css';

export function Home({postList}) {
    let navigate = useNavigate(); 

    const [isClicked, setIsClicked] = useState(false);
    const [grayness, setGrayness] = useState(15); 
    const [blurness, setBlurness] = useState(10);
    const [hoveredPostId, setHoveredPostId] = useState(null);
    const [isRotating, setIsRotating] = useState(false);

    const handleClick = () => {
      if (grayness >= 200) {setGrayness(0)}  
      setGrayness((prevGrayness) => prevGrayness + 20);
      setIsClicked((prevState) => !prevState);
      console.log(grayness);
      music !== null ? setMusic(null) : loadingMusicURL();

      setIsRotating((prevState) => !prevState);
    };

      const handleMouseEnter = () => {
          setBlurness(0);
          if (music !== null) {setIsRotating(true)};
      };
    
      const handleMouseLeave = () => {
          setBlurness(10); // Define o desfoque como 10 quando o mouse sai, mas apenas se não estiver clicado
          setIsRotating(false)
      };

      //----MUSIC-------------------------------- //
      const [music, setMusic] = useState(null);


      const loadingMusicURL = async () => {
        try {
          const musicRef = storageRef(storage, 'music'); 
          const musicList = await listAll(musicRef);
          const musicArray = [];
    
          for (const itemRef of musicList.items) {
            const musicUrl = await getDownloadURL(itemRef);
            musicArray.push(musicUrl);
          }
    
          if (musicArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * musicArray.length);
            const randomMusicUrl = musicArray[randomIndex];
            setMusic(randomMusicUrl);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        if (music !== null) {
        }
      }, [music]);

      // -------------- THE DICE -----------------------------//
      
      const diceElement = document.querySelector(".dice-action");
      const [diceTopPosition, setDiceTopPosition] = useState(12);
      const [isAnimating, setIsAnimating] = useState(false);
      const intervalIdRef = useRef(null);
    
      const playDice = () => {
        console.log("start animation");
        setIsAnimating(true);
      
        const targetPositions = [1362, 1974, 2604, 3216];
        let currentPosition = 0;
        let isPaused = false;
      
        function* animationGenerator() {
          while (currentPosition < 3820) {
            if (!isPaused) {
              setDiceTopPosition((prevPosition) => {
                const newPosition = prevPosition + 18;
                console.log(newPosition);
      
                smoothScrollTo(0, newPosition - 565);
      
                if (targetPositions.includes(newPosition)) {
                  console.log("timeout");
                  isPaused = true;
                  setTimeout(() => {
                    console.log("timeout ended");
                    isPaused = false;
                  }, 3000);
                }
      
                if (newPosition >= 3820) {
                  clearInterval(intervalId);
                  setIsAnimating(false);
                  return 3820;
                }
                return newPosition;
              });
            }
      
            yield;
          }
        }
      
        const generator = animationGenerator();
        const intervalId = setInterval(() => {
          generator.next();
        }, 185);
      };
      
      
      
      
    
      useEffect(() => {
       
      }, [diceTopPosition]);

      // --------------------scroll ----------------//

      const smoothScrollTo = (targetX, targetY) => {
        let currentY = window.scrollY;
    
        const animateScroll = () => {
          currentY += (targetY - currentY) * 0.1; 
          window.scrollTo(targetX, currentY);
    
          if (Math.abs(currentY - targetY) > 1) {
            requestAnimationFrame(animateScroll);
          }
        };
    
        requestAnimationFrame(animateScroll);
      };
    
      useEffect(() => {
      
      }, [diceTopPosition]);

    return (
        // FRIST STEP 1 - logo, 2 DADO, 3 TEXT -----  Slices --------- Contact and articles
        <div className="homePage">
          <div className="mainHome">
            
       <div className="homeLogoWrapper">
        <div
          className={`homeLogo ${isRotating ? "rotate-animation" : ""}`} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          style={{
            filter: `blur(${blurness}px) grayscale(${grayness}%)`,
            transition: "filter 1.8s ease-in-out",
          }}
        >
          <img src="/logo-512.svg" alt="Logo"/>
        </div>
      </div>

      {music !== null && (
        <div className="musicLoader" style={{ top: "15px", zIndex: 1 }}>
          <video 
            controls
            autoPlay
            name="media"
            src={music}
            type="audio/mpeg"
          />
        </div>
      )}

            
            <div className="startPlay">
              <h3>CLIQUE AQUI!</h3>
              <button className="fa fa-solid fa-play fa-2x" onClick={playDice}></button>
            </div>

            <div
              className="dice"
              style={{
                transform: `translateY(${diceTopPosition}px)`,
                transition: isAnimating ? "transform 1.3s ease-in-out" : "none", 
              }}
            >

             <div className="dice-action">
              <div className="face-1">
                <h1></h1>
              </div>
              <div className="face-2">
                <h1></h1>
              </div>
              <div className="face-3">
                <h1></h1>
              </div>
              <div className="face-4">
                <h1></h1>
              </div>
              <div className="face-5">
                <h1></h1>
              </div>
              <div className="face-6">
                <h1></h1>
             </div>
            </div>    
            </div>



            <div className="hometext">
                <h1>Bem-vindo ao meu blog pessoal</h1>
                <h4>Sinta-se à vontade para explorar de sua maneira preferida.</h4>
                <h4>Me chamo Rodrigo Barenco e espero que goste da experiência.</h4>
            </div>
          </div> 
            


          <div className="homeSliceOne">
            <div className="hometext">
                <h1>Nem sempre sabemos o que esperar</h1>
                <h4>Você chegou aqui por um motivo. E espero que encontre outros para me contactar ou apenas acompanhar minha jornada.</h4>
                <h4>Já passei por muitas áreas do conhecimento e para mim também foi uma surpresa...</h4>
            </div>
          </div>



          <div className="homeSliceTwo">
            <div className="hometext">
                <h1>As vezes mudamos de ideia mas nunca paramos</h1>
                <h4>Foi uma supresa que tenha finalmente achado meu caminho, pois nem sempre a vida segue em linha reta, as vezes precisamos mudar.</h4>
                <h4>Imagine que fiz automobilística, ciência política, um perído de engenha eletrotécnica, administração, história... não desisti de encontrar o que amo.</h4>
            </div>
          </div>



          <div className="homeSliceThree">
            <div className="hometext">
                <h1>Então... parece que encontrei</h1>
                <h4>E sim, também amo musica e sou trompetista nas horas vagas! Mas o lugar onde me sinto bem como profissional é na área de tecnologia.</h4>
                <h4>Hoje posso dizer em alto e bom som que amo o que faço!</h4>
            </div> 
          </div>



          <div className="homeSliceFour">
            <div className="hometext">
                <h1>Se você chegou até aqui</h1>
                <h4>Eu realmente agradeço. Como você pode observar, embaixo estão alguns de meus artigos e também meus contatos.</h4>
                <h4>Não seja tímido! Você pode me seguir, mandar uma menssagem, pode ter ceteza que irei responder.</h4>
            </div> 
          </div>



          <div className="ContactArticles">

              <div className="hometext">
                <h1>Contato</h1>
                <h4>Caso tenha alguma dúvida ou queira fazer contato profissional, <br/>utilize uma das seguintes opções:</h4>
                <div className="buttonHomeContainer">
                <button className="yellowbutton" onClick={() => navigate("/contact")}> CONTATO </button>
                <a href="https://www.linkedin.com/in/rodrigobarenco/" target="_blank">
                <i className="fa fa-linkedin fa-2x"></i>
                </a>
                <a href="https://github.com/RodBarenco" target="_blank">
                <i className="fa fa-github fa-2x"></i>
                </a>
                </div>
              </div>   

           <div className="postContainerAndTitle">
              <h1>ARTIGOS</h1> 
              <div className="postsHome">
                {postList.map((post) => {

                 function styleHandlerIn() {
                   setHoveredPostId(post.id)
                 }

                 if (!post) {
                  return <div key={post.id}>Carregando...</div>;
                }

                 function styleHandlerOut() {
                   setHoveredPostId(null)
                 }

                   return (
                     <div className="post" 
                     key={post.id}
                     onMouseEnter={() => styleHandlerIn()}
                     onMouseLeave={() => styleHandlerOut()}
                     style={{
                       filter: `drop-shadow(0 -0.3mm 1mm ${
                         hoveredPostId === post.id ? post.color : 'transparent'
                       })`,
                       transition: "filter 1.8s ease-in-out",
                     }}
                     >
                       {""}
                       <div className="postHeader">
                         {""}
                         {parse(DOMPurify.sanitize(post.title, { USE_PROFILES: { html: true } }))} 
                         <span
                            className="expand-text"
                            onClick={() => navigate(`/article/${post.id}`)}
                            style={{ marginLeft: '8px', cursor: 'pointer' }}
                          >  
                           <p>Expandir <i  className="fa fa-search"/></p>                        
                        </span>

                         <div className="content">
                         {parse(DOMPurify.sanitize(post.content, { USE_PROFILES: { html: true } }))} 
                      </div>
                    </div>
                  </div>
                )
              })
             }
             </div>
            </div>
          </div>
        </div>
      );
}

export default Home;