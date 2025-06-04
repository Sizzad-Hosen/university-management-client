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



const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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

    console.log('res',res)
    console.log('user',user)

      dispatch(setUser({ user, token: res.data.accessToken }));

      toast.success('Logged in', { id: toastId });

      if(res?.data?.needsPasswordChange)
      {
        router.push("/change-password")
      }
      else{

        router.push(`/${user.role}/dashboard`);
      }

      
    } catch (err) {
      toast.error('Login failed', { id: toastId });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">

      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>

        <PHInput type="text" name="userId" label="ID:" />
        <PHInput type="password" name="password" label="Password:" />

        <Button htmlType="submit" className="mt-4">
          Login
        </Button>

      </PHForm>


    </div>
  );
};

export default Login;
