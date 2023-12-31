import React, { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import '../styles/Articles.css';

function Articles({ postList }) {
  let navigate = useNavigate();
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [searchText, setSearchText] = useState("");

  return (
    <div className='postContainerWrapper'>
      <div className="searchBar"> Pesquise por um tema
        <input
          type="text"
          placeholder="escreva aqui..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="yellowbutton" onClick={() => setSearchText("")}>Limpar</button>
      </div>

      <div className="postContainerArticles">
        <div className="postsFromArticles">
          {postList
            .filter((post) => {
              // all articles
              if (searchText === "") {
                return true;
              }
              // articles with key words
              const strWords = post.keyWords;
              const keywordArray = strWords.split(', ').map(word => word.toLowerCase());
              return keywordArray.some(keyword => keyword.toLowerCase().includes(searchText.toLowerCase()));
            })
            .sort((a, b) => (b.date && a.date ? b.date.seconds - a.date.seconds : 0))
            .map((post) => {
              const postDate = post.date ? new Date(post.date.seconds * 1000) : null;
              const postTitle = post.title ? post.title : null;
              const postColor = post.color ? post.color : null;

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
                <div className="postArticles"
                  key={post.id}
                  onMouseEnter={() => styleHandlerIn()}
                  onMouseLeave={() => styleHandlerOut()}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(5, 5, 8, 0.915)',
                    marginBottom: '14px',
                    padding: '5px',
                    filter: `drop-shadow(0 -0.3mm 1mm ${
                      hoveredPostId === post.id ? postColor : 'transparent'
                    })`,
                    transition: "filter 1.8s ease-in-out",
                  }}
                >
                  <div
                    className="postTitleFromArticles"
                    style={{ padding: '8px', marginBottom: '5px' }}
                  >
                    <h2>{parse(DOMPurify.sanitize(postTitle, { USE_PROFILES: { html: true } }))}</h2>
                  </div>
                  {postDate && (
                    <div className="postDate">
                      {postDate.toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </div>
                  )}
                  <span
                    className="expand-text"
                    onClick={() => navigate(`/article/${post.id}`)}
                    style={{ cursor: 'pointer', marginRight:'10px' }}
                  >
                    <i className="fa fa-search" />
                  </span>
                </div>
              )
            })
          }
          {postList.length > 0 &&
            postList
              .filter((post) => {
                const strWords = post.keyWords;
                const keywordArray = strWords.split(', ').map(word => word.toLowerCase());
                return keywordArray.some(keyword => keyword.toLowerCase().includes(searchText.toLowerCase()));
              }).length === 0 && (
                <div>Nenhum artigo encontrado.</div>
              )}
        </div>
      </div>
    </div>
  )
}

export default Articles;
