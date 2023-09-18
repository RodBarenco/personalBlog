import React, { useState } from "react";
import "animate.css";
import "../styles/Projects.css";

function Projects() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [activeDivIndex, setActiveDivIndex] = useState(0);

  const projects = [
    {
      title: "Projeto Colab",
      description:
        "Este é um projeto de backend usando Golang para um site de compartilhamento de artigos acadêmicos. Vale muito dar uma olhada!",
      link: "https://github.com/RodBarenco/colab-project-api",

  
      media: (
        <img
          src={"/project-pics/colab.png"}
          alt="Imagem do projeto"
          width={570} 
          height={420}
          style={{
            boxShadow: '1px 0px 8px black' 
          }}
          />)
    },
    {
      title: "React Shopping Cart",
      description:
        "Implementação de um Carrinho de Compras para uma loja virtual usando React com Typescript.",
      link: "https://github.com/RodBarenco/react-shopping-cart",
      liveLink:"https://react-shopping-cart-zeta-five.vercel.app/",
      media: (
        <img
          src={"https://media.licdn.com/dms/image/C4D22AQFVFWww8hE6JQ/feedshare-shrink_2048_1536/0/1671560851131?e=1697673600&v=beta&t=G2Ix97TUbmDc8H0ymKOHeaVVbC9kGlfQqeQtq50-vlw"}
          alt="Imagem do projeto"
          width={570} 
          height={420}
          style={{
            boxShadow: '1px 0px 8px black' 
          }}
        />)
    },
    {
      title: "Jogo de Tetris em Flutter para Android",
      description:
        "Tetris feito em Flutter. Quem foi criança nos anos 90 com certeza se lembra daquelas caixinhas pretas com botões amarelos, você podia jogar por horas!",
      repoLink: "https://github.com/RodBarenco/tetris_flutter",
      downloadLink: "https://drive.google.com/file/d/1lrSuMMKQ8N9GYxdhcRFh6Gi64nPZ50Dt/view",
      media: (
        <img
          src={"https://media.licdn.com/dms/image/D4D22AQEioH3uNiOdhw/feedshare-shrink_2048_1536/0/1683988694422?e=1697673600&v=beta&t=9NrE7OvqhUGuW5Th1wLyw_i3nggdlBrUJVvqP5O-HkM"}
          alt="Imagem do projeto"
          width={290} 
          height={420}
          style={{
            boxShadow: '1px 0px 8px black' 
          }}
        />)
    },
    {
      title: "REST API com NestJS",
      description:
        "REST API feito com NestJS que implementa operações CRUD relativas aos bookmarks dos usuários.",
      link: "https://github.com/RodBarenco/NESTJS-REST-API",
      media: (
        <img
          src={"/project-pics/nestapi.png"}
          alt="Imagem do projeto"
          width={460} 
          height={340}
          style={{
            boxShadow: '1px 0px 8px black'  
          }}
        />)
    },
    {
      title: "Script de Busca de Vagas no LinkedIn",
      description:
        "Um script em Python que busca vagas no LinkedIn e salva informações em um arquivo CSV.",
      link: "https://github.com/RodBarenco/learning-data-scraping",
      media: (
        <img
          src={"/project-pics/scraping.png"}
          alt="Imagem do projeto"
          width={570} 
          height={420}
          style={{
            boxShadow: '1px 0px 8px black'  
          }}
        />)
    },
    {
      title: "To-Do App em Python",
      description:
        "Aplicativo simples de lista de tarefas.",
      link: "https://lnkd.in/dG9G5_JV",
      media: (
        <img
          src="https://media.licdn.com/dms/image/D4D22AQHCzsVvaZaFUQ/feedshare-shrink_2048_1536/0/1681089358395?e=1697673600&v=beta&t=D5MNcdHtqF7rWX7lpDW_DsPGVYh0OOBIi-CfznqtVFE"
          alt="Imagem do projeto"
          width={570} 
          height={420}
          style={{
            boxShadow: '1px 0px 8px black' 
          }}
        />)
    },
    {
      title: "Web Portfolio em React",
      description:
        "Um incrível web-portfolio com animações usando React!",
      link: "https://github.com/RodBarenco/web-portfolio",
      liveLink: "https://www.barenco-dev.top/",
      media: (
        <img
          src="https://media.licdn.com/dms/image/C4D22AQEiWlqAaVP2Dg/feedshare-shrink_1280/0/1673878260889?e=1697673600&v=beta&t=LilBjJaA-RUMgus5ZsjcTsn0kGaAfumB6VYXJjqvoBc"
          alt="Imagem do projeto"
          width={570} 
          height={380}
          style={{
            boxShadow: '1px 0px 8px black' 
          }}
        />)
    },
    {
      title: "Validador de Cartão em JavaScript",
      description:
        "São validações simples usando regex para verificação da bandeira do cartão.",
      link: "https://vercel.com/rodbarenco/cardvalidationrocketseatlesson",
      repoLink: "https://github.com/RodBarenco/cardvalidation_rocketseat_lesson",
      media: (
        <img
          src="https://media.licdn.com/dms/image/C4D22AQHl_ecOsUgfcw/feedshare-shrink_1280/0/1666668970470?e=1697673600&v=beta&t=cojQXML2xk5zVsmZLWA4PyOq5Isu7ihTcCajaavdNeI"
          alt="Imagem do projeto"
          width={570} 
          height={380}
          style={{
            boxShadow: '1px 0px 8px black' 
          }}
        />)
    },
  ];

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    setActiveDivIndex((prevIndex) => (prevIndex + 1) % 9);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const circleClass = isMouseOver ? "circle reflection lighting custom-rubber-band" : "circle reflection lighting";

  return (
    <div className="projects">
      <div className="metal">
        <div className="cube-wrapper">
          <div className="cube-2">
            <div className="cube"></div>
          </div>
        </div>
      </div>

      <div
        className="metal"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "0.8s ease-in-out",
        }}
      >
        <div className={circleClass}></div>
      </div>

      {}
      {activeDivIndex !== 0 && (
        <div
          className={`active-div div${activeDivIndex} animate__animated animate__fadeIn`} 
          style={{
            transform: "translate(-50%, -50%)",
            transition: "0.8s ease-in-out",
        }}
>
          <h2>{projects[activeDivIndex - 1].title}</h2>
          <p>{projects[activeDivIndex - 1].description}</p>
         
        <div className="project-links">
          {projects[activeDivIndex - 1].link && (
            <a href={projects[activeDivIndex - 1].link} target="_blank">Link do Repositório</a>
          )}
          {projects[activeDivIndex - 1].repoLink && (
            <a href={projects[activeDivIndex - 1].repoLink} target="_blank">Link do Repositório</a>
          )}
          {projects[activeDivIndex - 1].downloadLink && (
            <a href={projects[activeDivIndex - 1].downloadLink} target="_blank">Download</a>
          )}
          {projects[activeDivIndex - 1].liveLink && (
            <a href={projects[activeDivIndex - 1].liveLink} target="_blank">Ver Online</a>
          )}
       </div>
          
          {projects[activeDivIndex - 1].media && (
         <div>
          {typeof projects[activeDivIndex - 1].media === 'string' ? (
      // Se a mídia for uma string, assume que é um link de imagem
            <img 
              src={projects[activeDivIndex - 1].media}
              alt="Imagem do projeto"
            />
          ) : (
          projects[activeDivIndex - 1].media
        )}
     </div>
     )}
        </div>
      )}
    </div>
  );
}

export default Projects;
