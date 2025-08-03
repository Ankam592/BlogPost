import React, { useEffect } from "react";
import { AllPosts } from "../appwrite/config";
import { Container,PostCard } from "../components/Index";
import { useState } from "react";


const AllPostsPage = () => {
    const [posts, setPost] = useState([]);
        useEffect(() => {
            AllPosts().then((posts) => {
                console.log(posts , "possts")
                if (posts) {
                    setPost(posts.documents);
                }
            })  
        },[])
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                     { console.log(posts.length , "length")}
                    {posts.map((post)=>{  
                        console.log(post)
                       return <div key={post.$id} className="p-2 w-1/4">
                         <PostCard {...post}>   
                            {/* {...post } -> will spread all the props  */}
                         </PostCard>
                         </div>}
                    )}
                </div>
            </Container>
        </div>
    )
}

export default AllPostsPage;