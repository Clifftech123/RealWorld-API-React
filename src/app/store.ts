
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import userReducer from '../features/auth/UserSlice'; 
import { userApi } from '../services/User/userService';
import { tagsApi } from '../services/Tage/TageService'; 
import { articleApi } from '../services/Articles/articleService';
import { profileApi } from '../services/Profile/ProfileService';
import { commentApi } from '../services/Comments/CommeService';
import { favoritesApi } from '../services/Favorites/FavoritesServices';


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