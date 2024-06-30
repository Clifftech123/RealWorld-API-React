import CreateEditArticleComponent from "../../components/Article/CreateEditArticleComponent"
import LayoutComponent from "../../components/Layout"


/**
 * Renders the `CreateEditArticlePage` component, which is a page that allows the user to create or edit an article.
 * 
 * The page is wrapped in the `LayoutComponent`, which provides the overall layout and structure for the page.
 * The `CreateEditArticleComponent` is then rendered within the layout, which contains the form and functionality for creating or editing an article.
 */
const CreateEditArticlePage = () => {
  return (
     <LayoutComponent>
      < CreateEditArticleComponent />
     </LayoutComponent>
  )
}

export default CreateEditArticlePage
