"use client";

import { useLoginMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch } from '@/redux/hook';
import {  setUser } from '@/redux/features/auth/authSlice'; // Ensure it's correctly imported
import { verifyToken } from '@/utils/verifyToken';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [user, setUserState] = useState<{ id: string; password: string }>({ id: '', password: '' });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserState(prev => ({
      ...prev,
      [name]: value,
    }));
  };
const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await login(user).unwrap();
    const decodedUser = verifyToken(res.data.accessToken);
    console.log('Decoded User:', decodedUser);

    // Dispatch to redux
    dispatch(setUser({ user: decodedUser, token: res.data.accessToken }));
    
    
    if (decodedUser?.role) {
      router.push(`/${decodedUser.role}/dashboard`);
    } else {
      console.error('Role not found in token');
    }
    
    console.log('Login successful:', res);
  } catch (err) {
    console.error('Login failed:', err);
  }
};


  // Reset ID and Password
  const resetId = () => setUserState(prev => ({ ...prev, id: '' }));
  const resetPassword = () => setUserState(prev => ({ ...prev, password: '' }));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700 font-medium mb-2">ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={user.id}
              onChange={handleChange}
              placeholder="Enter your ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <button type="button" onClick={resetId} className="text-blue-500 hover:underline text-sm">
              Reset ID
            </button>
            <button type="button" onClick={resetPassword} className="text-blue-500 hover:underline text-sm">
              Reset Password
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
