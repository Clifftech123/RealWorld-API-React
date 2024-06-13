import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Adjusted User interface
interface User {
  [x: string]: any;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  token?: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.realworld.io/api/',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation<User, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: credentials },
      }),
    }),
    registerUser: builder.mutation<User, { username: string; email: string; password: string }>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: { user: newUser },
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => 'user',
    }),
    updateUser: builder.mutation<User, { email?: string; password?: string; username?: string; bio?: string; image?: string }>({
      query: (updatedInfo) => ({
        url: 'user',
        method: 'PUT',
        body: { user: updatedInfo },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} = userApi;