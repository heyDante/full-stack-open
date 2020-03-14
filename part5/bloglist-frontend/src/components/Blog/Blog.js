import React, { useState } from 'react';

import './Blog.css';

const Blog = ({ blog }) => {

  const [ showMore, setShowMore ] = useState(false);

  return (
    <div className='blog'>
      <h2 className='blog-title'>
        {blog.title}
        <span>
          <button onClick={() => setShowMore(!showMore)}>{showMore ? 'hide' : 'view'}</button>
        </span>
      </h2>
      <span style={{fontStyle: 'italic'}}>by {blog.author}</span>
      <div className={ showMore ? 'blog-details' : 'hidden'}>
        <div>{blog.likes} likes  <button>like</button></div>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;