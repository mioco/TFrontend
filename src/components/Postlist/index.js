import React from 'react';

import './index.css';
 
const PostList = ({title, content, url, tags}) => {
  const tagNodes = tags.map(({ tag }, index) => <a key={index}>{tag}</a>)
  return (
    <div className="postList">
      <p>来自关键字：{tagNodes}</p>  
      <h2>{ title }</h2>
      <article>{ content }</article>
      <footer>from: { url }</footer>
    </div>
  );
}

export default PostList;
