import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginUserType, UserType } from '../../types/User';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_API }),
  endpoints: builder => ({
    authenticateUser: builder.query<UserType[], LoginUserType>({
      query: ({ email, password }: LoginUserType) =>
        `/users?email=${email}&password=${password}`,
    }),
  }),
});

export const { useLazyAuthenticateUserQuery } = loginApi;
