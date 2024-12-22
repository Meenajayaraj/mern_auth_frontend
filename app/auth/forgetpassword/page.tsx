"use client"
import { Button } from '@/components/ui/button';
import { API_URL } from '@/server';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/users/forgot-password`, { email }, { withCredentials: true });
      toast.success("Reset code send to your email");
      router.push(`/auth/resetpassword?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col'>
      <h1 className='text-xl text-gray-900 mb-4 font-medium'>Enter Your Email to otp for reset password</h1>
      <input type='email'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        className='block w-[40%] mb-4 mx-auto rounded-lg bg-gray-300 px-4 py-3' />
      {!loading && <Button onClick={handleSubmit}>Submit</Button>}
      {loading && <Button><Loader className='animate-spin' /></Button>}
    </div>
  )
}

export default ForgotPassword;