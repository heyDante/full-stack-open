import React from 'react';
import { useSelector } from 'react-redux';

const UserInfo = ({ name, blogs }) => {
  return (
    <tr>
      <td>{name}</td>
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
              <UserInfo key={id} name={name} blogs={blogs} />
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;