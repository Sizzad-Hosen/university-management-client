"use client"

import PHInput from '@/app/components/form/FInput';
import PHForm from '@/app/components/form/From';
import { useChangePasswordMutation } from '@/redux/features/admin/usermanagement.api';
import { logout,selectCurrentToken } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TResponse } from '@/types/global';
import { compose } from '@reduxjs/toolkit';
import { Button, Row, message } from 'antd';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler } from 'react-hook-form';
  

const ChangePassword = () => {

  const [changePassword] = useChangePasswordMutation();

  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const token = useAppSelector(selectCurrentToken); // Get token from Redux store

  console.log('token',token)



const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  try {
    console.log('data',data)

    const result = await changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    }).unwrap();

    console.log('result',result)

    if (result.success) {
      message.success('Password changed!');
      dispatch(logout());
      router.push('/login');
    }
  } catch (err) {
    console.error('Full error:', err);
    message.error(
      err.data?.message || 
      err.error || 
      'Password change failed'
    );
  }
};

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="password" name="oldPassword" label="Old Password" />
        <PHInput type="password" name="newPassword" label="New Password" />
        <Button htmlType="submit">Change Password</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;