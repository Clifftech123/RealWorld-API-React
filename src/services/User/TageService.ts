import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.realworld.io/api/' }),
  endpoints: (builder) => ({
    getTags: builder.query<string[], void>({
      query: () => 'tags',
    }),
  }),
});

export const { useGetTagsQuery } = tagsApi;