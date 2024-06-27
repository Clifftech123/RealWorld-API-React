


// Author interface
interface Author {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
}

// Article interface
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
  author: Author;
};




export interface ArticleInterface2 {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
};



// Articles response interface
export interface ArticlesResponseInterface {
  articles: ArticleInterface[];
}

//  Article response interface
export interface ApiResponse {
  article: ArticleInterface;
}
export interface ArticleFiltersInterface {
  tag?: string;
  author?: string;
  favorited?: string;
  offset?: number;
  limit?: number;
}

export interface ArticlesWithCountInterface {
  articles: ArticleInterface[];
  articlesCount: number;
}

// Create article payload interface
export interface CreateArticlePayloadInterface {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
    message?: string;
  };
}

// Update article payload interface
export interface UpdateArticlePayloadInterface {
  article: {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
  };
}