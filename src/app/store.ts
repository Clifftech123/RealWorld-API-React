import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import userReducer from '../features/UserSlice';
import { userApi } from '../services/userService';
import { tagsApi } from '../services/User/TageService';
import { articleApi } from '../services/articleService';


export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer, 
    [articleApi.reducerPath]: articleApi.reducer, 
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, tagsApi.middleware, articleApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);