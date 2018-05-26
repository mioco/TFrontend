import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import className from 'classnames';
import avatar from '../../assets/avatar.png';
import './index.css';

const mapStateToProps = ({ global }) => ({
  navActive: global.navActive
})

const GlobalNav = props => {
  const containerClass = className({ hidden: !props.navActive, nav: true });

  return (
    <div className={containerClass}>
      <img src={avatar} />
      <ul>
        <li><Link to="/profile">个人中心</Link></li>
        <li><a>注销</a></li>
      </ul>
    </div>
  );
}

export default connect(
  mapStateToProps,
)(GlobalNav)
