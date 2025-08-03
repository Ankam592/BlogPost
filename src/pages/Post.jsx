import React, { useEffect, useState } from "react";
import { getPost, deletePost, deleteFile, filePreview } from "../appwrite/config";
import { useSelector } from "react-redux";
import { Container } from "../components/Index";
import { Button } from "../components/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const nav = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const Isauthor = post && userData ? post.userId === userData.$id : false;
    useEffect(() => {
        if (slug) {
            getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            })
        }
    }, [nav, slug])

    const deletepost = async () => {
        const Isdeleted = await deletePost(post.$id);
        if (Isdeleted) {
            deleteFile(post.featuredImage);
            nav("/");
        }
    }

    return post ? (

        <div className="py-8">
            <Container>
                <div className="w-full flex-justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={filePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full"
                    />
                    {Isauthor &&
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500"
                                className="mr-3">
                                Edit
                            </Button>
                            <Button
                                onClick={deletepost}
                                bgColor="bg-green-500"
                                className="mr-3">
                                Delete
                            </Button>
                        </Link>
                    </div> }
                    
                </div>
                <div className="w-full mb-6">
                  {post.title}  
                </div>
                <div className="browser-css ">
                        {post.content}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post;