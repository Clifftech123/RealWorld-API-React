export interface UserProfileInterface {
  profile: {
    username: string;
    bio: string | null; 
    image: string;
    following: boolean;
  };
}