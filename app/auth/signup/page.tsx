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

const Signup = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordconfirm: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value || ""});
    };

    const validateForm = () => {
        const { username, email, password, passwordconfirm } = formData;
        if (!username || !email || !password || !passwordconfirm) {
            alert("All fields are required");
            return false;
        }
        if (password !== passwordconfirm) {
            alert("Passwords do not match");
            return false;
        }
        return true;
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/users/signup`, formData, { withCredentials: true });
            const user = response.data.data.user;
            toast.success('Signup successfully');
            dispatch(setAuthUser(user));
            router.push("/auth/verify");
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
                    <div>
                        <label htmlFor='username' className='block mb-2 text-sm font-bold'>Username</label>
                        <input id='username' type='text' name='username' placeholder='Username' value={formData.username||""} onChange={handleChange} className='px-4 py-2 bg-gray-200 rounded-md outline-none w-full' />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='email' className='block mb-2 text-sm font-bold'>Email</label>
                        <input id='email' type='email' name='email' placeholder='Email' value={formData.email||""} onChange={handleChange} className='px-4 py-2 bg-gray-200 rounded-md outline-none w-full' />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='password' className='block mb-2 text-sm font-bold'>Password</label>
                        <input id='password' type='password' name='password' placeholder='Password' value={formData.password ||""} onChange={handleChange} className='px-4 py-2 bg-gray-200 rounded-md outline-none w-full' />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='passwordConfirm' className='block mb-2 text-sm font-bold'>Confirm Password</label>
                        <input id='passwordconfirm' type='password' name='passwordconfirm' placeholder='Confirm Password' value={formData.passwordconfirm ||""} onChange={handleChange} className='px-4 py-2 bg-gray-200 rounded-md outline-none w-full' />
                    </div>
                    {!loading && <Button type='submit' className='mt-6 w-full' size="lg">Submit</Button>}
                    {loading && <Button className="mt-6 w-full flex items-center justify-center" size="lg"><Loader className="animate-spin" /></Button>}
                </form>
                <h1 className='mt-6 text-center'>Already have an account? <Link href='/auth/login'><span className='text-blue-600 cursor-pointer'>Login</span></Link></h1>
            </div>
        </div>
    );
};

export default Signup;
