import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import Home from "./pages/Home";
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Porjects';
import AddPost from './pages/AddPost';
import Login from './pages/Login';
import Articles from './pages/Articles';
import Article  from './pages/Article';
import InConstruction from './pages/YetToBuild'
import Cards from './components/Cards'
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';


function App() {
  const [isAuth, setIsAuth] = useState(false);

  //who can login
  const mainUser = process.env.REACT_APP_MAIN_USER;
  
  // email js config
  const e1 = process.env.REACT_APP_E1;
  const e2 = process.env.REACT_APP_E2;
  const e3 = process.env.REACT_APP_E3;
  
  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname="/"
    })
  }
  
  // posts are used in more than one page, so it ca get all of then to avoid unnecessary queries
  // get all posted articles
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

   useEffect(() => {
      const getPosts = async () => {
          const data = await getDocs(postCollectionRef);
           setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
       };
       getPosts();
   },[]);

  //find a post by id
  const getArticleById = (articleId) => {
    return postList.find((post) => post.id === articleId);
  };

//-----------------------------------------------------------------------------------------
    
  return (
    <Router>
      <nav>
        <Link to="/">Página Inicial</Link>
        <Link to="/about">Sobre mim</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/articles">Artigos</Link>
        {!isAuth ? (<></>) : ( <Link to="/addpost">Criar Post</Link>)}
        <Link to="/projects">Meus projetos</Link>
        {!isAuth ? (
          <Link to="/login">Entrar</Link>
        ) : (
          <button className='yellowbutton' onClick={handleLogout}>Sair</button>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home postList={postList}/>} />
        <Route path="/articles" element={<Articles postList={postList}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} mainUser={mainUser}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact e1={e1} e2={e2} e3={e3}/>}/>
        <Route path="/projects" element={<Projects />} />
        {!isAuth ? <Route path="/addpost" element={<Home />}/> : <Route path="/AddPost" element={<AddPost />} />}
        <Route path="/article/:id" element={<Article getArticleById={getArticleById}/>} />
      </Routes>
    
      <div>
       {/* Outro conteúdo */}
        <Cards />
       {/* Mais conteúdo */}
    </div>
        
      <footer>
        <div className="footerText">
          &copy; Rodrigo Barenco 2023 - <span id="react-info">Built with React.js</span>
        </div>
     </footer>
    </Router>
  );
}

export default App;

