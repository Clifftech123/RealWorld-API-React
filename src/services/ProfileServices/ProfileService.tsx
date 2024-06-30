// src/services/profileApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserProfileInterface } from '../../Interface/profile/UserProfile.Interface';

/**
 * Provides a Redux Toolkit API for interacting with a user's profile data.
 * 
 * The `profileApi` object exposes the following endpoints:
 * 
 * - `useGetProfileQuery`: Fetches a user's profile data given a username.
 * - `useFollowUserMutation`: Follows a user given a username.
 * - `useUnfollowUserMutation`: Unfollows a user given a username.
 * 
 * These endpoints use the `@reduxjs/toolkit/query/react` library to handle the API calls and state management.
 * 
 * The API is configured to use the `https://api.realworld.io/api/` base URL, and includes an authorization header with a token stored in local storage, if available.
 */
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