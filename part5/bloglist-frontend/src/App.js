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

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs);
      });
      // const filteredBlogs = blogsFetched.filter((blog) => blog.user.username === user.username);
  }, []);

  /* -- Adding loggedInUser if available -- */
  useEffect(() => {
    const loggedInUserAvailable = window.localStorage.getItem('loggedInUser');
    console.log(loggedInUserAvailable);
    if(loggedInUserAvailable) {
      setUser(JSON.parse(loggedInUserAvailable));
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userDetails = await loginService.login({ username, password });
      setUser(userDetails);
      window.localStorage.setItem('loggedInUser', JSON.stringify(userDetails));
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log('Invalid username or password');
    }
  };

  const handleLogout = (event) => {
    window.localStorage.clear();
    setUser(null);
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
      <p>{`${user.name} logged in`}</p>
      <button onClick={handleLogout}>Log out</button>
      <h2>blogs</h2>
      {blogs.filter((blog) => blog.user.username === user.username).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App;
