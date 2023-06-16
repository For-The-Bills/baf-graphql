import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import {
  Route,
  Switch,
  useLocation,
  useNavigate,
  useParams,
  withRouter
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotFound from "./components/NotFound/NotFound";

import Home from "./views/Home/Home";

import Calculator from "./views/Calculator/Calculator";

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
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/calculator" component={Calculator} />
              <Route component={NotFound} />
            </Switch>
          </ScrollToTop>
        </Suspense>
      </>
    );
  }
}


export default withRouter(connect()(ViewManager));
