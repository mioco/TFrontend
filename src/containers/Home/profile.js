import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import GlobalHeader from '../../components/GlobalHeader';
import PostList from '../../components/Postlist';
import { getProfile, addSubscriptionUrl } from '../../modules/user';
import './home.css';

const getHostName = (url) => {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
  return match[2];
  }
  else {
      return null;
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getProfile: () => getProfile,
  addSubscriptionUrl: (payload) => addSubscriptionUrl(payload),
  changePage: () => push('/about-us')
}, dispatch);
 
const UrlList = ({ tags, url }) => (
  <div>
    Tags: {tags.map(({ tag, id }) => <a key={id}>{tag}</a>)}
    <a href={url}>{getHostName(url)}</a>
  </div>
)
class Profile extends Component {
  addSubscriptionUrl = (event) => {
    this.props.addSubscriptionUrl();
  }
  
  render() {
    this.props.getProfile();
    const urlList = this.props.user && this.props.user.urlList.map(({ tags, url }, index) => (
      <UrlList tags={tags} url={url} />
    ));
    return (
      <div>
        <GlobalHeader />

        {urlList}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
