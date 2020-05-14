import React from 'react';

import './Blog.css';

const Blog = ({ blog, handleLike, handleDelete }) => {
  if (!blog) {
    return null;
  }

  return (
    <div className='blog'>
      <h2 className='blog-title'>
        {blog.title}
      </h2>
      <span className='blog-author'>by {blog.author}</span>
      <div className='blog-likes'>
        {blog.likes} likes
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <a href={blog.url}>{blog.url}</a>
      <p className='blog-username'>Added by {blog.user.name}</p>
      <button className='blog-delete' onClick={() => handleDelete(blog)}>remove</button>
    </div>
  );
};

export default Blog;