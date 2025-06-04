import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; 
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Use baseQuery instead of fetch for consistency
    const refreshResult = await baseQuery(
      { url: '/auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { data } = refreshResult.data as { data?: { accessToken: string } };
      
      if (data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
        
        api.dispatch(
          setUser({
            user,
            token: data.accessToken,
          })
        );

        // Retry original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['AcademicSemester','semester','courses','faculty'], // Add relevant tag types
  endpoints: () => ({}),
});