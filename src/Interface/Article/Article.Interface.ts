 export interface ArticleInterface {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: null | string;
      image: string;
      following: boolean;
    };
  }
  
  
  
  
 export interface ArticleFiltersInterface {
    tag?: string;
    author?: string;
    favorited?: string;
    tagList?: string[];
    page?: number;
    
  }
  
  export interface CreateArticlePayloadInterface {
    article: {
      title: string;
      description: string;
      body: string;
      tagList: string[];
      message?: string;
    };
  }
  
  export interface UpdateArticlePayloadInterface {
    article: {
      title?: string;
      description?: string;
      body?: string;
      tagList?: string[];
    };
  }
  