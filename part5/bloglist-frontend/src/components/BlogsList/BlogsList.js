import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogInfo = ({ blog }) => {
  return (
    <div>
      <Link to={`/blogs/${blog.id}`}>
        <h3>{blog.title}</h3>
      </Link>
    </div>
  );
};

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs);
  return (
    <div>
      {
        blogs.map((blog) =>
          <BlogInfo key={blog.id} blog={blog} />
        )
      }
    </div>
  );
};

export default BlogsList;