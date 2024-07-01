import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleInterface, ArticlesResponseInterface } from '../../Interface/Article/Article.Interface';
import { RootState } from '../../app/store';

interface ArticlesState {
  articles: ArticleInterface[];
}

const initialState: ArticlesState = {
  articles: [],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    // set articles
    setArticles(state, action: PayloadAction<ArticlesResponseInterface>) {
      state.articles = action.payload.articles;
    },

    // add article
    addArticle(state, action: PayloadAction<ArticleInterface>) {
      state.articles.push(action.payload);
    },

    // update article
    updateArticle(state, action: PayloadAction<ArticleInterface>) {
      const updatedArticles = state.articles.map((article) =>
        article.slug === action.payload.slug ? action.payload : article
      );
      state.articles = updatedArticles;
    },


    // remove article
    removeArticle(state, action: PayloadAction<string>) {
      state.articles = state.articles.filter((article) => article.slug !== action.payload);
    },
  },
});

export const selectArticles = (state: RootState) => state.articles;
export const { setArticles, addArticle, updateArticle, removeArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
