import { React, useState } from 'react';
import { createUser, getCurrentUser } from '../appwrite/auth';
import { login_user } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input} from './index';
import { Button } from './Button';
import { Logo } from './index';


export const SignUp = ()=> {
    const [error, setError] = useState("");
    
        const dispatch = useDispatch();
        const nav= useNavigate();
        const { register, handleSubmit } = useForm();

        const signup = async (data) => {
            try {
            const newUser = await createUser(data.email,data.password);
            if (newUser) {
                const User = await getCurrentUser();
                if (User) {
                    dispatch(login_user(User));
                    nav("/");
                }
            }
        }

     catch (error)
    {
        setError(error.message);
    }
}

    return (
        <div className='flex items-center justify-center w-full'>
                   <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black`}>
                       <div className="mb-2 flex justify-center ">
                           <span className="inline-block w-full max-w-[100px]">
                               <Logo width="100%"/>
                           </span>
                       </div>
                       <h2 className="text-center text-2xl font-bold  leading-tight">Sign in to your account</h2>
                       <p className="mt-2 text-center text-base text-black/60">
                       Already have an account
                       <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
                       Login
                       </Link>
                       </p>
                       {error && <p className="text-red-500 text-center">{error}</p>}
                       <form onSubmit={handleSubmit(signup)}
                       className="mt-8">
                           <div className="space-y-5">
                            <Input label='FullName :'
                                   placeholder='Enter Full Name'
                                   type='text'
                                   {...register('fullname',{
                                    required : true
                                   })}
                            />
                               <Input label='Email :'
                                      placeholder = 'Enter your email'
                                      type = 'email'
                                      {...register('email',{
                                       required : true,
                                       validate : {
                                           matchPattern : (value)=> /^\S+@\S+\.\S+$/.test(value) || "Email address must be a valid Address" 
       
                                      }})} 
                               />
                               <Input type="password"
                                      label= "Password"
                                      placeholder = "Enter Password" 
                                      {...register('password',
                                       {
                                           required : true,
                                        //    validate :
                                        //    {
                                        //        matchPattern : (value) => /^(?=.*"[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value) || "Password must be valid"
                                        //    }
                                       }
                                      )}
                                      />
                                      <Button type="Submit" className="w-full">Sign Up</Button>
                           </div>
                       </form>
                   </div>
               </div>
    )
}

