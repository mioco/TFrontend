import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import GlobalHeader from '../../components/GlobalHeader';
import PostList from '../../components/Postlist';
import { getTags } from '../../modules/home';
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

const mapStateToProps = ({ user }) => ({
  user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getTags: () => getTags
}, dispatch);

class Home extends PureComponent {
// const Home = ({ route, routing, user }) => {
  render() {
    const { location: { hash }, user, getTags } = this.props;
    const path = hash.replace('#', '');
    path === 'topic' && user.email && getTags();

    const postList = data.map(({ title, content, tags, url }, index) => (
      <PostList key={index} title={title} content={content} tags={tags} url={url} />
    ));

    
    const tagList = user.tagList && user.tagList.map(({ tag, id }) => <a key={id}>{tag}</a>)
  
    return (
      <div className="App">
        <GlobalHeader />
        <nav>
          <ul className="nav-bar">
            <li><a className={!path ? 'active' : ''} href="#">首页</a></li>
            <li><a className={path === 'topic' ? 'active' : ''} href="#topic">话题</a></li>
          </ul>
        </nav>

        {postList}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
