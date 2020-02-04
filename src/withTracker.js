import React, { Component } from "react";
import GoogleAnalytics from "react-ga";
import { Redirect } from "react-router-dom";
import Loading from "./components/common/Loading"


GoogleAnalytics.initialize(process.env.REACT_APP_GAID || "UA-115105611-2");

const withTracker = (WrappedComponent, authState,options = {}) => {
  const {init, loggedIn, protectedRoute} = authState


  const trackPage = page => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    GoogleAnalytics.set({
      page,
      ...options
    });
    GoogleAnalytics.pageview(page);
  };

  const BASENAME = process.env.REACT_APP_BASENAME || "";

  // eslint-disable-next-line
  const HOC = class extends Component {
    componentDidMount() {
      // eslint-disable-next-line
      const page = this.props.location.pathname + this.props.location.search;
      trackPage(`${BASENAME}${page}`);
    }

    componentDidUpdate(prevProps) {
      const currentPage =
        prevProps.location.pathname + prevProps.location.search;
      const nextPage =
        this.props.location.pathname + this.props.location.search;

      if (currentPage !== nextPage) {
        trackPage(`${BASENAME}${nextPage}`);
      }
    }
  
    render() {
      const page = this.props.location.pathname + this.props.location.search
      console.log(page === "/login", init, loggedIn)
      return (
        // <WrappedComponent {...this.props} />
        !protectedRoute ? <WrappedComponent {...this.props} /> : (init ? loggedIn ? page==="/login" ? <Redirect to="/home" />: <WrappedComponent {...this.props} />  : page === "/login" ? <WrappedComponent {...this.props} /> : <Redirect to="/login" /> : <Loading />)

      );
    }
  };
  
  return HOC;
};

export default withTracker;
