import React from 'react';

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h3>{user.name}</h3>
      {
        user.blogs.length
          ?
          <ul>
            {
              user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
            }
          </ul>
          : <div>This user has no blogs yet!</div>
      }
    </div>
  );
};

export default User;