
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, ArticleFiltersInterface, ArticleInterface, CreateArticlePayloadInterface, UpdateArticlePayloadInterface } from '../../Interface/Article/Article.Interface';


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
    getRecentArticles: builder.query<ArticleInterface[],  ArticleFiltersInterface | void>({
      query: (filters) => {
        const { tagList, author, favorited } = filters || {};
        const params = {
          tagList,
          author,
          favorited,
          
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
    updateArticle: builder.mutation<ArticleInterface, { slug: string; payload:  UpdateArticlePayloadInterface }>({
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
      getArticlesFeed: builder.query<ArticleInterface[], void>({
        query: () => ({
          url: 'articles/feed',
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
