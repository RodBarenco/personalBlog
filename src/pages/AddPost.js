import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

import '../styles/AddPost.css';


function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [keyWords, setKeyWords] = useState('')
  const [selectedColor, setSelectedColor] = useState('#ffffff'); 
  const [image, setImage] = useState(null);
  const postId = uuidv4(); 
  const fileName = `${postId}.jpg`

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleKeyWords = value => {
    setKeyWords(value)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const postsCollectionRef = collection(db, 'posts');
  const storageRef = ref(storage, `/img/${fileName}`);
  const file = image;
  let imageUrl = null;
  let navigate = useNavigate();

  const handlePostClick = async () => {
    if (auth.currentUser === null) {
      console.log('Email não autorizado, apenas o criador desse blog tem permissão para logar');
      Swal.fire({
        icon: 'error',
        title: 'Acesso não autorizado',
        text:
          'Apenas o criador desse blog tem permissão para fazer posts. Caso queira colaborar com postagens entre em contato com ele.',
      });
      navigate('/');
    } else {
      if (file != null) {
      try {
        await uploadBytes(storageRef, file);
        console.log('Upload concluído com sucesso.');
        imageUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Erro no upload:', error);
      }
    }
    const post = {
        title,
        date: Timestamp.now(),
        content,
        color: selectedColor,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid},
        keyWords,
        img : imageUrl,
    
      };
      await addDoc(postsCollectionRef, post);
      navigate('/');
    }
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <div className='imageColorContainer'>
        <h3>Selecione uma imagem:</h3>
          <input className="postImage" type="file" accept="image/*" onChange={handleImageChange} />

          <h3>Selecione uma cor:</h3>
          <input type="color" className="postColor" value={selectedColor} onChange={handleColorChange} />
        </div>
        <h1>Criar um Post</h1>
        <label>Título:</label>
        <ReactQuill className='quill-title' theme="snow" value={title} onChange={handleTitleChange} />
        <label>Post:</label>
        <ReactQuill className='quill-content' theme="snow" value={content} onChange={handleContentChange} />

        <button className="yellowbutton" id='bposter' onClick={handlePostClick}>
          Postar
        </button>
      </div>
      <label>keyWords:</label>
        <ReactQuill className='quill-title' theme="snow" value={keyWords} onChange={handleKeyWords} />
    </div>
  );
}

export default AddPost;
