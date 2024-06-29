import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { initialState } from '../../Interface/User/User.Interface';


export const userSlice = createSlice({
  name: 'user',
  initialState,

  // Reducers
  reducers: {
    // Set current user
    setCurrentUser: (
      state,
      action: PayloadAction<{ username: string; email: string; token: string; bio: string; image: string }>
    ) => {
      // Clear previous user state
      state.username = null;
      state.email = null;
      state.token = null;
      state.bio = null;
      state.image = null;
    
      // Set new user state
      localStorage.setItem('user', JSON.stringify({
        username: action.payload.username,
        email: action.payload.email,
        token: action.payload.token,
        bio: action.payload.bio,
        image: action.payload.image,
      }));
    
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.bio = action.payload.bio;
      state.image = action.payload.image;
    },
    // Update user
    updateUser: (
      state,
      action: PayloadAction<{ email?: string; username?: string; bio?: string; image?: string }>,
    ) => {
      if (action.payload.email) state.email = action.payload.email
      if (action.payload.username) state.username = action.payload.username
      if (action.payload.bio) state.bio = action.payload.bio
      if (action.payload.image) state.image = action.payload.image
    },


     //  set token for user
     setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },


    // Logout user
logoutUser: (state) => {
  // Clear user state
  state.username = null;
  state.email = null;
  state.token = null;
  state.bio = null;
  state.image = null;

  // Remove token from localStorage
  localStorage.removeItem('token');
},
  },
})

export const selectUser = (state: RootState) => state.user

export const { setCurrentUser, updateUser,  logoutUser, setToken } = userSlice.actions

export default userSlice.reducer