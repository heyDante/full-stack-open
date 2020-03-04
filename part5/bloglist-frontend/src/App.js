import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';

import loginService from './services/login';
import blogService from './services/blogs';

import './App.css';

function App() {
  const [ blogs, setBlogs ] = useState([]);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);
  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ url, setUrl ] = useState('');


  useEffect(() => {
    blogService.getAll()
      .then((initialBlogs => {
        setBlogs(initialBlogs);
      }));
  }, []);

  /* -- Adding loggedInUser if available -- */
  useEffect(() => {
    const loggedInUserAvailable = window.localStorage.getItem('loggedInUser');
    if(loggedInUserAvailable) {
      setUser(JSON.parse(loggedInUserAvailable));
      // console.log('useEffect', JSON.parse(loggedInUserAvailable).token);
      blogService.setToken(JSON.parse(loggedInUserAvailable).token);
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userDetails = await loginService.login({ username, password });
      setUser(userDetails);

      /* -- Setting token when logging in -- */
      blogService.setToken(userDetails.token);
      console.log(userDetails.token);

      /* --Setting the userdetails to local storage for persisiting sessions -- */
      window.localStorage.setItem('loggedInUser', JSON.stringify(userDetails));
    } catch (error) {
      console.log('Invalid username or password');
    }
  };

  const handleLogout = (event) => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url
      };
      await blogService.createBlog(newBlog);

      setTitle('');
      setAuthor('');
      setUrl('');
      /* -- Updated the existing blogs present in our App, with the new data from database -- */
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);

    } catch (error) {
      console.log('Error creating blog. Invalid User');
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='username'>username</label>
            <input id='username' type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>
          </div>
          
          <div>
            <label htmlFor='password'>password</label>
            <input id='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
          </div>
  
          <button type='submit'>Log In</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p>{`${user.name} logged in`}</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div>
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
      </div>
      <h2>blogs</h2>
      {blogs.filter((blog) => blog.user.username === user.username).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App;
