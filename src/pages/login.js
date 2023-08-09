import React from "react";
import { auth, provider } from "../config/firebase";
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const navigate = useNavigate()
    const signInWithGoogle =  async () => {
       const result = await signInWithPopup(auth, provider)
       navigate("/")
    }
    return(
        <div className="login-body">
            <div>
            <div className="login-body-container">
            
            <p>Sign in with <span className="google-logo">
                <span>G</span>
                <span>o</span>
                <span>o</span>
                <span>g</span>
                <span>l</span>
                <span>e</span>
                </span>
                </p>
            <button onClick={signInWithGoogle}>Sign In </button>

            </div>
           

            </div>
            
        </div>
    )
}


