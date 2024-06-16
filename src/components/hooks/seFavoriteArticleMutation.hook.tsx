import { useState, useCallback } from 'react';
import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from '../../services/Favorites/FavoritesServices';

const useFavorite = (initialArticle) => {
  const [article, setArticle] = useState(initialArticle);
  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();

  const toggleFavorite = useCallback(async () => {
    if (article.favorited) {
      await unfavoriteArticle(article.slug).unwrap();
      setArticle({
        ...article,
        favorited: false,
        favoritesCount: article.favoritesCount - 1,
      });
    } else {
      await favoriteArticle(article.slug).unwrap();
      setArticle({
        ...article,
        favorited: true,
        favoritesCount: article.favoritesCount + 1,
      });
    }
  }, [article, favoriteArticle, unfavoriteArticle]);

  return { article, toggleFavorite };
};

export default useFavorite;