import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from './Button';
import { Input, Logo } from "./index";
import { loginuser, getCurrentUser } from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { login_user } from "../store/authSlice"


export const Login = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const login = async (data) => {
        setError("");
        try {
            const session = await loginuser(data.email, data.password);
            if (session) {
                console.log("session in login page - ", session)
                const userData = await getCurrentUser();
                console.log(userData, "userdata in login page from getuser fn")
                if (userData) {
                   // const authStatus = useSelector(state => state.auth.status)
                  //  console.log(authStatus)
                    dispatch(login_user(userData));
                    nav("/");
                }
            }
            else {
                console.log('Please SignUp first!')
                setError('please create an account!')
            }
        } catch (error) {
            setError(error);
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black`}>
                <div className="mb-2 flex justify-center ">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="w-20" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold  leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don't have any Account
                    <Link to="/signup" className="ml-2 font-medium text-primary transition-all duration-400 hover:underline">
                        SignUp
                    </Link>
                </p>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)}
                    className="mt-8">
                    <div className="space-y-5">
                        <Input label='Email :'
                            placeholder='Enter your email'
                            type='email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\S+@\S+\.\S+$/.test(value) || "Email address must be a valid Address"

                                }
                            })}
                        />
                        <Input type="password"
                            label="Password : "
                            placeholder="Enter Password"
                            {...register('password',
                                {
                                    required: true,
                                    // validate:
                                    // {
                                    //     matchPattern: (value) => /^(?=.*"[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value) || "Password must be valid"
                                    // }
                                }
                            )}
                        />
                        <Button type="submit" className="w-full">Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}



