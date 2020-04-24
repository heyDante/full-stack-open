import React, { useState } from 'react';

import Togglable from '../Togglable/Togglable';

const BlogForm = ({ addBlog }) => {

	const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ url, setUrl ] = useState('');

	const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      addBlog({
        title,
        author,
        url
      });

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.log('Error creating blog. Invalid User');
    }
  };

	return (
		<Togglable buttonLabel='New Blog'>
        <h2>Create new</h2>
        <form onSubmit={handleCreateBlog}>
          <div className='form-input'>
            <label htmlFor='title'>Title</label>
            <input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)}/>
          </div>
          
          <div className='form-input'>
            <label htmlFor='author'>Author</label>
            <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/>
          </div>
          
          <div className='form-input'>
            <label htmlFor='url'>Url</label>
            <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)}/>
          </div>

          <button type='submit'>Create Blog</button>
        </form>
      </Togglable>
	);
};

export default BlogForm;