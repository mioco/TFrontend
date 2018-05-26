import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import GlobalHeader from '../../components/GlobalHeader';
import PostList from '../../components/Postlist';
import GlobalNav from '../../components/GlobalNav';
import { login, authority } from '../../modules/user';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
const mapStateToProps = state => ({
  authority: state.authority,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login: () => dispatch(login()),
  authority: () => authority,
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

const Basic = ({ routes, match: { path }, user, history, authority }) => {
  authority();
  if (!user) {
    // history.go('/user/login');
    // return
  }

  // let stompClient;
  // const socket = new SockJS('http://118.25.188.125:8080/websock');
  // stompClient = Stomp.over(socket);
  // stompClient.connect(
  //   {
  //     email: user.email
  //   },
  //   function (frame) {
  //     console.log('Connected: ' + frame);
  //     stompClient.subscribe('/user/topic/greetings', function (greeting) {
  //         console.log(greeting.body)
  //     });
  //   }
  // );
  
  return (
    <div>
      <GlobalNav />
      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      {/* {path === '/' && <Redirect to="/home" />} */}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
