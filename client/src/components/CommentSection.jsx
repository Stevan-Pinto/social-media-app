import React, { useState } from 'react';
import './CommentSection.css';

const CommentSection = ({ comments = [], onAddComment }) => { // Default empty array for comments
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddComment(comment);
    setComment('');
  };

  return (
    <div className="commentSection">
      {comments.length > 0 ? (
        comments.map((commentObj, index) => (
          <div key={index} className="comment">
            {commentObj.comment} {/* Ensure you access the 'comment' property */}
          </div>
        ))
      ) : (
        <div>No comments yet.</div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
