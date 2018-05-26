
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home/home';
import Profile from './Home/profile';
import Login from './User/login';
import Regist from './User/regist';
import ResetPasswd from './User/resetPasswd';
import GlobalNav from '../components/GlobalNav';
import User from './Layout/user';
import Basic from './Layout/basic';

const routes = [
  {
    path: "/",
    component: Basic,
    routes: [
      {
        path: "/home",
        component: Home
      },
      {
        path: "/profile",
        component: Profile
      }
    ]
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
  <Router>
    <div>
      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </div>
  </Router>
);

export default App;