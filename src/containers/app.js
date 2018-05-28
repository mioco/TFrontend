
import React from 'react';
import { Redirect, Route } from "react-router-dom";
import Home from './Home/home';
import Profile from './Home/profile';
import Login from './User/login';
import Regist from './User/regist';
import ResetPasswd from './User/resetPasswd';
import GlobalNav from '../components/GlobalNav';
import User from './Layout/user';
import Basic from './Layout/basic';
import Post from './Home/post';
import GlobalFooter from '../components/GlobalFooter';

const routes = [
  {
    path: "/home",
    component: Basic(Home),
  },
  {
    path: "/profile",
    component: Basic(Profile)
  },
  {
    path: "/post/:id",
    component: Basic(Post)
  },
  {
    path: "/user",
    component: User,
    routes: [
      {
        path: "/user/login",
        component: Login
      },
      {
        path: "/user/regist",
        component: Regist
      }
    ]
  }
];

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

const App = () => (
  <div>
    <Route exact path="/" render={() => <Redirect to="/home" />}/>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    <GlobalFooter />
  </div>
);

export default App;