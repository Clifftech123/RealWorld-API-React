import { LayoutProps } from "../Constants/Interface/LayoutProps";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";


  const LayoutComponent : React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      < HeaderComponent />
      <main>{children}</main>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;