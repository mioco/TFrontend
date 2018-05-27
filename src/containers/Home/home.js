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
  constructor(props) {
    super(props);
    this.state = {
      tab: 'home',
    };
  }
  componentDidMount() {
    console.log(this.props)
    this.props.getPages()
    this.props.getTags()
  }

  tabChange = tab => this.setState({ tab })
// const Home = ({ route, routing, user }) => {
  render() {
    const { location: { hash }, user, pageList } = this.props;

    const postList = pageList.map((post, index) => <PostList key={index} post={post} />);

    
    const tagList = user.tagList
      ? user.tagList.map(({ tag, id }) => <a key={id}>{tag}</a>)
      : (<div style={{textAlign: 'center', color: '#9aa6c4'}}>暂时没有订阅话题</div>)
  
    return (
      <div>
        <nav>
          <ul className="nav-bar">
            <li>
              <a className={this.state.tab === 'home' ? 'active' : ''} onClick={() => this.tabChange('home')}>
                首页
              </a>
            </li>
            <li>
              <a className={this.state.tab === 'topic' ? 'active' : ''} onClick={() => this.tabChange('topic')}>
                话题
              </a>
            </li>
          </ul>
        </nav>
        { this.state.tab === 'topic' && tagList }
        {postList}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
