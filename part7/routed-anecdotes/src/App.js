import React, { useState } from 'react'
import {
  Link, 
  Route, 
  Switch, 
  useRouteMatch,
  useHistory,
  Redirect
} from 'react-router-dom';

import { useField } from './hooks';

const Menu = () => {
  return (
    <div className="nav">
      <Link to='/'>anecdotes</Link>
      <Link to='/create'>create new</Link>
      <Link to='/about'>about</Link>
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  return (
    <div className="anecdote">
      <li>{anecdote.content}</li>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {
        anecdotes.map(anecdote => 
          <Link to={`/anecdote/${anecdote.id}`} key={anecdote.id} >
            <li anecdote={anecdote}>{anecdote.content}</li>
          </Link>
        )
      }
    </ul>
  </div>
);

const About = () => (
  <div className="about">
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
);

const Footer = () => (
  <footer>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.
    <br />
    <br />
    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </footer>
);

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const { reset: resetContent, ...content } = useField('text', 'content');
  const { reset: resetAuthor, ...author } = useField('text', 'author');
  const { reset: resetInfo, ...info } = useField('text', 'info');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    props.setNotification(content.value);

    history.push('/');
    setTimeout(() => {
      props.setNotification('');
    }, 10000);
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div className="form">
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Content</label>
          <input {...content} />
        </div>
        <div>
          <label>Author</label>
          <input {...author} />
        </div>
        <div>
          <label>Url</label>
          <input {...info} />
        </div>
        <button type="submit">create</button>
      </form>
        <button onClick={handleReset}>reset</button>
    </div>
  );

};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find(a => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  };

  const match = useRouteMatch('/anecdote/:id');
  const anecdote = match 
    ? anecdoteById(match.params.id)
    : null

  // console.log(anecdote);

  return (
    <div>
      {
        notification
        ? <div className="notification">
            A new anecdote 
            <span style={{fontWeight: 600}}> {notification} </span>
            was created !
          </div>
        : null
      }
      <h1>Software anecdotes</h1>
        <Menu />

        <Switch>
          <Route path='/anecdote/:id'>
            {
              anecdote
                ? <Anecdote anecdote={anecdote} />
                : <Redirect to='/' />
            }
          </Route>

          <Route path='/about'>
            <About />
          </Route>

          <Route path='/create'>
            <CreateNew addNew={addNew} setNotification={setNotification}/>
          </Route>

          <Route path='/'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>

        <Footer />
    </div>
  )
}

export default App;
