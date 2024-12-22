"use client";

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { API_URL } from '@/server';
import { Loader } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/store/authSlice';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Login = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
       
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value || ""});
    };

   /* const validateForm = () => {
        const { email, password } = formData;
        if (!email || !password) {
            alert("All fields are required");
            return false;
        }
        if (password !== passwordconfirm) {
            alert("Passwords do not match");
            return false;
        }
        return true;
    };*/

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/users/login`, formData, { withCredentials: true });
            const user = response.data.data.user;
            toast.success('login successfully');
            dispatch(setAuthUser(user));
            router.push("/");
           // console.log("User created:", user);
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='shadow-md rounded-lg w-[80%] sm:w-[350px] md:w-[350px] lg:w-[450px] p-8 bg-white'>
                <h1 className='text-center font-bold text-3xl mb-4 mt-4'>MERN</h1>
                <form onSubmit={submitHandler}>
                    <div className='mt-4'>
                        <label htmlFor='email' className='block mb-2 text-sm font-bold'>Email</label>
                        <input id='email' type='email' name='email' placeholder='Email' value={formData.email||""} onChange={handleChange} className='px-4 py-2 bg-gray-200 rounded-md outline-none w-full' />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='password' className='block mb-2 text-sm font-bold'>Password</label>
                        <input id='password' type='password' name='password' placeholder='Password' value={formData.password ||""} onChange={handleChange} className='px-4 py-2 bg-gray-200 rounded-md outline-none w-full' />
                    <Link href="/auth/forgetpassword" className='text-red-500 text-right block text-sm font-semibold mt-2'>forgot password?</Link>
                    </div>
                    {!loading && <Button type='submit' className='mt-6 w-full' size="lg">Submit</Button>}
                    {loading && <Button className="mt-6 w-full flex items-center justify-center" size="lg"><Loader className="animate-spin" /></Button>}
                </form>
                <h1 className='mt-6 text-center'>Don't have an account?{" "} <Link href='/auth/signup'><span className='text-blue-600 cursor-pointer'>Signup</span></Link></h1>
            </div>
        </div>
    );
};

export default Login;