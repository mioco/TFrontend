import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleNav } from '../../modules/global';
import logo from '../../assets/logo.svg';
import './index.css';

const mapStateToProps = state => ({
  ...state
})
 
const mapDispatchToProps = dispatch => ({
  toggleNav: () => dispatch(toggleNav)
})
 
class GlobalHeader extends Component {
  login = (event) => {
    this.props.login();
  }
  
  render() {
    return (
      <header className="App-header">
        <div>  
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TReader</h1>
        </div>
        <div onClick={this.props.toggleNav} />
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);
