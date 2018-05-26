import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import PostList from '../../components/Postlist';
import { login, logout } from '../../modules/user';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import logo from '../../assets/logo.svg';
import './user.css';

const mapStateToProps = state => ({
  authority: state.authority
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login: () => dispatch(login()),
  changePage: () => push('/about-us')
}, dispatch);
 
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

const User = ({ routes, routing, match: { path } }) => {
  console.log(path)
  return (
    <div className="user">
      <div>  
        <img src={logo} />
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        {/* {path === '/user' && <Redirect to="/user/login" />} */}
      </div>  
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
