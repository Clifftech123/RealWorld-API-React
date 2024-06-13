import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'


interface User {
  username: string;
  email: string;
  token: string;
  bio: string;
  image: string;
}


// User state type
type UserState = {
  username: string | null
  email: string | null
  token: string | null
  bio: string | null
  image: string | null
  user : User[]
}

// Initial state for user slice
const initialState: UserState = {
  username: null,
  email: null,
  token: null,
  bio: null,
  image: null,
  user: []

  
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  // Reducers
  reducers: {
    // Set current user
    setCurrentUser:   (
      state,
      action: PayloadAction<{ username: string; email: string; token: string; bio?: string; image?: string }>,
    ) => {
      localStorage.setItem( 'user', 
      JSON.stringify({
        username: action.payload.username,
        email: action.payload.email,
        token: action.payload.token,
        bio: action.payload.bio,
        image: action.payload.image,
      })
      )
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
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
      state.username = null
      state.email = null
      state.token = null
      state.bio = null
      state.image = null
    },
  },
})

export const selectUser = (state: RootState) => state.user

export const { setCurrentUser, updateUser,  logoutUser, setToken } = userSlice.actions

export default userSlice.reducer