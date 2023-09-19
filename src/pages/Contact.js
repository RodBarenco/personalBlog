import React, { useEffect, useRef, useState} from "react";
import emailjs from '@emailjs/browser'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Waveform } from '@uiball/loaders';
import '../styles/Contact.css';


function Contact({ e1, e2, e3 }) {
    const [showPage, setShowPage] = useState(false);
       
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPage(true);
        }, 1200);
    
        return () => clearTimeout(timer);
      }, []);

        
      const form = useRef()
        const sendEmail = (e) => {
          e.preventDefault();
      
          emailjs.sendForm(e1, e2, form.current, e3).then(
                () => {
                      alert('Mensagem enviada com sucesso!')
                      window.location.reload(false)
                    },
                    () => {
                      alert('Falha no envio, tente novamente!')
                    }
                  )};
      
    return (  
         <div className='contact-wrapper'>

         {
           !showPage ? (
            <div className="loader-container">
               <Waveform size={150} color="yellow" className="load"></Waveform>
            </div>
           ) :
           
           (<>
            <div className='text-zone'>
                <h1>
                    Entre em contato
                </h1>
                <h3>
                  Procuro oportunidades como freelancer, e em projetos com os quais eu possa colaborar e 
                  me desenvolver como profissional</h3>
                  <p>
                    Sinta-se à vontade para entrar em contato.
                  </p>

                <div className='contact-form'>
                 <form ref={form} onSubmit ={sendEmail}>
                    <ul>
                        <li className='half'>
                            <input type='text' name='name'      placeholder='nome'         required />
                        </li>
                        <li className='half'>
                            <input type='text' name='email'     placeholder='email'        required />
                        </li>
                        <li>
                            <input type='text' name='subject'   placeholder='assunto'   required/>
                        </li>
                        <li>
                            <textarea          name='message'   placeholder='Mensagem...'      required />
                        </li>
                        <li>
                            <input type='submit' className='flat-button' value='send' />
                        </li>
                    </ul>
                 </form>
                </div>
            </div>

            <div className='info-map'>
              <div className='text-map'>
              Rodrigo Barenco,
              <br/>
              Rio de janeiro, RJ - Brasil
              <br />
              Rua Henrique Ferreira, Bento Ribeiro 
              <br/>
              cep - 21550-290
              <br/>
              <span>rodrigobarenco@hotmail.com</span>
            </div>
            </div>
            <div className='map-wrap'>
              <MapContainer center={[-22.8624460, -43.3536702]} zoom={15}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[-22.8624460, -43.3536702]}>
                <Popup>Minha localidade!</Popup>
              </Marker>
            </MapContainer>
            </div>
  
         </> 
           )} 
    </div> 
            
    )
}


export default Contact;