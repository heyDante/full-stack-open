import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import Blog from './components/Blog/Blog';
import BlogsList from './components/BlogsList/BlogsList';
import Notification from './components/Notification/Notfication';
import BlogForm from './components/BlogForm/BlogForm';
import UsersList from './components/UsersList/UsersList';
import User from './components/User/User';
import NavBar from './components/NavBar/NavBar';

import loginService from './services/login';

import { setNotification } from './reducers/notificationReducer';
import { blogInitialization, addLike, deleteBlog } from './reducers/blogReducer';
import { loginUser, logoutUser } from './reducers/userReducer';
import { initializeUsersList } from './reducers/usersListReducer';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const usersList = useSelector(state => state.usersList);

  /* -- Route Match -- */
  const matchUserRoute = useRouteMatch('/users/:id');
  const userToDisplay = matchUserRoute
    ? usersList.find(user => user.id === matchUserRoute.params.id)
    : null;

  const matchBlogRoute = useRouteMatch('/blogs/:id');
  const blogToDisplay = matchBlogRoute
    ? blogs.find((blog) => blog.id === matchBlogRoute.params.id)
    : null;

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  useEffect(() => {
    dispatch(blogInitialization());
    dispatch(initializeUsersList());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUserAvailable = window.localStorage.getItem('loggedInUser');
    if(loggedInUserAvailable) {
      dispatch(loginUser(JSON.parse(loggedInUserAvailable)));
    }
  }, [dispatch]);

  useEffect(() => {
    if(user) {
      dispatch(setNotification('login', 'succesfully logged in', 3));
    }
  }, [user, dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userDetails = await loginService.login({ username, password });
      dispatch(loginUser(userDetails));
      setUsername('');
      setPassword('');
      /* --Setting the userdetails to local storage for persisiting sessions -- */
      window.localStorage.setItem('loggedInUser', JSON.stringify(userDetails));

    } catch (error) {
      dispatch(setNotification('error', 'invalid username or password', 3));
      console.log('Invalid username or password');
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(logoutUser());
    dispatch(setNotification('logout', 'succesfully logged out', 3));
  };

  const handleLike = (blog) => {
    dispatch(addLike(blog));
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
  };

  if (user === null) {
    return (
      <>
        <Notification />
        <LogInPage>
          <h2>Log In</h2>
          <form onSubmit={handleLogin}>
            <Input placeholder="username" id='username' type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>

            <Input placeholder="password" id='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>

            <Button type='submit'>Log In</Button>
          </form>
        </LogInPage>
      </>
    );
  }

  return (
    <div>
      <Notification />
      <NavBar user={user} handleLogout={handleLogout} />
      <Switch>
        <Route path='/users/:id'>
          <User user={userToDisplay} />
        </Route>

        <Route path='/blogs/:id'>
          <Blog
            blog={blogToDisplay}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        </Route>

        <Route path='/users'>
          <UsersList />
        </Route>

        <Route path='/'>
          <BlogForm />
          <BlogsList blogs={blogs}/>
        </Route>
      </Switch>

    </div>
  );
}

/* -- Styles -- */
const LogInPage = styled.div`
  h2 {
    margin-bottom: 1em;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  } 

  background-color: #fff;
  padding: 5em;
  padding-top: 4em;
  margin-top: 5em;
  border-radius: 18px;
`;


const Input = styled.input`
  font-size: 12px;
  border: none;
  outline: none;
  padding: 1em 2.1em;
  margin-bottom: 1em;
  background-color: #fbfbfb;
`;

const Button = styled.button`
  font-size: 13px;
  text-transform: uppercase;
  border-style: none;
  padding: 0.7em 1.1em;
  background-color: #1eacff;
  color: white;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
  margin-top: 1em;
  border-radius: 5px;
  outline: none;
  transition: background-color 0.2s;

  &:active {
    background-color: #0095eb;
  }
`;

export default App;
