import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserResponse, UserServiceInterface } from '../../Interface/User/User.Interface';



// userApi: Defines API service for user-related operations using Redux Toolkit Query.
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.realworld.io/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // Define the tagTypes property to specify the type of data returned by the endpoints.
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserServiceInterface, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: credentials },
      }),
    }),

     // Define the registerUser endpoint to register a new user.
    registerUser: builder.mutation<UserServiceInterface, { username: string; email: string; password: string }>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: { user: newUser },
      }),
    }),

    // Define the getCurrentUser endpoint to get the current user's information.
    getCurrentUser: builder.query< UserResponse, void>({
      query: () => 'user',
    }),

    // Define the updateUser endpoint to update the user's information.
    updateUser: builder.mutation<UserServiceInterface, { email?: string; password?: string; username?: string; bio?: string; image?: string }>({
      query: (updatedInfo) => ({
        url: 'user',
        method: 'PUT',
        body: { user: updatedInfo },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} = userApi;