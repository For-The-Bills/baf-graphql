import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotFound from "./components/NotFound/NotFound";

import Home from "./views/Home/Home";

import News from "./views/Calculator/Calculator";

// import ItemTypes from "./views/reservations/itemTypes/ItemTypes";
// import ItemType from "./views/reservations/itemType/ItemType";
import Loading from "./components/Loading/Loading";
import ScrollToTop from "./utils/ScrollToTop";

class ViewManager extends Component {
  render() {
    return (
      <>
        <ToastContainer limit={5} />

        <Suspense
          fallback={
            <>
              <Loading />
            </>
          }
        >
          <ScrollToTop>
            <Routes>
              <Route exact path="/" element={Home} />
              <Route exact path="/calculator" element={News} />
              <Route element={NotFound} />
            </Routes>
          </ScrollToTop>
        </Suspense>
      </>
    );
  }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter(connect()(ViewManager));
