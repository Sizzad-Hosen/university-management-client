'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentToken } from '@/redux/features/auth/authSlice';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter();

  const { token } = useCurrentToken();


  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
