import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TagsResponse } from '../../Interface/Tags/TagsResponse';

// Define the structure of an Article object
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