import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const UserInfo = ({ name, blogs, id }) => {
  const history = useHistory();
  return (
    <tr>
      <td onClick={() => history.push(`/users/${id}`)}>{name}</td>
      <td>{blogs.length}</td>
    </tr>
  );
};

const UsersList = () => {
  const users = useSelector(state => state.usersList);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;