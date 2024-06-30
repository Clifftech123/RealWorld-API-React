import { useEffect, useState } from "react";
import { useGetArticlesFeedQuery } from "../../services/ArticlesServices/articleService";
import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from "../../services/FavoritesAService/FavoritesServices";


export const ArticlesFeedComponent = () => {


    const totalPages = 5
    const [currentPage, setCurrentPage] = useState<number>(1);
    const limit = 5;
    const offset = (currentPage - 1) * limit;



    /**
     * Fetches the articles feed data from the API, with the specified offset and limit parameters.
     * The fetched data is stored in the `ArticlesWithCountInterface` variable, and any errors or loading state are stored in `articlesError` and `articlesLoading` respectively.
     * The `refetch` function can be used to manually trigger a re-fetch of the articles feed.
     *
     * @param {number} offset - The offset to use when fetching the articles feed.
     * @param {number} limit - The limit to use when fetching the articles feed.
     * @returns {Object} - An object containing the fetched articles data, any errors, and the loading state.
     */
    const { data: ArticlesWithCountInterface, error: articlesError, isLoading: articlesLoading, refetch } = useGetArticlesFeedQuery({
        offset,
        limit,
    });

    const [favoriteArticle] = useFavoriteArticleMutation();
    const [unfavoriteArticle] = useUnfavoriteArticleMutation();

    /**
     * Refetches the articles feed when the current page or selected tag changes.
     * This ensures the feed is updated to reflect the new page or tag selection.
     */
    useEffect(() => {
        refetch(); // Manually trigger a re-fetch when currentPage or selectedTag changes
    }, [currentPage, refetch]);

    const handleFavoriteToggle = async (slug: string, isFavorited: boolean) => {
        try {
            if (isFavorited) {
                await unfavoriteArticle(slug);
            } else {
                await favoriteArticle(slug);
            }
            refetch();
        } catch (error) {
            console.error("Error toggling favorite status:", error);
        }
    };



    return (

        <div className="home-page">

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">

                        {/*  show the articles  */}
                        {articlesLoading && <div>Loading articles...</div>}
                        {articlesError && <div>Error fetching articles</div>}
                        {ArticlesWithCountInterface?.articles && ArticlesWithCountInterface.articles.map((article) => (
                            <div className="article-preview" key={article.slug}>
                                <div className="article-meta">
                                    <a href={`/profile/${article.author.username}`}><img src={article.author.image} alt={article.author.username} /></a>
                                    <div className="info">
                                        <a href={`/profile/${article.author.username}`} className="author">{article.author.username}</a>
                                        <span className="date">{article.createdAt}</span>
                                    </div>
                                    <button
                                        className="btn btn-outline-primary btn-sm pull-xs-right"
                                        onClick={() => handleFavoriteToggle(article.slug, article.favorited)}>
                                        <i className="ion-heart"></i> {article.favoritesCount}
                                    </button>
                                </div>
                                <a href={`/article/${article.slug}`} className="preview-link">
                                    <h1>{article.title}</h1>
                                    <p>{article.description}</p>
                                    <span>Read more...</span>
                                    <ul className="tag-list">
                                        {article.tagList.map((tag) => (
                                            <li key={`${article.slug}-${tag}`} className="tag-default tag-pill tag-outline">{tag}</li>
                                        ))}
                                    </ul>
                                </a>
                            </div>
                        ))}


                        {/*  Showing pagination  */}
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
                                <button className="page-link">Previous</button>
                            </li>

                            {Array.from({ length: totalPages }).map((_, index) => (
                                <li key={`page-${index}`} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(index + 1);
                                        }}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>
                                <button className="page-link">Next</button>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>
        </div>

    )
}
