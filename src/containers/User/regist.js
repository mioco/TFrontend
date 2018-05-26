import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import GlobalHeader from '../../components/GlobalHeader';
import PostList from '../../components/Postlist';
import { register, getCode, authority } from '../../modules/user';
import './login.css';

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => bindActionCreators({
  register: (payload) => dispatch(register(payload)),
  authority: () => dispatch(authority()),
  getCode: (email) => dispatch(getCode(email))
}, dispatch);
 
class Regist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmpassword: '',
      captcha: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = () => {
    if (!this.state.email || !this.state.password) {
      return
    }

    const { email, password, captcha } = this.state;
    
    this.props.register({ email, password, captcha });
  }

  getCode = () => {
    if (!this.state.email) {
      return false;
    }
    this.props.getCode(this.state.email)
  }
  
  render() {
    const { email, password, confirmpassword, captcha } = this.state;
    return (
      <div>
        <form>
          <label>
            邮箱:
            <input name="email" value={email} onChange={this.handleChange} />
          </label>
          <label>
            密码:
            <input name="password" type="password" value={password} onChange={this.handleChange} />
          </label>
          <label>
            确认密码:
            <input name="confirmpassword" type="password" value={confirmpassword} onChange={this.handleChange} />
          </label>
          <label>
            验证码:
            <input name="captcha" value={captcha} onChange={this.handleChange} />
            <div onClick={this.getCode}>获取验证码</div>
          </label>
          <div onClick={this.handleSubmit}>提交</div>
          <Link to="/user/login">已有账号</Link>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Regist);
