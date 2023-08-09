import React, { useEffect, useState } from "react"
import {yupResolver} from "@hookform/resolvers/yup"
import { db, auth } from "../../config/firebase"
import { doc, addDoc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { async } from "@firebase/util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export const Post = (props) => {
 

   const {post} = props
   const [user] = useAuthState(auth)
   const [likes, setLikes] = useState(null)
   const likesRef = collection(db, "likes")
   const likesDoc = query(likesRef, where("postId","==", post.id))
   const heart = <FontAwesomeIcon icon={faHeart} style={{color: "#fff",}} />
   const likedHeart = <FontAwesomeIcon icon={faHeart} style={{color: "#f40101",}} />
   const commentIcon = <FontAwesomeIcon icon={faComment} style={{color: "#fff",}} />
   const submitCommentIcon = <FontAwesomeIcon icon={faPaperPlane} style={{color: "#fff",}} />

   const getLikes =  async() => {
    const data = await getDocs(likesDoc)
    setLikes(data.docs.map((doc) => ({
        userId: doc.data().userId,
        likeId: doc.id
    })))
   }

   const addLike = async() => {
    try{
        const newDoc = await addDoc(likesRef, {
            userId: user.uid,
            postId: post.id
  
         })
         if (user) {
              setLikes((prev) =>prev? [...prev, {userId: user.uid, likeId: newDoc.id}]
              : [{userId: user.uid, likeId: newDoc.id}] )
         }
         
     }
     catch(error){
        console.log('Error adding document:', error);
     }
    }

    const removeLike = async() => {
        try{
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId","==",user?.uid)
            )

            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db, "likes", likeId)
            await deleteDoc(likeToDelete)
             if (user) {
                  setLikes((prev) => 
                  prev.filter((like) => like.likeId !== likeId )
             )}
             
         }
         catch(error){
            console.log('Error removing document:', error);
         }
    
        }

    useEffect(() => {
        getLikes();
    },[]);

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

//     const [textboxOpen, setTextboxOpen] = useState(false)
//     const [usercomment, setUserComment] = useState("")
//     const [comments, setComments] = useState([])
//     const commentCollectionRef = collection(db, "comments")

   
//     useEffect(() => {
//         const getComments = async() => {
//             try{
//                 const data = await getDocs(commentCollectionRef)
//                 const filteredComments = data.docs.map((doc) => ({
//                     ...doc.data(),id: doc.id
              
                    
    
//                 }))
//                 console.log(filteredComments)
//             } catch {
//                 console.log("Error getting comments")
//             }
//         }
//         getComments()
//        }, [])
    
//        const onSubmitComment = async() => {
//         try{
//             await addDoc(commentCollectionRef, {
//                 comment: usercomment,
//                 postId: post.id,
                
//             })  
//         } catch{
//             console.log("Error adding the data ")
//         }
       
  
//    }


// Your component code...


  const [textboxOpen, setTextboxOpen] = useState(false);
  const [usercomment, setUserComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false)
  
  const commentCollectionRef = collection(db, 'comments');
//   const commentsDoc = query(likesRef, where("postId","==", post.id))

  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await getDocs(commentCollectionRef);
        const fetchedComments = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setComments(fetchedComments); // Update the comments state with the fetched comments
      } catch (error) {
        console.log('Error getting comments:', error);
      }
    };
    getComments();
  }, []);

  const onSubmitComment = async () => {
    try {
      await addDoc(commentCollectionRef, {
        comment: usercomment,
        postId: post.id,
      });

      // After adding the comment successfully, update the comments state with the new comment
      setComments([...comments, { comment: usercomment, postId: post.id }]);
      setUserComment(''); // Clear the input field after submitting the comment
    } catch (error) {
      console.log('Error adding the data:', error);
    }
  };

  // Your JSX code...


    const textbox = () => {
      setTextboxOpen((prev) => !prev)
    }

    const numberOfComments = (id) => {
        const dataComments = comments.filter((comment) => comment?.postId === post.id )
        return dataComments.length
        
    }

    const showCommnetsBool = () => {
        setShowComments((prev) => !prev)
    }


    // const showAllComments = (id) =>{
        const dataComments = comments.filter((comment) => comment?.postId === post.id )
        const allComments = []
        const commentsPara = dataComments.map((comment) => {
        const eachComemnt = comment.comment
        allComments.push(eachComemnt)
        })


    // }



    
  
   
    return (
        <div className="post">
            <div className="post-content">
              <div className="post-description-container">
              <h2>{user.displayName}</h2>
              <p className="post-title">Title: {post.title}</p>
              <p className="post-description">{post.description}</p>
             
              </div>
  
            <div className="post-footer">
                <p>@{post.username}</p>
                <button onClick={hasUserLiked? removeLike : addLike}> {hasUserLiked ?   likedHeart : heart }  </button>
                {likes && <p>Likes: {likes.length}</p>} 
                <button onClick={textbox}>{commentIcon}</button>
           
               
                <p>Comments: {numberOfComments(post.id)}</p>
            </div>
            <div className="user-comment" style={{display: textboxOpen ? "block" : "none"}}>
                  
                    <input
                   placeholder="Add comment..."
                   value = {usercomment}
                   onChange={(e)=>setUserComment(e.target.value)}
                   ></input>
                   <button onClick={onSubmitComment}>{submitCommentIcon}</button>
                </div>
            <div className="comments-container">
              
              <button onClick={showCommnetsBool}>Show Comments</button>
              <div className="comments-text-container" style={{display: showComments ? "block" : "none"}}>
                  {
                      allComments && allComments.map((comment) => {
                          return(
                              <p className="posted-comment">{comment}</p>
                          )
                      })
                  }
              </div>
            </div>
            </div>
            
        </div>
        
    )
}