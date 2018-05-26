import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import PostList from '../../components/Postlist';
import { getTags, getPages } from '../../modules/home';
import './home.css';

const mapStateToProps = ({ user, home: { pageList, tagList } }) => ({
  user,
  pageList,
  tagList
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getTags: () => getTags,
  getPages: () => getPages,
}, dispatch);

class Home extends PureComponent {
  componentWillMount() {
    this.props.getPages()
  }
// const Home = ({ route, routing, user }) => {
  render() {
    const { location: { hash }, user, getTags, getPages, pageList } = this.props;
    const path = hash.replace('#', '');
    console.log(!path, path, pageList)
    user.email && (path ? getTags() : null);

    const postList = pageList.map((post, index) => <PostList key={index} post={post} />);

    
    const tagList = user.tagList && user.tagList.map(({ tag, id }) => <a key={id}>{tag}</a>)
  
    return (
      <div>
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
