import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = ({ user: { name }, handleLogout }) => {
  return (
    <Navigation>
      <NavigationLink>
        <li>
          <Link to='/'>blogs</Link>
        </li>
        <li>
          <Link to='/users'>users</Link>
        </li>
      </NavigationLink>
      {/* <div><Link to='/'>blogs</Link></div>
      <div><Link to='/users'>users</Link></div> */}
      <LogoutUser>
        <p>{name}</p>
        <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
      </LogoutUser>
    </Navigation>
  );
};

const Navigation = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1em 2em;
  border-radius: 11px;
  margin-top: 1em;
`;

const NavigationLink = styled.ul`
  list-style: none;

  li {
    display: inline;
    text-transform: uppercase;
    margin-right: 1em;
  }
  
  a,
  a:link,
  a:visited {
    font-size: 12px;
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: #22a9a3;
  }
`;

const LogoutUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const LogoutButton = styled.button`
  border: none;
  padding: 0.5em 1em;
  text-transform: uppercase;
  font-size: 10px;
  background-color: #ffd1d1;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.05em;
  color: #710606;
  margin-left: 1em;
`;

export default NavBar;