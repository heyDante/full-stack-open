import React, { useState } from 'react';

import './Blog.css';

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [ showMore, setShowMore ] = useState(false);

  return (
    <div className='blog'>
      <h2 className='blog-title'>
        {blog.title}
        <span>
          <button onClick={() => setShowMore(!showMore)}>{showMore ? 'hide' : 'view'}</button>
        </span>
      </h2>
      <span className='blog-author'>by {blog.author}</span>
      <div className={ showMore ? 'blog-details' : 'hidden'}>
        <div className='blog-likes'>
          {blog.likes} likes
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <a href={blog.url}>{blog.url}</a>
        <p className='blog-username'>{blog.user.name}</p>
        <button onClick={() => handleDelete(blog)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;