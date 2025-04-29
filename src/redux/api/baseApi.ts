import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; 
import { setUser } from "../features/auth/authSlice";

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

// 🔥 Intercept & refresh access token
const baseQueryWithRefreshToken = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // try refreshing token
    const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();
    console.log('New token:', data.data);

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      // ✅ Set the new token in redux
      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      // ✅ Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken, // <-- here use baseQueryWithRefreshToken, not baseQuery directly
  endpoints: () => ({}),
});
