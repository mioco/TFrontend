import React from 'react';

import './post.css';
 
const Post = ({title, content, url, tags}) => {
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

export default Post;
