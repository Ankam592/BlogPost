import React ,{useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import { Container ,Postform} from "../components/Index";
import {updatePost,getPost} from "../appwrite/config"
import { useParams } from "react-router-dom";

const EditPost = ()=>
{
    const [post,setPosts] = useState(null);
    const {slug} = useParams();
    console.log(slug)
    const nav = useNavigate();
    useEffect(()=>
    {
        if(slug)
        {
            getPost(slug).then((post)=>{
                if(post)
                {
                    setPosts(post)
                }
            })
        }
        else
        {
            nav('/')
        }
    },[slug,nav])
     return post ? (
        <div className="py-8">
            <Container>
                <Postform post={post}/>
            </Container>
        </div>
     ):null
}

export default EditPost;