"use client"

import PHInput from '@/app/components/form/FInput';
import PHForm from '@/app/components/form/From';
import { useChangePasswordMutation } from '@/redux/features/admin/usermanagement.api';
import { logout, useCurrentToken } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TResponse } from '@/types/global';
import { Button, Row, message } from 'antd';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector(useCurrentToken); // Get token from Redux store

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {

      console.log('data',data)
      const res = (await changePassword({
        data,
        headers: {
          Authorization: `Bearer ${token}` // Include token in headers
        }
      })) as TResponse<any>;

      console.log('res',res)

      console.log('result', res.data.success)
      if (res?.data?.success) {
        message.success('Password changed successfully!');
        dispatch(logout());
        router.push('/login');
      } else {
        message.error(res?.data?.message || 'Failed to change password');
      }
    } catch (err) {
      message.error('An error occurred. Please try again.');
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