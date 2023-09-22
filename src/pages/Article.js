import React , { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'; 
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { DotPulse } from '@uiball/loaders';
import ShareButton from '../components/Share';

import '../styles/Article.css';

const Article = ({ getArticleById }) => {
  const { id } = useParams();
  const article = getArticleById(id);
  const [timeLoader, setTimeLoader] = useState(true);

  useEffect(() => {
    const artcleErr = () => {
      setTimeout(() => {
        setTimeLoader(false);
      }, 1600);
    };

    artcleErr();
  }, []); 

  if (!article) {
    return (
      timeLoader ? 
      <div 
        style={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      
      >
      <DotPulse size={75} color="white"></DotPulse>
      </div> : 
      (
        <div
          className='ErrorContainer'
          style={{
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h2>Erro 404: Artigo não encontrado</h2>
          <h3>Ops, esse artigo não existe ou não foi encontrado!</h3>
        </div>
      )
    );
  }

 window.scrollTo(0, 0);

  return (
    <div className='ExpandedArticleContainer'>
     <div className='ExpandedArticle'>
       <div className='titleExp'>
          <h2>{parse(DOMPurify.sanitize(article.title, { USE_PROFILES: { html: true } }))}</h2>
       </div>
       <div className='contentExp'>
         {parse(DOMPurify.sanitize(article.content, { USE_PROFILES: { html: true } }))}
       </div>
     </div>
   
     <div className='shareOn'
       style={{
        height: '140px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
       }}
     >
      <div>
      <h4
        style={{
          color: 'white',
          display: 'inline',
          marginRight: '25px',
        }}
      >COMPARTILHE:</h4>
       <ShareButton type="facebook" url={window.location.href} />
       <ShareButton type="whatsapp" url={window.location.href} />
       <ShareButton type="twitter" url={window.location.href} text={article.title} />
       <ShareButton type="linkedin" url={window.location.href} />
       <ShareButton type="reddit" url={window.location.href} text={article.title} />
       <ShareButton type="copy" url={window.location.href} />
      </div>
    </div>
  </div>
  );
};

export default Article;
