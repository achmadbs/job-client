import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) navigate("/home");
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return axios.post("/api/v1/auth", { email, password });
    },
    onSuccess: (response) => {
      Cookies.set("token", response.data.data.accessToken);
      navigate("/home");
    },
  });

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='bg-white px-10 py-8 rounded-lg shadow-lg min-w-[24rem]'>
        <h2 className='text-2xl font-bold mb-5'>Login</h2>
        <div className='mb-5'>
          <label htmlFor='email' className='block font-medium mb-1'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='password' className='block font-medium mb-1'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded-md w-full'>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
