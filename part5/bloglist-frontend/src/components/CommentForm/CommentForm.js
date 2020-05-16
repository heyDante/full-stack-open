import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addComment } from '../../reducers/blogReducer';

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    dispatch(addComment(id, comment));
    e.target.comment.value = '';
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <CommentInput placeholder="add comment.." type="text" name="comment" />
        <CommentAddButton type="submit">Add Comment</CommentAddButton>
      </form>
    </div>
  );
};

const CommentInput = styled.input`
  font-size: 12px;
  border: none;
  outline: none;
  padding: 1.2rem 2.4rem;
  margin-bottom: 1em;
  background-color: #fbfbfb;
`;

const CommentAddButton = styled.button`
  border: none;
  padding: 8px 12px;
  text-transform: uppercase;
  font-size: 10px;
  background-color: #d1ffe8;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.05em;
  color: #055216;
  outline: none;
  margin-left: 0.5rem;
`;

export default CommentForm;