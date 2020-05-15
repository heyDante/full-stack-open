import React from 'react';

import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';

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

      <Comment comments={blog.comments}/>
      <CommentForm id={blog.id}/>
    </div>
  );
};

export default Blog;