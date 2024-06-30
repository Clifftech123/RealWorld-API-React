import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TagsResponse } from '../../Interface/Tags/TagsResponse';

/**
 * Provides an API for fetching tags from the RealWorld API.
 * 
 * The `tagsApi` object is a Redux Toolkit Query API that defines a single endpoint for fetching tags.
 * The `useGetTagsQuery` hook can be used to fetch the list of tags from the API.
 */
export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.realworld.io/api/' }),
  endpoints: (builder) => ({
    getTags: builder.query<string[], void>({
      query: () => 'tags',
      transformResponse: (response: TagsResponse) => response.tags,
    }),
  }),
});

export const { useGetTagsQuery } = tagsApi;