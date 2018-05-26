import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import GlobalHeader from '../../components/GlobalHeader';
import PostList from '../../components/Postlist';
import { login, authority } from '../../modules/user';
import './login.css';

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login: (payload) => login(payload),
  authority: () => authority(),
  toHome: () => push('/home')
}, dispatch);
 
class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    const { login, toHome } = this.props;
    if (!this.state.email || !this.state.password) {
      return
    }
    
    login(this.state).then(() => toHome());
  }
  
  render() {
    const { email, password } = this.state;
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
          <div onClick={this.handleSubmit}>提交</div>
          <Link to="/user/regist">立即注册</Link>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
