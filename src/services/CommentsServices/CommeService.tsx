// src/services/commentApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommentInterface,  CommentsArrayInterface,  CreateCommentPayloadInterface } from '../../Interface/Comment/Comment.Interface';



/**
 * Provides a set of API endpoints for managing comments on articles.
 * 
 * The `commentApi` object is a Redux Toolkit Query API that handles the following operations:
 * - Fetching comments for a specific article
 * - Creating a new comment for a specific article
 * - Deleting a comment for a specific article
 * 
 * The API uses the `fetchBaseQuery` function to make HTTP requests to the `https://api.realworld.io/api/` base URL, and includes the user's authentication token in the request headers if available.
 * 
 * The API exposes the following endpoints:
 * - `getComments`: Fetches the comments for a specific article, identified by its slug.
 * - `createComment`: Creates a new comment for a specific article, identified by its slug, with the provided payload.
 * - `deleteComment`: Deletes a specific comment for a specific article, identified by its slug and comment ID.
 * 
 * The API also exports hooks that can be used in functional components to interact with the API, such as `useGetCommentsQuery`, `useCreateCommentMutation`, and `useDeleteCommentMutation`.
 */
export const commentApi = createApi({
  reducerPath: 'commentApi',
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
    // Get comments for an article
    getComments: builder.query<CommentsArrayInterface,string >({
      query: (slug) => `articles/${slug}/comments`,
    }),

    // Create a comment for an article
    createComment: builder.mutation<CommentInterface, { slug: string; payload: CreateCommentPayloadInterface }>({
      query: ({ slug, payload }) => ({
        url: `articles/${slug}/comments`,
        method: 'POST',
        body: payload,
      }),
    }),

    // Delete a comment for an article
    deleteComment: builder.mutation<{ success: boolean }, { slug: string; commentId: number }>({
      query: ({ slug, commentId }) => ({
        url: `articles/${slug}/comments/${commentId}`,
        method: 'DELETE',
      }),
      transformResponse: () => ({ success: true }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;