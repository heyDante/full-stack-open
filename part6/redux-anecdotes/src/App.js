import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

import anecdoteService from './services/anecdote';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll()
      .then((anecdotes) => {
        dispatch(initializeAnecdotes(anecdotes));
      });
  }, [dispatch]);

  return (
    <div>
      <h1>Redux Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;