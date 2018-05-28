import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { getPage } from '../../modules/home';
import './post.css';
 
const mapStateToProps = ({ user, home: { page } }) => ({
  user,
  page,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getPage: (id) => getPage(id),
}, dispatch);

class Post extends React.PureComponent {
  
  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.isLogin && this.props.getPage(id);
  }

  render() {
    const { tagList, id, content, title, url } = this.props.page;
    const tagNodes = tagList && tagList.map(({ tag }, index) => <a key={index}>{tag}</a>)
    
    const getContent = () => ({ __html: content });
    return (
      <div className="postList">
        <p>来自关键字：{tagNodes}</p>
        <small>from: <a href={url && url}>{url && url.slice(0, 30)}...</a></small>

        <h2>{title}</h2>
        <article dangerouslySetInnerHTML={getContent()}></article>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
