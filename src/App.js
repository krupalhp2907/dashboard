import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";
import Login from "./views/Login"

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

export default ({controller}) => {
  const [auth, setAuth] = useState({
    init: false,
    loggedIn: false
  })
  useEffect(() => {
    controller.authListner(function (emp) {  
      console.log(emp);
      
      if(!emp) {
        // Not logged in
        setAuth({
          init: true,
          loggedIn: false
        })
      } else {
        // Logged in
        setAuth({
          init: true,
          loggedIn: true
        })
      }
    })
  }, [])

  return (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              },
              {
                init: auth.init,
                loggedIn: auth.loggedIn,
                protectedRoute: (false || route.protected)
              })}
            />
          );
        })}
      </div>
    </Router>
  )
};
