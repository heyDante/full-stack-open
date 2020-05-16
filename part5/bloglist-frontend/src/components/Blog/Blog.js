import React from 'react';
import styled from 'styled-components';

import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';

const Blog = ({ blog, handleLike, handleDelete }) => {
  if (!blog) {
    return null;
  }

  return (
    <BlogContainer>
      <BlogTitle>
        {blog.title}
      </BlogTitle>

      <BlogData>
        <SubLabel>
          author
        </SubLabel>
        {blog.author}
      </BlogData>

      <BlogData>
        <SubLabel>
          likes
        </SubLabel>
        {blog.likes}
      </BlogData>

      <BlogData>
        <SubLabel>
          visit
        </SubLabel>
        <a href={blog.url}>{blog.url}</a>
      </BlogData>

      <BlogData>
        <SubLabel>
          added by
        </SubLabel>
        {blog.user.name}
      </BlogData>

      <BlogLike onClick={() => handleLike(blog)}>
        Like
      </BlogLike>

      <Comment comments={blog.comments}/>
      <CommentForm id={blog.id}/>

      <BlogFooter>
        <BlogRemove onClick={() => handleDelete(blog)}>delete blog</BlogRemove>
      </BlogFooter>
    </BlogContainer>
  );
};

const BlogContainer = styled.div`
  padding: 2rem;
  background-color: white;
  margin-top: 2rem;
  border-radius: 11px;
`;

const BlogData = styled.div`
  font-size: 13px;
  margin-bottom: 4px;

  a,
  a:link,
  a:active,
  a:visited {
    text-decoration: underline;
    color: inherit;
  }
`;

const BlogTitle = styled.h2`
  color: hsl(214, 12%, 20%);
  margin-bottom: 1rem;
`;

const BlogRemove = styled.button`
  display: block;
  border: none;
  padding: 0.6rem 1.2rem;
  text-transform: uppercase;
  font-size: 10px;
  background-color: #ffd1d1;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.05em;
  color: #710606;
  outline: none;
  transition: background-color 0.2s;
  margin-top: 6em;

  &:hover {
    background-color: #ffbdbd;
  }

  &:active {
    background-color: #ff9999;
  }
`;

const BlogLike = styled(BlogRemove)`
  color: #0f416d;
  background-color: #c1defa;
  margin-top: 2rem;

  &:hover {
    background-color: #afd5f8;
  }

  &:active {
    background-color: #8ec4f6;
  }
`;

const SubLabel = styled.span`
  font-size: 12px;
  color: grey;
  margin-right: 8px;
`;

const BlogFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Blog;