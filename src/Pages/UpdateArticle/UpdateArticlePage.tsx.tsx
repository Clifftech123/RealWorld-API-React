import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutComponent from '../../components/Layout';
import { useUpdateArticleMutation, useGetArticleQuery } from '../../services/ArticlesServices/articleService';
import { UpdateArticlePayloadInterface } from '../../Interface/Article/Article.Interface';

const UpdateArticlePage = () => {
  const { slug } = useParams();

  // get the slug from the url
  const safeSlug = slug ?? '';

  // initialize the state of the article
  const { data: articleData, isLoading, isError } = useGetArticleQuery(safeSlug);
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();


  // set the initial state of the form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  /**
   * Initializes the article update form fields with the data from the fetched article.
   *
   * This effect is triggered whenever the `articleData` changes, which happens when the article data is fetched from the server.
   * It sets the `title`, `description`, `body`, and `tagList` state variables with the values from the fetched article.
   *
   * @param articleData - The data for the article being updated, fetched from the server.
   */
  useEffect(() => {
    if (articleData) {
      setTitle(articleData.article.title);
      setDescription(articleData.article.description);
      setBody(articleData.article.body);
      setTagList(articleData.article.tagList);
    }
  }, [articleData]);


  /**
   * Handles the submission of the article update form.
   * 
   * @param e - The form submission event.
   * @returns Promise<void>
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: UpdateArticlePayloadInterface = {
        article: {
          title,
          description,
          body,
          tagList,
        },
      };
      const result = await updateArticle({ slug, payload });
      if (result.data) {
        setTitle('');
        setDescription('');
        setBody('');
        setTagList([]);
        toast.success('Article updated successfully!');
      } else if (result.error) {
        toast.error('Failed to update article');
      }
    } catch (error) {
      toast.error('Failed to update article');
    }
  };

  /**
   * Renders a loading message while the article data is being fetched.
   * This is displayed when the `isLoading` state variable is true.
   */
  if (isLoading) {
    return <div>Loading...</div>;
  }

  /**
   * Renders a message indicating an error occurred while fetching the article data.
   */
  if (isError) {
    return <div>Error fetching article data</div>;
  }

  return (
    <LayoutComponent>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Write your article (in markdown)"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      value={tagList.join(', ')}
                      onChange={(e) => setTagList(e.target.value.split(',').map((tag) => tag.trim()))}
                    />
                    <div className="tag-list">
                      {tagList.map((tag) => (
                        <span key={tag} className="tag-default tag-pill">
                          {tag} <i className="ion-close-round"></i>
                        </span>
                      ))}
                    </div>
                  </fieldset>

                  <button className="btn btn-lg pull-xs-right btn-primary" type="submit" disabled={isUpdating}>
                    {isUpdating ? 'Updating...' : 'Update Article'}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </LayoutComponent>
  );
};

export default UpdateArticlePage;
