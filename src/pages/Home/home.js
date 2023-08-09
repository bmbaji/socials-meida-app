import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";
import { Login } from "../login";


export const Home = () => {
    const [user] = useAuthState(auth)
    const [postsList, setPostList] = useState(null)
    const postsRef = collection(db, "posts")
    const [isUserSignedIn, setIsUserSignedIn] = useState(false)

    const getPosts = async() => {
        const data = await getDocs(postsRef);
        setPostList(data.docs.map((doc) => ({
             ...doc.data(), id: doc.id
             })))
       
    }

    useEffect(() => {
        setIsUserSignedIn(!!user); 
        getPosts();
      }, [user]); 
    
      return (
        <div className="post-container">
          {isUserSignedIn ? (
            postsList?.map((post) => <Post post={post} />)
          ) : (
            <>
            <h1 className="not-signed-in">You need to be signed in to see posts.</h1>
            <div>
            <Login/>
            </div>
           
            </>
            
          )}
        </div>
      );
    };






