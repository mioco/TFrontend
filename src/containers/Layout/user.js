import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { Route } from "react-router-dom";
import logo from '../../assets/logo.svg';
import './user.css';

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = dispatch => bindActionCreators({
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

class User extends Component {
  render() {
    const { routes } = this.props;
    
    return (
      <div className="user">
        <div>  
          <img alt="logo" src={logo} />
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
          {/* {path === '/user' && <Redirect to="/user/login" />} */}
        </div>  
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
