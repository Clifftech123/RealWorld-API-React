
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import userReducer from '../features/auth/UserSlice'; 
import { userApi } from '../services/UserServices/userService';
import { tagsApi } from '../services/TageServices/TageService'; 
import { articleApi } from '../services/ArticlesServices/articleService';
import { profileApi } from '../services/ProfileServices/ProfileService';
import { commentApi } from '../services/CommentsServices/CommeService';
import { favoritesApi } from '../services/FavoritesAService/FavoritesServices';


// Configuring the Redux store with reducers and middleware
export const store = configureStore({
  reducer: {
    user: userReducer, 
    [userApi.reducerPath]: userApi.reducer, 
    [tagsApi.reducerPath]: tagsApi.reducer, 
    [articleApi.reducerPath]: articleApi.reducer, 
    [ profileApi.reducerPath]: profileApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [ favoritesApi.reducerPath]: favoritesApi.reducer,
  },
  // Adding RTK Query's automatically generated middleware for the APIs
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, 
    profileApi.middleware,
    commentApi.middleware,
    favoritesApi.middleware,
      tagsApi.middleware, articleApi.middleware),
});

// Type definitions for Redux store dispatch and state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Setting up automatic cache invalidation and refetching for RTK Query
setupListeners(store.dispatch);