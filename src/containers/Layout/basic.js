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
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { register } from '../../registerServiceWorker'
import './basic.css'

const mapStateToProps = state => ({
  user: state.user,
  notification: state.global.notification || {}
})

const mapDispatchToProps = dispatch => bindActionCreators({
    login: () => dispatch(login()),
    authority: () => authority,
    toLogin: () => push('/user/login'),
    setNotification: ({ text = '', show = false }) => dispatch({
      type: 'SET_NOTIFICATION',
      payload: { text, show },
    })
}, dispatch);

let stompClient, socket;

const connectWS = (email, context) => {
  socket = new SockJS('http://118.25.188.125:8080/websocket');
  stompClient = Stomp.over(socket);
  stompClient.connect({ email }, frame => {
    stompClient.subscribe('/user/topic/greetings', greeting => {
      context.props.setNotification({
        text: greeting.body,
        show: true
      })
    });
  });
}

export const disconnectWS = () => {
  stompClient.disconnect(() => {})
  stompClient = null
  socket = null
}

export default (C) => connect(mapStateToProps, mapDispatchToProps)(
  class Basic extends Component {

    constructor(props) {
      super(props);
    }

    componentDidMount() {      
      if (this.props.user.isLogin) {
        if (stompClient && socket) return
        connectWS(this.props.user.email)
        return
      }

      this.props.authority()
      .then(() => {
        if (stompClient && socket) return
        connectWS(this.props.user.email, this)
      })
      .catch(e => disconnectWS())
    }

    render() {
      const { routes, match: { path }, user, history } = this.props;
      return (
        <div style={{marginTop: '5rem'}}>
          <GlobalHeader />        
          <GlobalNav />
          <section 
            className={'notification ' + (!this.props.notification.show ? 'hide' : '')}>
            { this.props.notification.text }
          </section>
          <C { ...this.props }/>
        </div>
      );
    }
  }
);