import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Togglable from '../Togglable/Togglable';

import { addBlog } from '../../reducers/blogReducer';

const BlogForm = () => {
  const dispatch = useDispatch();

  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ url, setUrl ] = useState('');

  const handleCreateBlog = async (e) => {
    try {
      e.preventDefault();
      dispatch(addBlog({
        title,
        author,
        url
      }));
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.log('Error, creating blog');
    }
  };

  return (
    <Togglable buttonLabel='New Blog'>
      <form onSubmit={handleCreateBlog}>
        <InputCreate placeholder="title" id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)}/>
        <InputCreate placeholder="author" id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        <InputCreate placeholder="url" id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)}/>

        <ButtonAdd type='submit'>Add Blog</ButtonAdd>
      </form>
    </Togglable>
  );
};

const InputCreate = styled.input`
  width: 100%;
  display: block;
  font-size: 12px;
  border: none;
  outline: none;
  padding: 1em 2.1em;
  margin-bottom: 8px;
  background-color: #fbfbfb;
`;

const ButtonAdd = styled.button`
  border: none;
  font-size: 12px;
  text-transform: uppercase;
  padding: 12px 15px;
  background-color: #d3fac6;
  color: #025605;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  margin-top: 1em;
  border-radius: 9px;
  outline: none;
`;


export default BlogForm;