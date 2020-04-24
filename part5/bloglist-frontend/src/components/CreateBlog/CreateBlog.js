import React, { useState } from 'react';

import Togglable from '../Togglable/Togglable';

import blogService from '../../services/blogs';

const CreateBlog = ({ setBlogs, setNotificationObject }) => {

	const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ url, setUrl ] = useState('');

	const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url
      };
      const savedBlog = await blogService.createBlog(newBlog);

      setTitle('');
      setAuthor('');
      setUrl('');

      /* -- Updated the existing blogs present in our App, with the new data from database -- */
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);

      setNotificationObject({
        type: 'created',
        title: savedBlog.title,
        author: savedBlog.author
      });

      setTimeout(() => {
        setNotificationObject({
          type: null
        });
      }, 5000);

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

export default CreateBlog;