

// Comment interface
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
  

  // Comment response interface
  export interface CreateCommentPayloadInterface {
    comment: {
      body: string;
    };
  }
  