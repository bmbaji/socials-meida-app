import React, { useEffect, useState } from "react"
import {yupResolver} from "@hookform/resolvers/yup"
import { db, auth } from "./../config/firebase"
import { doc, addDoc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { async } from "@firebase/util";
export const Profile = () => {
    const [user] = useAuthState(auth);
    const [profilePosts, setProfilePosts] = useState([]);
    const postsProfileRef = collection(db, 'posts');
    const [userPostQuery, setUserPostQuery] = useState(null);
    // const [profileLikes, setProfileLikes] = useState([]);
    // const likesRef = collection(db, "likes")
    // const [likesDocQuery, setLikeDocsQuery] = useState(null)
   
    
   

    

  useEffect(() => {
    // Only create the query when the user is authenticated (user is not null)
    if (user?.uid) {
      const querySnapshot = query(postsProfileRef, where('userId', '==', user.uid));
      setUserPostQuery(querySnapshot);
    //   const likesDoc = query(likesRef, where("userId","==", user.uid))
    //   setLikeDocsQuery(likesDoc)
     
    }
  }, [user]);

  useEffect(() => {
    // Fetch and update the profile posts when the userPostQuery is available
    const getProfilePosts = async () => {
      try {
        if (userPostQuery) {
          const data = await getDocs(userPostQuery);
          const profilePostsData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setProfilePosts(profilePostsData);
        }
      } catch (error) {
        console.log('Error fetching profile posts:', error);
      }
    };

    // const getProfileLikes = async() => {
    //     try{
    //         if (likesDocQuery){
    //             const data = await getDocs(likesDocQuery)
    //             const profileLikesData = data.docs.map((doc) => ({
    //                 ...doc.data(),
    //                 id: doc.id
    //             }))
    //             setProfileLikes(profileLikesData)
    //         }

    //     } catch(error){
    //         console.log('Error fetching profile likes:', error)
    //     }
    // }

    
    // console.log(profileLikes)

   


    getProfilePosts();
  }, [userPostQuery]);





    return(
        <div className="profile">
            <div className="profile-body">
            <h1>Profile: {user?.displayName}</h1>

                <h3>Posts</h3>
                <div>
                {
                    profilePosts && profilePosts.map((profilePostUser) => {
                        return(
                            <div className="profile-post-description-container">
                            
                            <h4 className="post-title">Title: {profilePostUser.title}</h4>
                            <p className="post-description">{profilePostUser.description}</p>
                        
                            </div>
                                
                        
                        )
                    })
                }




                </div>

            </div>

            
    </div>
    )
     }


