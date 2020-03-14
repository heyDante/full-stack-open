import React, { useState } from 'react';

import './Blog.css';

const Blog = ({ blog }) => {

  const [ showMore, setShowMore ] = useState(false);

  console.log(blog);

  return (
    <div className='blog'>
      <h2 
        className='blog-title'
        onClick={() => setShowMore(!showMore)}
      >
        {blog.title}
      </h2>
      <span style={{fontStyle: 'italic'}}>by {blog.author}</span>
      <div className={ showMore ? 'blog-details' : 'hidden'}>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes  <button>like</button></div>
      </div>
    </div>
  );
};

export default Blog;