import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Porjects';
import AddPost from './pages/AddPost';
import Login from './pages/Login';
import Articles from './pages/Articles';
import Article  from './pages/Article';
import InConstruction from './pages/YetToBuild'
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const mainUser = process.env.REACT_APP_MAIN_USER

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname="/"
    })
  }
   
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
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<InConstruction/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} mainUser={mainUser}/>} />
        <Route path="/about" element={<InConstruction />} />
        <Route path="/contact" element={<InConstruction />}/>
        <Route path="/projects" element={<InConstruction />} />
        {!isAuth ? <Route path="/addpost" element={<Home />}/> : <Route path="/AddPost" element={<AddPost />} />}
        <Route path="/article/:id" element={<Article/>} />
      </Routes>
      <div className='whiteBox'>
        
      </div>
      <footer>
        <div className="footerText">
          &copy; Rodrigo Barenco 2003 - <span id="react-info">Built with React.js</span>
        </div>
     </footer>
    </Router>
  );
}

export default App;