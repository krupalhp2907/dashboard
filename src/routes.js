import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, LoginLayout } from "./layouts";

// Route Views
import Home from "./views/Home";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import Login from "./views/Login";
// import ComponentsOverview from "./views/ComponentsOverview";
import Employees from "./views/Employees";
import Report from "./views/Report";
import EmployeeDetails from "./views/EmployeeDetails";
import AddNewEmployee from "./views/AddNewEmployee";
import Settings from "./views/Settings";
// import BlogPosts from "./views/BlogPosts";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/home",
    layout: DefaultLayout,
    component: Home,
    protected: true
  },
  {
    path: "/login",
    layout: LoginLayout,
    component: Login,
    protected: true
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfileLite,
    protected: true

  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost,
    protected: true

  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/settings",
    layout: DefaultLayout,
    component: Settings
  },
  // {
  //   path: "/components-overview",
  //   layout: DefaultLayout,
  //   component: ComponentsOverview
  // },
  {
    path: "/employees",
    layout: DefaultLayout,
    component: Employees,
    protected: true

  },
  {
    path: "/employee_details/:id",
    layout: DefaultLayout,
    component: EmployeeDetails,
    protected: true

  },
  {
    path: "/add-new-employee",
    layout: DefaultLayout,
    component: AddNewEmployee,
    protected: true

  },
  {
    path: "/report",
    layout: DefaultLayout,
    component: Report,
    protected: true

  },
  // {
  //   path: "/blog-posts",
  //   layout: DefaultLayout,
  //   component: BlogPosts
  // }
];
