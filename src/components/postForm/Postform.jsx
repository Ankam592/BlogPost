import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fileUpload, deleteFile, updatePost, postPost, filePreview } from "../../appwrite/config";
import { Button } from "../Button";
import Select from "../Select";
import { Input, RTE } from "../../components/Index";


export const Postform = ({ post }) => {

    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues:
        {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })
    const nav = useNavigate();
    const userData = useSelector((state) => {
        console.log(state) 
        return state.auth.userData});
    console.log("userdata is : ", userData);
    console.log("userdata is : ", userData.$id);
    const submit = async (data) => {
        if (post) {
            {
                const file = data.image[0] ? await fileUpload(data.image[0]) : null
                console.log(file)
                if (file) {
                    await deleteFile(post.featuredImage)
                }
                console.log("data is ",data)
                const dbpost = await updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined })
                console.log("post updated",dbpost)
                if (dbpost) {
                    nav(`/post/${dbpost.$id}`)  
                }
            }
        }
        else {
            console.log(data)
            const file = await fileUpload(data.image[0])
            console.log(file)
            if (file) {
                data.featuredImage = file.$id;
                console.log(data, "data")
                const dbpost = await postPost({
                    ...data, userId: userData.$id
                })
                if (dbpost) {
                   // nav('/')
                    nav(`/post/${dbpost.$id}`)
                }
            }
        }
    }
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d]+/g, '-')
        return ''

    }, [])
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name == 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title : "
                    placeholder="Title"
                    className="mb-4"
                    {
                    ...register("title", { required: true })
                    } />
                <Input
                    label="Slug : "
                    placeholder="Slug"
                    className="mb-4"
                    {
                    ...register("slug", { required: true })
                    } />
                <RTE
                    label="Content : "
                    name="content"
                    control={control}
                    defaultValues={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image : "
                    type="file"
                    accept="image/png,image/jpg,image/jpeg,image/gif"
                    className="mb-4"
                    {
                    ...register("image", { required: !post }) // should not post with out this image
                    } />

                {(post) && (<div className="w-full mb-4">
                    <img src={filePreview(post.featuredImage)} alt={post.title} className="rounded-lg" />
                </div>)}
                <Select
                    options={["active", "Inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })} />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>


        </form>
    )

}

export default Postform;
