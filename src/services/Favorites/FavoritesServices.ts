// src/services/favoritesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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