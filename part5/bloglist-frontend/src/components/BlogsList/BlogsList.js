import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BlogInfo = ({ blog }) => {
  return (
    <BlogLink to={`/blogs/${blog.id}`}>
      <BlogLinkTitle>{blog.title}</BlogLinkTitle>
      <div>{blog.author}</div>
    </BlogLink>
  );
};

const BlogsList = ({ blogs }) => {
  return (
    <BlogListContainer>
      <h2>Blogs</h2>
      {
        blogs.map((blog) =>
          <BlogInfo key={blog.id} blog={blog} />
        )
      }
    </BlogListContainer>
  );
};

const BlogListContainer = styled.div`
  list-style: none;
  padding: 2rem;
  border-radius: 11px;
  background-color: white;

  h2 {
    margin-bottom: 2.2rem;
    color: hsl(0, 0%, 10%);
  }
`;

const BlogLinkTitle = styled.h3`
  margin-bottom: 5px;
  position: relative;

  &::after {
    position: absolute;
    content: '';
    height: 5px;
    width: 15px;
    background-color: hsla(195, 45%, 68%, 1);
    top: -11px;
    left: 0;
  }
`;

const BlogLink = styled(Link)`
  &,
  &:link,
  &:active,
  &:visited {
    text-decoration: none;
    color: hsl(214, 12%, 25%);
  }
  
  display: inline-block;
  width: 100%;
  padding: 2rem 2rem;
  background-color: white;
  margin-bottom: 1.6rem;
  border-radius: 22px;
  border: 1px solid #dedede;
  transition: background-color 0.2s linear;
  cursor: pointer;

  &:hover {
    background-color: hsla(191, 26%, 97%, 1);
  }
`;

export default BlogsList;