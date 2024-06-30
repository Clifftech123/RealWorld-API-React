import ArticleComponent from "../../components/Article/ArticleComponent"
import LayoutComponent from "../../components/Layout"


/**
 * Renders an article page, displaying the article content within the global layout.
 */
const ArticlePage = () => {
   // ArticlePage: Renders an article using ArticleComponent within the global layout (LayoutComponent).
  return (
     <LayoutComponent>
        <ArticleComponent />
     </LayoutComponent>
  )
}

export default ArticlePage
