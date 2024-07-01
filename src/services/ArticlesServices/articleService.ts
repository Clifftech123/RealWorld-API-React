
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, ArticleFiltersInterface, ArticleInterface, ArticlesResponseInterface, ArticlesWithCountInterface, CreateArticlePayloadInterface, UpdateArticlePayloadInterface } from '../../Interface/Article/Article.Interface';


/**
 * The `articleApi` is a Redux Toolkit Query API that provides a set of hooks for interacting with a RESTful API for managing articles.
 *
 * The API includes the following endpoints:
 * - `getRecentArticles`: Retrieves a list of recent articles based on the provided filters.
 * - `getArticle`: Retrieves a single article by its slug.
 * - `createArticle`: Creates a new article with the provided payload.
 * - `updateArticle`: Updates an existing article by its slug with the provided payload.
 * - `deleteArticle`: Deletes an article by its slug.
 * - `getArticlesFeed`: Retrieves a list of articles from the users that the current user follows.
 *
 * The API uses the `fetchBaseQuery` from `@reduxjs/toolkit/query/react` to make the API requests, and it automatically handles the authorization by retrieving the token from localStorage and appending it to the `Authorization` header.
 */
export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.realworld.io/api/',
    prepareHeaders: (headers) => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      // If the token exists, append it to the Authorization header
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get recent articles
   
    getRecentArticles: builder.query<ArticlesResponseInterface, ArticleFiltersInterface>({
    
      query: (filters) => {
        const { tag, author, favorited, offset, limit } = filters || {};
        const params = {
          tag,
          author,
          favorited,
          offset,
          limit,
        };
        return {
          url: 'articles',
          params,
        };
      },
    }),

    // Get a single article by slug
    getArticle: builder.query< ApiResponse, string>({
      query: (slug:string) => `articles/${slug}`,
    }),

    // Create a new article
    createArticle: builder.mutation<ArticleInterface,  CreateArticlePayloadInterface>({
      query: (payload) => ({
        url: 'articles',
        method: 'POST',
        body: payload,
      }),
    }),

    // Update an existing article by slug
    updateArticle: builder.mutation<ArticleInterface, { slug?: string; payload:  UpdateArticlePayloadInterface }>({
      query: ({ slug, payload }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        body: payload,
      }),
    }),

     //  Delete an article by slug
    deleteArticle: builder.mutation<{ success: boolean }, string>({
        query: (slug) => ({
          url: `articles/${slug}`,
          method: 'DELETE',
        }),
        transformResponse: () => ({ success: true }),
      }),
      

      // Get articles from users that the current user follows
      getArticlesFeed: builder.query< ArticlesWithCountInterface, { offset?: number; limit?: number }>({
        query: ({ offset, limit } = {}) => ({
          url: 'articles/feed',
          params: {
            offset,
            limit,
          },
        }),
      }),
  }),
  
});


// Export hooks for usage in functional components
export const {
  useGetRecentArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation, 
  useGetArticlesFeedQuery,
} = articleApi;
