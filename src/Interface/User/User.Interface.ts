


// User state interface
 interface UserStateInterface {
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
    user :  UserStateInterface[]
  }
  
  // Initial state for user slice
 export  const initialState: UserState = {
    username: null,
    email: null,
    token: null,
    bio: null,
    image: null,
    user: []
  
    
  }
  



export interface UserServiceInterface {
    [x: string]: any;
    username: string;
    email: string;
    bio?: string;
    image?: string;
    token?: string;
  }