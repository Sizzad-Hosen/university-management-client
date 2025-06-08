'use client';

import { Button } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { verifyToken } from '@/utils/verifyToken';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hook';
import { setUser, TUser } from '@/redux/features/auth/authSlice';
import PHForm from '../components/form/From';
import PHInput from '../components/form/FInput';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const defaultValues = {
    userId: 'A-0002',
    password: 'admin123',
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging in...');

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success('Logged in', { id: toastId });

      if(res?.data?.needsPasswordChange) {
        router.push("/change-password");
      } else {
        router.push(`/${user.role}/dashboard`);
      }
    } catch (err) {
      toast.error('Login failed', { id: toastId });
    }
  };

  return (

 <div className="relative min-h-screen w-full">
  <div className="absolute inset-0 z-0">
    <img
      src="https://b.bssnews.net/assets/news_photos/2025/04/13/image-262897-1744558500.jpg"
      alt="Background"
      className="object-cover w-full h-full"
    />
    <div className="absolute backdrop-blur-sm "></div>
  </div>


      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md px-8 py-10   border-blue-500 bg-white bg-opacity-90 rounded-2xl shadow-xl backdrop-blur-sm border border-opacity-20 "
        >
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              Welcome Back
            </motion.h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>

          <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <PHInput 
                type="text" 
                name="userId" 
                label="ID:" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white bg-opacity-70"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <PHInput 
                type="password" 
                name="password" 
                label="Password:" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white bg-opacity-70"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <Button 
                htmlType="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <motion.span
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  Login →
                </motion.span>
              </Button>
            </motion.div>
          </PHForm>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center text-sm text-gray-600"
          >
            <p>Don't have an account? <a href="#" className="text-blue-600 hover:underline font-medium">Contact admin</a></p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;