"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store"; // Ensure this path correctly points to your store definition
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { API_URL } from "@/server";
import { setAuthUser } from "@/store/authSlice";
import { toast } from "sonner";

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
      dispatch(setAuthUser(null));
      toast.success("Logout Successful");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout Failed. Please try again.");
    }
  };

  const renderUserActions = () => (
    <div className="flex items-center space-x-2">
      <Avatar onClick={logoutHandler} className="cursor-pointer">
        <AvatarFallback className="font-bold uppercase">
          {user?.username?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
      <Button>Dashboard</Button>
      <Button variant="ghost" size="sm">
        {user?.isVerified ? "Verified" : "Not Verified"}
      </Button>
    </div>
  );

  return (
    <div className="h-[12vh] shadow-md">
      <div className="w-[80%] mx-auto flex items-center justify-between h-full">
        <h1 className="text-3xl font-bold uppercase">Capstone</h1>
        {!user ? (
          <Link href="/auth/signup">
            <Button size="lg">Register</Button>
          </Link>
        ) : (
          renderUserActions()
        )}
      </div>
      <h1 className="flex items-center justify-center h-[80vh] text-5xl font-bold">
        MERN Auth Home Page
      </h1>
    </div>
  );
};

export default HomePage;
