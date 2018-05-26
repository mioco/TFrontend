import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import className from 'classnames';
import { bindActionCreators } from 'redux'
import avatar from '../../assets/avatar.png';
import { logout } from '../../modules/user';
import { toggleNav } from '../../modules/global';
import './index.css';

const mapStateToProps = ({ global }) => ({
  navActive: global.navActive
})

const mapDispatchToProps = dispatch => bindActionCreators({
  logout: () => logout,
  toggleNav: () => dispatch(toggleNav)
}, dispatch);

const GlobalNav = props => {
  const containerClass = className({ hidden: !props.navActive, nav: true });

  const logout = (e) => {
    props.toggleNav()
    props.logout()
    e.preventDefault();
    
  }
  return (
    <div className={containerClass}>
      <img src={avatar} />
      <ul>
        <li><Link to="/profile">个人中心</Link></li>
        <li><a onClick={logout}>注销</a></li>
      </ul>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalNav)
