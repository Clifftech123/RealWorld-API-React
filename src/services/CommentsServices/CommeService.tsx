// src/services/commentApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommentInterface, CreateCommentPayloadInterface } from '../../Interface/Comment/Comment.Interface';



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
    getComments: builder.query<CommentInterface[], string>({
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