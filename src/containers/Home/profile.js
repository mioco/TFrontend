import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import PostList from '../../components/Postlist';
import { getProfile, addSubscriptionUrl } from '../../modules/user';
import './profile.css';

const getHostName = (url) => {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
  return match[2];
  }
  else {
      return null;
  }
}

const mapStateToProps = ({ user }) => ({
  ...user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getProfile: () => getProfile,
  addSubscriptionUrl: (payload) => addSubscriptionUrl(payload),
  changePage: () => push('/about-us')
}, dispatch);
 
const UrlList = ({ tagTagList, url, id }) => (
  <div>
    Tags: {tagTagList.map(({ tag, id }) => <a key={id}>{tag}</a>)}
    <a href={url}>{getHostName(url)}</a>
  </div>
)
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      tempItem1: '',
      tempItem2: '',
      keywords: []
    };
  }

  componentDidMount() {
    console.log(this.props)
    this.props.email && this.props.getProfile();
  }

  addSubscriptionUrl = (e) => {
    this.props.addSubscriptionUrl();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = () => {
    let lock;
    Object.values(this.state).forEach(i => {
      console.log(i)
      if (!i) {
        lock = false;
        return;
      }
    })
    
    !lock && this.props.addSubscriptionUrl({
      ...this.state,
      keywords: this.state.keywords.split(',')
    });
  }
  
  render() {
    
    const urlList = this.props.urlTagList && this.props.urlTagList.map((url, index) => (
      <UrlList url={url} />
    ));

    const { url, tempItem1, tempItem2, keywords } = this.state;
    return (
      <div>
        {urlList}

        <form>
          <label>
            订阅:
            <input name="url" value={url} onChange={this.handleChange} />
          </label>
          <label>
            内容模板:
            <input name="tempItem1" value={tempItem1} onChange={this.handleChange} />
          </label>
          <label>
            内容模板:
            <input name="tempItem2" value={tempItem2} onChange={this.handleChange} />
          </label>
          <label>
            关键字:
            <input name="keywords" value={keywords} onChange={this.handleChange} />
          </label>
        </form>
        <div className="submit" onClick={this.handleSubmit}>添加</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
