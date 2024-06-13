
// src/services/articleApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Article {
  // Define the structure of an Article object
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

interface ArticleFilters {
  tag?: string;
  author?: string;
  favorited?: string;
  tagList?: string[];
  page?: number;
  
}

interface CreateArticlePayload {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

interface UpdateArticlePayload {
  article: {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
  };
}

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.realworld.io/api/',
  }),
  endpoints: (builder) => ({
    // Get recent articles
    getRecentArticles: builder.query<Article[], ArticleFilters | void>({
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
    getArticle: builder.query<Article, string>({
      query: (slug) => `articles/${slug}`,
    }),

    // Create a new article
    createArticle: builder.mutation<Article, CreateArticlePayload>({
      query: (payload) => ({
        url: 'articles',
        method: 'POST',
        body: payload,
      }),
    }),

    // Update an existing article by slug
    updateArticle: builder.mutation<Article, { slug: string; payload: UpdateArticlePayload }>({
      query: ({ slug, payload }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        body: payload,
      }),
    }),

    deleteArticle: builder.mutation<{ success: boolean }, string>({
        query: (slug) => ({
          url: `articles/${slug}`,
          method: 'DELETE',
        }),
        transformResponse: () => ({ success: true }),
      }),
      

      getArticlesFeed: builder.query<Article[], { offset?: number; limit?: number }>({
        query: ({ offset, limit } = {}) => ({
          url: 'articles/feed',
          params: { offset, limit },
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
