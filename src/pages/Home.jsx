import React, { useEffect, useState } from "react";
import { AllPosts } from "../appwrite/config";
import { Container, PostCard } from "../components/Index";


function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        AllPosts().then((posts) => {
            console.log(posts)
            if (posts) {
                setPosts(posts.documents)
            }

        })
    }, [])
    if (posts.length == 0) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">No Posts to show</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post) =>
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post}>
                                </PostCard>
                            </div>
                        )}
                    </div>
                </Container>
            </div>)

    }

}

export default Home;