"use client"
import { logout, useCurrentToken } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { verifyToken } from '@/utils/verifyToken';
import Link from 'next/link';
import { ReactNode } from 'react';

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {

  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Link href="/login" replace={true} />;
  }
  if (!token) {
    return <Link href="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;