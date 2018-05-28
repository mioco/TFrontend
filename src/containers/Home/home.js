import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import GlobalHeader from '../../components/GlobalHeader';
import PostList from '../../components/Postlist';
import { getTags, getPages } from '../../modules/home';
import './home.css';

const mapStateToProps = ({ user, home: { pageList, tagList }, isLogin }) => ({
  ...user,
  pageList,
  tagList
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getTags: () => getTags,
  getPages: () => getPages,
}, dispatch);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'home',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, this.props)
    const firstP = this.props.pageList[0]
    return (!firstP || nextProps.pageList[0].id !== firstP.id)
      // || nextProps.location  
      || (this.state.tab !== nextState.tab)
  }

  componentDidUpdate() {
    if (this.props.isLogin) {
      this.props.getPages()
      this.props.getTags()
    }
  }

  tabChange = tab => this.setState({ tab })

  render() {
    const { location: { hash }, tagList, pageList } = this.props;

    const postList = pageList.map((post, index) => <PostList key={index} post={post} />);

    const tagListNode = tagList && tagList.map(({ tag, id }) => (<a key={id}>{tag}</a>))
    console.log(tagListNode)
    
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
        {
          this.state.tab === 'topic' &&
          <div className="topic__tags">
            {tagListNode}
            {!tagListNode && <div style={{ textAlign: 'center', color: '#9aa6c4' }}>暂时没有订阅话题</div>}
          </div>
        }
        {postList}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
