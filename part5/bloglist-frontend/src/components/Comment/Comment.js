import React from 'react';

const Comment = ({ comments }) => {
  return (
    <div className="comments">
      <h4>Comments</h4>
      {
        comments.length
          ?
          <ul>
            {
              comments.map((comment) =>
                <li key={comment}>{comment}</li>
              )
            }
          </ul>
          : <div>Add your first comment</div>
      }
    </div>
  );
};

export default Comment;