"use client"

import PHInput from '@/app/components/form/FInput';
import PHForm from '@/app/components/form/From';
import { useChangePasswordMutation } from '@/redux/features/admin/usermanagement.api';
import { logout } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hook';
import { TResponse } from '@/types/global';
import { Button, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const ChangePassword = () => {

   const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const res = (await changePassword(data)) as TResponse<any>;

    console.log(res?.data?.success);

    if (res?.data?.success) {
      dispatch(logout());
      router.push('/login');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password" />
        <PHInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;