import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import {auth, provider} from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Login({setIsAuth, mainUser}) {
    let navigate = useNavigate();
    console.log(mainUser)

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) =>{
            const userEmail = result.user.email;

            if (userEmail === mainUser) {
                localStorage.setItem("isAuth", true);
                setIsAuth(true);
                navigate("/")
            } else {
                console.log("Email não autorizado, apenas o criador desse blog tem permissão para logar");
                Swal.fire({
                    icon: 'error',
                    title: 'Acesso não autorizado',
                    text: 'Apenas o criador desse blog tem permissão para logar. Caso queira colaborar com postagens entre em contato com ele.',
                });
                navigate("/")
            }
        })
    }

    return (
        <div className="loginPage">
            <p>Entrar com conta Google</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Entrar com conta Google
            </button>
        </div>
    );
}

export default Login;