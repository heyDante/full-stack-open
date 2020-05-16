import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const User = ({ user }) => {
  const history = useHistory();

  if (!user) {
    return null;
  }

  return (
    <UserContainer>
      <h3>{user.name}</h3>
      {
        user.blogs.length
          ?
          <ul>
            {
              user.blogs.map((blog) =>
                <UserBlogInfoContainer
                  key={blog.id}
                  onClick={() => history.push(`/blogs/${blog.id}`)}
                >
                  {blog.title}
                </UserBlogInfoContainer>
              )
            }
          </ul>
          : <div>This user has no blogs yet!</div>
      }
    </UserContainer>
  );
};

const UserContainer = styled.div`
  padding: 2rem;
  background-color: white;
  margin-top: 2rem;
  border-radius: 11px;

  ul {
    list-style: none;
  }

  h3 {
    margin-bottom: 1rem;
  }
`;

const UserBlogInfoContainer = styled.li`
  font-size: 14px;
  color: hsla(0, 0%, 27%, 1);
  margin-bottom: 1rem;
  border: 1px solid whitesmoke;
  border-radius: 8px;
  padding: 8px 8px 12px 8px;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #fdfdfd;
  }
`;

export default User;