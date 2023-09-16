import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { doc, getDoc} from 'firebase/firestore'; 
import { db} from '../firebase-config';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import '../styles/Article.css';

const Article = () => {
  const { id } = useParams();
  console.log(id)
  const [article, setArticle] = useState({}); 
  
  const fetchArticle = async () => {
    try {
      const articleRef = doc(db, 'posts', id);
      const articleDoc = await getDoc(articleRef);
      if (articleDoc.exists()) {
        const articleData = articleDoc.data();
        if (articleData) {
          const { title, content} = articleData;
          setArticle({
            title,
            content,
          });
          console.log(title)
        } else {
          console.log('Dados do artigo em formato incorreto');
        }
      } else {
        console.log('Artigo não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar o artigo:', error);
    }
  };

 
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticle();
  }, [id]);

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
