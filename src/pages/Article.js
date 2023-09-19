import React from 'react';
import { useParams } from 'react-router-dom'; 
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import '../styles/Article.css';

const Article = ({getArticleById}) => {

  const { id } = useParams();
  const article = getArticleById(id);
  console.log(article);
 if (!article) {
    return <div>Carregando...</div>;
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
    </div>
  );
};

export default Article;
