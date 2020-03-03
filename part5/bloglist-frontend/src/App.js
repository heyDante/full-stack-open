import React, { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';

import loginService from './services/login';
import blogService from './services/blogs';

import './App.css';

function App() {
  const [ blogs, setBlogs ] = useState([]);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);

  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current ? isInitialMount.current = false :
    (async () => {
      const blogsFetched = await blogService.getAll();
      console.log(blogsFetched, user);
      const filteredBlogs = blogsFetched.filter((blog) => blog.user.username === user.username);
      setBlogs(filteredBlogs);
    })();
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userDetails = await loginService.login({ username, password });
      setUser(userDetails);
    } catch (error) {
      console.log('Invalid username or password');
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
      <p>{`${user.name} logged in`}</p>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App;
