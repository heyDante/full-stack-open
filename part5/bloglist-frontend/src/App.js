import React, { useState, useEffect } from 'react';

import Blog from './components/Blog/Blog';
import Notification from './components/Notification/Notfication';
import BlogForm from './components/BlogForm/BlogForm';

import loginService from './services/login';
import blogService from './services/blogs';

import './App.css';

function App() {
  const [ blogs, setBlogs ] = useState([]);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);
  const [ notificationObject, setNotificationObject ] = useState({ type: null });

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
    }
  }, []);

  useEffect(() => {
    if(user) {
      setNotificationObject({
        type: 'loggedIn',
        user: user.username
      });

      setTimeout(() => {
        setNotificationObject({
          type: 'null'
        });
      }, 3000);
    }
  }, [user]);

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
      setNotificationObject({
        type: 'error',
        message: 'Invalid username or password'
      });
      setTimeout(() => {
        setNotificationObject({
          type: null
        });
      }, 3000);
      console.log('Invalid username or password');
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);

    setNotificationObject({
      type: 'loggedOut'
    });

    setTimeout(() => {
      setNotificationObject({
        type: 'null'
      });
    }, 3000);
  };

  const handleLike = async (blog) => {
    console.log('Liked');

    const updatedBlog = {
      ...blog,
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

  const addBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.createBlog(newBlog);
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
      console.log('Error, creating blog');
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification notificationObject={notificationObject}/>
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
      <Notification notificationObject={notificationObject}/>
      <div>
        <p>{`${user.name} logged in`}</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <BlogForm addBlog={addBlog} />
      <h2>blogs</h2>
      {blogs
        .sort((blogOne, blogTwo) => blogTwo.likes - blogOne.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        )}
    </div>
  );
}

export default App;
