export interface CommentInterface {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  }
  
  export interface CreateCommentPayloadInterface {
    comment: {
      body: string;
    };
  }