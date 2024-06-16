
import { useState } from "react";
import { useCreateArticleMutation } from "../../services/Articles/articleService";
import { toast } from "react-toastify"; // Ensure react-toastify is installed in your project

// Define the expected error structure
interface ApiError {
  data: {
    errors: string[];
  };
}


const CreateEditArticleComponent = () => {
  const [createArticle, { isLoading }] = useCreateArticleMutation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Define resetForm before its usage
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setBody('');
    setTagList([]);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Corrected the syntax by adding a missing parenthesis
      await createArticle({ article: { title, description, body, tagList } }).unwrap();
      resetForm();
      toast.success('Article created successfully. You can view it on the homepage.');
    } catch (error) {
      // Assert the error to be of type ApiError
      const apiError = error as ApiError;
      if ('data' in apiError && 'errors' in apiError.data) {
        const errorMessage = apiError.data.errors.join(', ');
        setErrorMessage(errorMessage);
      } else {
        // Fallback for unexpected error formats
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="editor-page">
  <div className="container page">
    <div className="row">
      <div className="col-md-10 offset-md-1 col-xs-12">
        <ul className="error-messages ">
          <li>{errorMessage}</li>
        </ul>

        <form
        onSubmit={handleSubmit}
        >
          <fieldset>

            {/*  Article Title  */}
            <fieldset className="form-group">
              <input type="text" className="form-control form-control-lg"
              value={title}
                onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title" />
            </fieldset>

           
            {/*  Article Description  */}
            <fieldset className="form-group">
              <input type="text" className="form-control" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this article about?" />
            </fieldset>


            {/*  Article Body  */}  
            <fieldset className="form-group">
              <textarea
                className="form-control"
                rows={8}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your article (in markdown)"
              ></textarea>

            </fieldset>

            {/*  Article Tags  */}
            <fieldset className="form-group">
              <input type="text" className="form-control"
             onChange={(e) => setTagList(e.target.value.split(','))}
             value={tagList.join(',')}
              placeholder="Enter tags" />
              <div className="tag-list">
                <span className="tag-default tag-pill"> <i className="ion-close-round"></i> tag </span>
              </div>
            </fieldset>
            <button className="btn btn-lg pull-xs-right btn-primary" type="submit" disabled={isLoading}>
                  {isLoading ? 'Publishing...' : 'Publish Article'}
                </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default CreateEditArticleComponent
