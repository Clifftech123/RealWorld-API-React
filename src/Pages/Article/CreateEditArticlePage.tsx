import CreateEditArticleComponent from "../../components/Article/CreateEditArticleComponent"
import LayoutComponent from "../../components/Layout"


// CreateEditArticlePage: A page component that wraps the CreateEditArticleComponent in a layout.
// Utilizes LayoutComponent to maintain consistent page structure and styling across the app.
const CreateEditArticlePage = () => {
  return (
     <LayoutComponent>
      < CreateEditArticleComponent />
     </LayoutComponent>
  )
}

export default CreateEditArticlePage
