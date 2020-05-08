import React from 'react';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

import './App.css';

const App = () => {

  return (
    <div>
      <h1>Redux Anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;