import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user: { name }, handleLogout }) => {
  return (
    <div>
      <div><Link to='/'>blogs</Link></div>
      <div><Link to='/users'>users</Link></div>
      <div>
        <p>{`${name} logged in`}</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default NavBar;