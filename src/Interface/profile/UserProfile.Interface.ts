export interface UserProfileInterface {
  profile: {
    username: string;
    bio: string | null; // Since bio can be null
    image: string;
    following: boolean;
  };
}