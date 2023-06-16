import { useEffect, createContext } from "react";
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';

const ScrollToTop = (props) => {
  const location = useLocation();

  useEffect(() => {
    return () => {
      if (location.action !== "POP") {
        document.getElementById("SXWrapper")?.scrollTo(0, 0);
      }
    };
  }, [location]);

  return <>{props.children}</>;
};
export default ScrollToTop;
