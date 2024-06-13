// Assuming an import for a hypothetical useGetArticlesQuery similar to useGetTagsQuery

import { useState } from "react";
import LayoutComponent from "../../components/Layout";
import { useGetRecentArticlesQuery } from "../../services/articleService";
import { useGetTagsQuery } from "../../services/User/TageService";


const HomePage = () => {



  const totalPages = 20;
  // Correctly type the initial state for useState
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: tags, error: tagsError, isLoading: tagsLoading } = useGetTagsQuery();
  const { data: articles, error: articlesError, isLoading: articlesLoading } = useGetRecentArticlesQuery({ tag: selectedTag, page: currentPage });

  // Explicitly type the parameter 'tag' as string
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1); // Reset to first page on tag change
  };

  // Explicitly type the parameter 'page' as number
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <LayoutComponent>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">Global Feed</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">Your Feed</a>
                  </li>

                </ul>
              </div>
              {articlesLoading && <div>Loading articles...</div>}
              {articlesError && <div>Error fetching articles</div>}
              {articles && typeof articles === 'object' && Object.entries(articles).map(([key, value], index) => {
                if (Array.isArray(value)) {
                  return value.map((article, articleIndex) => (
                    <div className="article-preview" key={`${key}-${articleIndex}`}>
                      <div className="article-meta">
                        <a href={`/profile/${article.author.username}`}><img src={article.author.image} alt={article.author.username} /></a>

                        {/*  show the date the article created  */}
                        <div className="info">
                          <a href={`/profile/${article.author.username}`} className="author">{article.author.username}</a>
                          <span className="date">{article.createdAt}</span>
                        </div>
                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                          <i className="ion-heart"></i> {article.favoritesCount}
                        </button>
                      </div>

                      {/* Pon int user to the article   */}
                      <a href={`/article/${article.slug}`} className="preview-link">
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <span>Read more...</span>

                        {/* Display of the taList  */}
                        <ul className="tag-list">
                          {article.tagList.map((tag: string, tagIndex: number) => (
                            <li key={`${key}-${articleIndex}-${tagIndex}`} className="tag-default tag-pill tag-outline">{tag}</li>
                          ))}
                        </ul>
                      </a>
                    </div>

                  ));
                } else {
                  return <div key={key}>Invalid article value: {JSON.stringify(value)}</div>;
                }
              })}

              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                >
                  <a className="page-link" href="#" onClick={(e) => e.preventDefault()}>Previous</a>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <a
                      href="#"
                      className="page-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(number);
                      }}
                    >
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
              {/* Pagination and other components remain unchanged */}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                {tagsLoading && <div>Loading tags...</div>}
                {tagsError && <div>Error fetching tags</div>}
                {tags && typeof tags === 'object' &&
                  Object.entries(tags).map(([key, value]) => {
                    const renderTag = (tag: string, index: number) => (
                      <a
                        onClick={() => handleTagClick(tag)}
                        href="" key={`${key}-${index}`} className="tag-pill tag-default">
                        {tag}
                      </a>
                    );

                    if (Array.isArray(value)) {
                      return value.map(renderTag);
                    } else if (typeof value === 'string') {
                      return value.split(',').map((tag, index) => renderTag(tag.trim(), index));
                    } else {
                      return <div key={key}>Invalid tag value: {JSON.stringify(value)}</div>;
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>
  )
}

export default HomePage