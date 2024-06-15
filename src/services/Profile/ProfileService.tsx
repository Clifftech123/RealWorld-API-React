// src/services/profileApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserProfileInterface } from '../../Interface/profile/UserProfile.Interface';

export const profileApi = createApi({
  reducerPath: 'profileApi',
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
  endpoints: (builder) => ({
    // Get a profile endpoint to get a user's profile.
    getProfile: builder.query<UserProfileInterface, string>({
      query: (username) => `profiles/${username}`,
    }),

    // Follow a user endpoint to follow a user.
    followUser: builder.mutation<UserProfileInterface, string>({
      query: (username) => ({
        url: `profiles/${username}/follow`,
        method: 'POST',
      }),
    }),

     //   Unfollow a user endpoint to unfollow a user.
    unfollowUser: builder.mutation<UserProfileInterface, string>({
      query: (username) => ({
        url: `profiles/${username}/follow`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = profileApi;