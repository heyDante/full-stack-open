import React, { useState } from 'react';

import blogService from '../../services/blogs';

import './Blog.css';

const Blog = ({ blog, setBlogs }) => {
  const [ showMore, setShowMore ] = useState(false);


  const handleLike = async (blog) => {
    console.log('Liked');

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1
    };

    try {
      const response = await blogService.addLikes(updatedBlog, blog.id);
      console.log(response);

      /* -- Updated the existing blogs present in our App, with the new data from database -- */
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);

    } catch (error) {
      console.log('error liking blog', error);
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.removeBlog(blog.id);

        /* -- Updated the existing blogs present in our App, with the new data from database -- */
        const updatedBlogs = await blogService.getAll();
        setBlogs(updatedBlogs);

      } catch (error) {
        console.log('error');
      }
    }
  };

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
        <div>
          {blog.likes} likes  
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.user.name}</p>
        <button onClick={() => handleDelete(blog)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;