import React, { useState, useEffect, useRef } from "react";
import '../styles/About.css';

function About() {
    const [lanternPosition, setLanternPosition] = useState({ x: 0, y: 0 });
    const lanternRef = useRef(null);

    const handleMouseMove = (e) => {
        if (lanternRef.current) {

            const wrapperRect = lanternRef.current.parentElement.getBoundingClientRect();

            const xPos = e.clientX - wrapperRect.left / 2;
            const yPos = e.clientY - wrapperRect.top  / 2;

            setLanternPosition({ x: xPos, y: yPos });
        }
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
  
    return (
      <div className="aboutPage">
      <div>
          <img className="lanternImg animate__animated animate__flash" src="/lantern.jpeg" alt="Lantern" />
          <h4>Tech Stack:</h4>
          <h5>Goang, Java, JavaScrip, React</h5>
          <h4>Pontos Fortes:</h4>
          <h5>Colaborativo, dedicado, aprendiz veloz</h5>
          <h4>Causas:</h4>
          <h5>Meio ambiente, igualdade de oportunidades, <br/> bem estar social</h5>

      </div>
      <div className="aboutWrapper">
        <div className="aboutTextArea">
            <div className="titleAbout">
                <h2>Sobre mim</h2>
            </div>
            <h4 className="one">
                Em um distante ano de 2005, enquanto eu frequentava o curso técnico de automobilística no CEFET/RJ, eu me sentia 
                sem direção. Tantas opções, tantos caminhos, e eu ali, sem saber para onde seguir. 
            </h4>          
            <h4 className="two">
                Ao finalizar o ensino médio, em 2007, tinha em mente três caminhos diante de mim:
                uma era a música, outro exatas, e o terceiro humanas. Acho que essa é uma dúvida de muitos jovens e não saber 
                não é vergonha nenhuma.
            </h4>        
            <h4 className="three">
                Decidi então embarcar em uma jornada dupla, iniciando duas faculdades simultaneamente: 
                Ciência Política e Engenharia Eletrotécnica. Só que havia um pequeno problema: as longas distâncias 
                que eu precisava percorrer pela cidade do Rio de Janeiro. Simplesmente não era possível seguir em duas 
                pistas ao mesmo tempo. Optei por continuar na política.
            </h4>          
            <h4 className="one">
                Isso me levou a tomar outra decisão. Eu tive que abrir mão do meu emprego como vendedor, porque não havia mais 
                tempo para conciliar tudo. Minha jornada continuou, mas algo estava fora de sintonia. Experimentei um pouco de
                administração, até mesmo história, mas nada parecia se encaixar.
            </h4>
            <h4 className="four">
                Até que, um dia, ainda no meio do lockdown eu percebi que devia mudar isso. 
                O que realmente poderia me trazer aquele brilho nos olhos?! E condo comecei a estudar programação eu tive certeza.
                Há um pouco mais de dois anos, decidi me dedicar integralmente à programação. 
            </h4>
            <h4 className="five">
                E aqui estou eu, prestes a concluir minha faculdade na área. Desta vez, tenho a certeza de que estou no caminho certo,
                desde os tempos de automobilística, política e tudo mais, é agora que sinto: estou dirigindo para onde realmente quero 
                chegar!
            </h4>
            <h4 className="six">
                Mesmo que você comece sem uma direção clara, a jornada é importante, ela é a parte do que nos faz encontrar o caminho.
                E, às vezes, o destino mais incrível está ali do seu lado, na sua frente!!!
            </h4>
        </div>
        <div
            ref={lanternRef}
                className="lantern animate__animated animate__flash"
                style={{
                    transform: `translate(${lanternPosition.x -window.innerWidth/2}px, ${lanternPosition.y - window.innerHeight/1.7}px)`,
                }}
        >
        </div>

     </div>
    </div>

    )
}

export default About;