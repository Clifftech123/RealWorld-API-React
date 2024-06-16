


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

  // User response interface
  export interface UserResponse {
    user: {
      id: number;
      email: string;
      username: string;
      bio: string | null;
      image: string;
      token: string;
    };
  }

   // User service interface
export interface UserServiceInterface {
    [x: string]: any;
    username: string;
    email: string;
    bio?: string;
    image?: string;
    token?: string;
  }