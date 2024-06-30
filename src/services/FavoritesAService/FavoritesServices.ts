// src/services/favoritesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Provides a Redux Toolkit Query API for interacting with the Favorites API of the RealWorld application.
 * 
 * The `favoritesApi` object exposes two mutations:
 * - `useFavoriteArticleMutation`: Allows favoriting an article by its slug.
 * - `useUnfavoriteArticleMutation`: Allows unfavoriting an article by its slug.
 * 
 * These mutations handle the necessary API requests and state management for favoriting and unfavoriting articles.
 */
export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
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
    // Favorite an article endpoint
    favoriteArticle: builder.mutation<{ success: boolean }, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
      }),
      transformResponse: () => ({ success: true }),
    }),

    // Unfavorite an article endpoint
    unfavoriteArticle: builder.mutation<{ success: boolean }, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      transformResponse: () => ({ success: true }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} = favoritesApi;