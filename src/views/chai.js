//Library
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { withFirebase } from "./components/Firebase"

//All protected routes
import routes from "./routes"

// Styling dependencies
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import Login from "./components/Auth/Login"


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      fetched: false
    }
  }

  UNSAFE_componentWillMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isLoggedIn: true, fetched: true })
      } else {
        this.setState({ isLoggedIn: false, fetched: true })
      }
    })
  }

  _handleProtectedRouting = (Layout, Component) => {
    if (this.state.fetched === true) {
      if (this.state.isLoggedIn) {
        return (
          <Layout>
            <Component />
          </Layout>
        )
      } else {
        return (
          <Redirect to="/login" />
        )
      }
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }

  isAuth = (layout, WrappedComponent) => {
    const self = this
    class HigherOrderComponent extends React.Component {
      render() {
        return (
          self._handleProtectedRouting(layout, WrappedComponent)
        )
      }
    }
    return HigherOrderComponent
  }

  render() {
    const self = this
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          <Route path="/login" component={() => {
            if (this.state.fetched === true) {
              if (!this.state.isLoggedIn) {
                return (
                  <Login />
                )
              } else {
                return (
                  <Redirect to="/admin" />
                )
              }
            } else {
              return (
                <div>Loading...</div>
              )
            }
          }} />

          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={self.isAuth(route.layout, route.component)}
              />
            );
          })}


        </div>
      </Router>
    )
  }
}

export default withFirebase(App)