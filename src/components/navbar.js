import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "../pages/Home/home";
import { auth } from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faSquarePlus, faUser, faArrowRightToBracket, icon } from '@fortawesome/free-solid-svg-icons'



export const Navbar = () => {
    const [user] = useAuthState(auth)
    const houseIcon = <FontAwesomeIcon className="fontIcon" icon={faHouse} />
    const addPostIcon = <FontAwesomeIcon className = "fontIcon"  icon={faSquarePlus} />
    const userIcon = <FontAwesomeIcon   className = "fontIcon" icon={faUser} />
    const signInIcon = <FontAwesomeIcon className = "fontIcon"  icon={faArrowRightToBracket} />


    const signUserOut = async() => {
        await signOut(auth)
        window.location.href="/"

    }
    return(
        <div className="navbar-container">

       

        <div className="navbar">
            <img className="navbarLogo" src={"./askfm.png"}/>
            
                    <div className="link">
                    <Link to="/">{houseIcon}</Link>
                    <p>Home</p>
                    </div>
                 
                    {!user?
                    <>
                    <div className="link">
                    <Link to="/login">{signInIcon}</Link> 
                    <p>Sign In</p> 
                    </div>
                  
                    
                    </>
               
                    :<>
                    <div className="link">
                    <Link to="/createPost">{addPostIcon}</Link>
                    <p>Add Post</p>
                    </div>
                   
                    <div className="link">
                    <Link to = "/profile">{userIcon}</Link>
                    <p>Profile</p>
                    </div>
                 
                    <div className="link">
                    <Link onClick={signUserOut}> {signInIcon}</Link>
                    <p>Sign Out</p>
                    </div>
                   
                    </>}
  
           
        </div>
        <div className="nav-user-container">
                {user && (
                    <>
                    <div className="nav-user">
                    
                        <p>{user?.displayName}</p>
                        <img src={user?.photoURL ||""} width="100" height="100" />

                    </div>
                    </>
                )}
        </div>


        </div>
    )
}