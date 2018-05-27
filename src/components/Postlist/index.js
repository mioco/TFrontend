import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
 
const PostList = ({ post: { id, title, content, url, tagList } }) => {
  const tagNodes = tagList.map(({ tag }, index) => <a href={`#topic#tag=${id}`} key={index}>{tag}&nbsp;</a>)
  const getContent = () => {
    if (!content) {
      return
    }
    const inner = content;
    return {
      __html: inner.includes('<img') ? inner.match(/<img[^>]+>/g)[0] : inner.slice(0, 50) + '...'
    };
  };
  
  return (
    <div className="postList">
      <p>来自关键字：{tagNodes}</p>  
      <h3><Link to={`/post/${id}`}>{ title }</Link></h3>
      <article dangerouslySetInnerHTML={getContent()}></article>
      <small>from: <a href={url}>{ url.slice(0, 30) }...</a></small>
    </div>
  );
}

export default PostList;
