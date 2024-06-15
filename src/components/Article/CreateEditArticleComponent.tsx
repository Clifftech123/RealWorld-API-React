import { useState } from "react";
import { useCreateArticleMutation } from "../../services/Articles/articleService";
import { toast } from "react-toastify";


const CreateEditArticleComponent = () => {

  const [createArticle, { isLoading, isSuccess, isError, error }] = useCreateArticleMutation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Assuming createArticle is an async function
      const response = await createArticle({ article: { title, description, body, tagList } });
      console.log(response);
      // Check the response or state to determine if the article was created successfully
      if (isSuccess) {
        resetForm();
        toast.success('Article created successfully');
      } else {
        // If createArticle provides error details, use them
        const errorMessage ='An error occurred';
        setErrorMessage(errorMessage);
      }
    } catch (err) {
      console.error(err);
      // Use a more specific error type if possible, or use a generic type for better type safety
      setErrorMessage('An error occurred');
    }
  };
  
  // Function to reset the form fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setBody('');
    setTagList([]);
    setErrorMessage('');
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
                onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title" />
            </fieldset>

           
            {/*  Article Description  */}
            <fieldset className="form-group">
              <input type="text" className="form-control" 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this article about?" />
            </fieldset>


            {/*  Article Body  */}  
            <fieldset className="form-group">
              <textarea
                className="form-control"
                rows={8}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your article (in markdown)"
              ></textarea>

            </fieldset>

            {/*  Article Tags  */}
            <fieldset className="form-group">
              <input type="text" className="form-control"
             onChange={(e) => setTagList(e.target.value.split(','))}
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
