import React from "react"
import { useForm } from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc, collection} from "firebase/firestore"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const schema = yup.object().shape({
        title: yup.string().required("You must have a title"),
        description: yup.string().required("You must have a description")
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    })

    const postsRef = collection(db, "posts")

    const onCreatePost = async(data) => {
        await addDoc(postsRef, {
            ...data, 
            username: user?.displayName,
            userId: user?.uid,

        })
        navigate("/")
    }
    return (
        <div className="form-post">
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input className="form-input" placeholder="Title.." {...register("title")}/>
                <p className="form-error-message">{errors.title?.message}</p>
                <textarea className="form-textarea" placeholder="Description.." {...register("description")}/>
                <p className="form-error-message">{errors.description?.message}</p>
                <input className="form-submit" type="submit"/>
            </form>
        </div>
       
    )

}