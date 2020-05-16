import React from 'react';
import styled from 'styled-components';

import { ReactComponent as UserSvg } from '../../icons/user-circle.svg';

const Comment = ({ comments }) => {
  return (
    <CommentContainer>
      <h4>Comments</h4>
      {
        comments.length
          ?
          <ul>
            {
              comments.map((comment) =>
                <SingleComment key={comment}>
                  <UserIcon />
                  {comment}
                </SingleComment>
              )
            }
          </ul>
          : <CommentEmpty>Add your first comment</CommentEmpty>
      }
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  ul {
    list-style: none;
  }

  h4 {
    margin: 2rem 0 1rem 0;
  }
`;

const SingleComment = styled.li`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #525252;
  padding: 6px 6px 8px 6px;
  background-color: hsl(0, 0%, 98%);
  margin-bottom: 12px;
  border-radius: 12px;
`;

const UserIcon = styled(UserSvg)`
  width: 16px;
  height: 16px;
  fill: #525252;
  margin: 0 6px;
`;

const CommentEmpty = styled.div`
  font-size: 12px;
  color: grey;
  margin-bottom: 1em;
`;

export default Comment;