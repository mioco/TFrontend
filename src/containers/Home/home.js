import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import GlobalHeader from '../../components/GlobalHeader';
import PostList from '../../components/Postlist';
import {
  login,
  logout,
  authority
} from '../../modules/user';
import './home.css';

const data = [
  {
    title: 'Title1',
    content: 'this is a post',
    url: 'douban.com',
    tags: ['a', 'b']
  },
  {
    title: 'Title2',
    content: 'this is a post',
    url: 'douban.com',
    tags: ['c']
  }
];

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login: () => dispatch(login()),
  logout: () => dispatch(logout()),
  authority: () => dispatch(authority()),
  changePage: () => push('/about-us')
}, dispatch);
 
class Home extends Component {
  login = (event) => {
    this.props.login();
  }
  
  render() {
    const postList = data.map(({ title, content, tags, url }, index) => (
      <PostList key={index} title={title} content={content} tags={tags} url={url} />
    ));
    return (
      <div className="App">
        <GlobalHeader />
        <nav>
          <ul className="nav-bar">
            <li><a>首页</a></li>
            <li><a>话题</a></li>
          </ul>
        </nav>

        {postList}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
