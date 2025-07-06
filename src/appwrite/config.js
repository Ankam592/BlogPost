import { Client, Databases,Storage , ID, Query } from "appwrite";
import conf from "../conf/conf";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(conf.appwriteProjectId);
const bucket = new Storage(client);
const databases = new Databases(client);

//Create Document
const postPost = async ({title,content,slug,status,userId,featuredImage})=>
    {
        try {
           console.log(title,content,slug,status,conf.appwriteDatabaseId ,conf.appwriteCollectionId, "post")
            const post = await databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,ID.unique(),{
                title,
                content,
                slug,
                status,
                userId,
                featuredImage
            })
            return post
            
        } catch (error) {
            console.log(error)
            
        }
    }
//Update Document
const updatePost = async (slug,{title,content,featuredImage,status})=>
{
    try {
        const updatedPost = await databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
            title,
            content,
            featuredImage,
            status
        })
        return updatedPost
        
    } catch (error) {
        console.log(error)       
    }
}
//Delete Post/Document
const deletePost = async (slug)=>
{
    try {

        await databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        return true
    } catch (error) {
        return false
    }
}

//getPost

const getPost = async (slug)=>
    {
        try {
            return await databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log(error)
        }
    } 

//get Docs/Posts which are active
const AllPosts = async(queries = [Query.equal("status","active")])=>
{
    try {
        console.log("database Id : ",conf.appwriteDatabaseId , "collection Id : ",conf.appwriteCollectionId  , "queires :" , queries   )
        const posts = await databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries) 
        console.log(posts)
        return posts
    } catch (error) {
        console.log("error " + error.message)
    }
}



//File Upload Service

const fileUpload = async (file) => {
    if (!file) {
        console.error("fileUpload: No file provided");
        return false;
    }

    try {
        const uploadedFile = await bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
        return uploadedFile;
    } catch (error) {
        console.error("Appwrite File Upload Error:", error.message || error);
        return false;
    }
};


const deleteFile = async (fileId)=>
{
    try {
        console.log(fileId)
        await bucket.deleteFile(conf.appwriteBucketId,fileId)
        return true;
    } catch (error) {
        console.log(error)
        return false
    }
}

const filePreview = (fileId) => {
    if (!fileId) return '';
    return `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
};


export {filePreview,deleteFile,fileUpload,AllPosts,getPost,deletePost,updatePost,postPost};;