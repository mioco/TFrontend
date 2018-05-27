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
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import { register } from '../../registerServiceWorker'

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login: () => dispatch(login()),
  authority: () => authority,
  toLogin: () => push('/user/login')
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

class Basic extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authority()
      .then(() => {

        let stompClient;
        const socket = new SockJS('http://118.25.188.125:8080/websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect(
          {
            email: this.props.user.email
          },
          function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/user/topic/greetings', function (greeting) {
                console.log(greeting.body)
            });
          }
        );
      })  
      .catch(() => this.props.toLogin());
  }

  render() {
    const { routes, match: { path }, user, history } = this.props;
    return (
      <div style={{marginTop: '5rem'}}>
        <GlobalHeader />        
        <GlobalNav />
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        {/* {path === '/' && <Redirect to="/home" />} */}
      </div>
    );
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Basic));
