import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const UserInfo = ({ name, blogs, id }) => {
  const history = useHistory();
  return (
    <UserInfoContainer onClick={() => history.push(`/users/${id}`)}>
      <div>{name}</div>
      <div>blogs - {blogs.length}</div>
    </UserInfoContainer>
  );
};

const UsersList = () => {
  const users = useSelector(state => state.usersList);
  return (
    <UsersListContainer>
      <h2>Users</h2>
      {
        users.map(({ name, blogs, id }) =>
          <UserInfo
            key={id}
            name={name}
            blogs={blogs}
            id={id}
          />
        )
      }
    </UsersListContainer>
  );
};

const UsersListContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background-color: white;
  border-radius: 5px;
  padding-bottom: 4rem;

  h2 {
    margin-bottom: 1rem;
  }
`;

const UserInfoContainer = styled.div`
  font-size: 14px;
  color: hsla(0, 0%, 27%, 1);
  margin-bottom: 1rem;
  border: 1px solid whitesmoke;
  border-radius: 8px;
  padding: 8px;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #fdfdfd;
  }
`;

export default UsersList;